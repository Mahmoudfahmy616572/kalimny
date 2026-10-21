import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { saveHomePreferences } from "@/lib/preferences-actions";
import { createClient } from "@/lib/supabase/server";

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
type CefrLevel = (typeof CEFR_LEVELS)[number];

const PLACEMENT_MODEL = "gemini-3.8-flash";
const PLACEMENT_TIMEOUT_MS = 30_000;

function pickLevel(v: unknown): CefrLevel | null {
  if (typeof v !== "string") return null;
  return (CEFR_LEVELS as readonly string[]).includes(v)
    ? (v as CefrLevel)
    : null;
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => null)) as
      | { messages?: unknown; language?: unknown }
      | null;

    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (messages.length === 0) {
      return NextResponse.json({ error: "empty" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "missing_key" }, { status: 500 });
    }

    const transcript = messages
      .slice(-40)
      .map((m) => {
        const role =
          (m as { role?: unknown })?.role === "assistant" ? "مُقيّم" : "متعلم";
        const content = String((m as { content?: unknown })?.content ?? "").trim();
        return content ? `${role}: ${content}` : null;
      })
      .filter(Boolean)
      .join("\n");

    const system = `أنت مقيّم CEFR دقيق جداً.
قيم مستوى المتعلم بناءً على الترانسكريبت ده فقط.
ركز على: الطلاقة، النطاق النحوى، الدقة، المفردات، وقدرته على إنتاج جمل كاملة.

أرجع JSON فقط بدون شرح ولا مقدمة:
{"level":"A1|A2|B1|B2|C1|C2","confidence":0.0-1.0,"reason":"سبب قصير بالعربية"}

قواعد صارمة:
- لو الردود قصيرة جدًا وجمل منفصله غالبًا ما تبقى A1/A2
- لو بيستخدم أزمنة مختلفة ويعبر عن رأيه بترابط يبقى أعلى
- لو confidence < 0.7 ما تقترحش مستوى أعلى من A2 إلا لو واضح جدًا
- خليك محافظًا أحسن بكتير من المبالغة
- ركّز على "إنتاج" اللغة مش مجرد فهم`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${PLACEMENT_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `${system}\n\nترانسكريبت:\n${transcript}` }] },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 256,
            responseMimeType: "application/json",
          },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(PLACEMENT_TIMEOUT_MS),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`placement generation failed (${response.status}): ${detail}`);
    }

    const json = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
    }

    const level = pickLevel((parsed as { level?: unknown } | null)?.level);
    const confidence =
      typeof (parsed as { confidence?: unknown } | null)?.confidence === "number"
        ? ((parsed as { confidence: number }).confidence)
        : 0;
    if (!level) {
      return NextResponse.json({ error: "bad_result" }, { status: 500 });
    }

    const supabase = await createClient();
    await supabase
      .from("user_preferences")
      .upsert(
        {
          user_id: user.id,
          placement_done: true,
          placement_level: level,
          placement_confidence: confidence,
          placement_source: "ai",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

    const rawLang = body?.language;
    const lang = (["en", "fr", "es", "de"] as const).find((c) => c === rawLang);
    if (!lang) {
      return NextResponse.json({ error: "invalid_language" }, { status: 400 });
    }
    await saveHomePreferences({ level, language: lang });

    return NextResponse.json({
      level,
      confidence,
      reason:
        typeof (parsed as { reason?: unknown } | null)?.reason === "string"
          ? ((parsed as { reason: string }).reason)
          : "",
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "unknown" },
      { status: 500 },
    );
  }
}
