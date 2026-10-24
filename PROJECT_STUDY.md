# دراسة مشروع كلمني (Kalimny)

ملف ملخص للمشروع، اتعمل عشان يتراجع فيه بدل ما يتقري الكود كل مرة.
آخر تحديث: 24 أكتوبر 2026. الـ commit الأخير: `3c8c71a`.

---

## 1. فكرة المشروع

منصة تعليم لغات بالصوت. المتعلم المصري بيكلم مدرّس AI في مكالمة صوتية مباشرة
(Gemini Live)، والمدرّس بيتكلم بالعامية المصرية ويعلّم الإنجليزي / الفرنسي /
الإسباني / الألماني من خلال الحوار. فيه أفاتار 3D متولّد بالكود بالكامل
(Three.js / R3F) وبيتحرك مع الصوت.

- اللغات: en, fr, es, de
- المستويات: CEFR من A1 لحد C2
- كل جلسة = وحدة واحدة في المنهج، والتقدّم خطي
- الشخصيات: 8 (شخصيتين لكل لغة) + شخصية "مُقيّم" لتحديد المستوى

---

## 2. الهيكل

Monorepo بـ npm workspaces:

```
apps/web/            Next.js 16 (App Router) — التطبيق الأساسي
apps/mobile/         Flutter — قديم، مش جزء من النشر
packages/shared/     TypeScript خام (من غير build) — المنطق والمفاهيم المشتركة
supabase/migrations/ SQL + دوال SECURITY DEFINER
```

أوامر من جذر المشروع: `npm run dev` / `build` / `lint` / `typecheck`.

ملاحظة: `apps/web/AGENTS.md` بيقول إن الـ Next.js في المشروع نسخة فيها تغييرات
كسّارة، ولازم قبل أي كود جديد نقرا الأدلة في `node_modules/next/dist/docs/`.
الأدلة موجودة فعلاً (01-app, 02-pages, 03-architecture, 04-community).

---

## 3. الـ packages/shared (المنطق المشترك)

| الملف | وظيفته |
|---|---|
| `languages.ts` | اللغات الأربعة + مستويات CEFR + `getLanguage` |
| `lessons.ts` | **كل أرقام الاقتصاد**: 3 دروس تجربة × 15 دقيقة، اشتراك 250 دقيقة بـ 210 جنيه، مدد الدرس 15/30/50، تحدي 5 دقايق، الافتراضي 30، سقف 90 |
| `curriculum.ts` | وحدات A1–C2 (12 وحدة لكل مستوى تقريباً، C1/C2 أقل) + `getUnit` + `getUnitCount` + بيانات الـ onboarding (أهداف، اهتمامات، دقايق يومية) + `pickLevelByGoal` |
| `syllabus/` | المنهج المكتوب لكل لغة (مفردات وجمل وقواعد) — طبقة فوق الـ curriculum |
| `persona.ts` | الشخصيات الـ 8 + `buildSystemInstructions` (بيبني البرومبت الكامل) |
| `voice.ts` | عقد `VoiceProvider` + أحداث `VoiceEvent` الموحّدة + `LessonPlan` + ثوابت Gemini (الموديل `gemini-3.8-live`، معدلات PCM 16k/24k) |
| `scenarios.ts` | لم أدرسه بعد بالتفصيل |
| `index.ts` | بيصدّر كل ده |

### طبقة المنهج (syllabus)
- `syllabus/types.ts`: نوع `SyllabusUnit` (id, level, sublevel, goal, coreGrammar, vocab, phrases, mustCover, canExplore...) + `toCurriculumUnit` اللي بيحوّله للشكل اللي البرومبت بيقراه.
- `syllabus/index.ts`: خريطة `SYLLABUS`. **حالياً فيها `en` بس.** أي لغة/مستوى مش موجود بيرجع للـ spine المشترك في `curriculum.ts`.
- `syllabus/en.ts`: منهج الإنجليزي A1.1/A1.2 (مبني على كتب مرجعية، مكتوب يدوياً).

---

## 4. تدفق الجلسة الصوتية (من أول الصفحة لآخرها)

1. **`/session?lang=en&level=A1&persona=en-layla`** (`app/session/page.tsx`)
   - بيتحقق من المستخدم وإنه خلّص الـ onboarding.
   - بيجيب الـ bootstrap (سياق الدرس + الرصيد) في RPC واحدة `get_session_bootstrap`.
   - لو المستوى في الرابط مختلف عن المحفوظ، بيحدّث الحساب.
   - **أولوية اختيار الشخصية:** الرابط ← المحفوظ ← الافتراضي. الاختيار الصريح بيتحفظ.
   - بيبني `LessonPlan` (الوحدة + الهدف + الاهتمامات + كلمات المراجعة).

2. **`POST /api/voice/token`** (`app/api/voice/token/route.ts`)
   - بيتأكد من الـ session.
   - `startLesson(minutes)` ← RPC ذرّية بتحجز الرصيد (تجربة أو اشتراك).
   - بيصدر توكن Gemini قصير العمر: `uses: 1`، وانتهاء = مدة الدرس + 5 دقايق.
   - لو إصدار التوكن فشل، بيعمل `voidLesson` عشان الطالب ما يتحسبش عليه.
   - المفتاح الأساسي `GEMINI_API_KEY` مش بيوصل للمتصفح أبداً.

3. **المتصفح** (`lib/voice/gemini-live-provider.ts`)
   - بيفتح WebSocket بالتوكن ويبعت `setup`: الموديل، الصوت (voiceName حسب الشخصية)، `systemInstruction` من `buildSystemInstructions`، ضغط السياق، resumption، transcription.
   - الميكروفون: `AudioWorklet` (`public/audio/pcm-capture-processor.js`) ← 16kHz PCM ← `realtimeInput`.
   - الصوت الراجع: binary frames ← `PcmPlayer` (24kHz).
   - لو الاتصال اتقطع: reconnect بـ backoff `[500ms, 1s, 2s, 4s, 8s]` باستخدام resumption handle.

4. **نهاية الدرس** (`api/voice/lesson/end/route.ts`)
   - بيبعت المدة الفعلية، والسيرفر بيعمل `endLesson` (خصم الدقايق الفعلية).
   - بعد الرد، في `after()` بيشغّل توليد الملخص (Gemini Flash).
   - الـ UI بيعمل polling على `api/voice/summary-status`.

### طبقة الـ quota (`lib/lessons/quota.ts`)
- بتاعة `import "server-only"`.
- مفيش أي حساب رصيد في TypeScript، كله في الـ RPC: `get_lesson_account`، `start_lesson`، `end_lesson`، `void_lesson`.

---

## 5. الشخصيات والبرومبت (`persona.ts`)

- كل شخصية فيها: id، اسم، إيموجي، لغة، صوت Gemini، `style` (energy: calm/balanced/high، vibe، humorStyle، correctionStyle، catchphrases)، traits، accent، topics، tutorTalkRatio، maxCorrectionsPerTurn، humor.
- `buildSystemInstructions` بيكتب برومبت إنجليزي (لاستقرار الموديل) والمدرّس بيتكلم بالمصري. قواعد أساسية فيه:
  - ممنوع يقرا قوائم، ممنوع يسأل أكتر من سؤال، جمل قصيرة (1–3 جمل).
  - تصحيح واحد بالكتير في الرد.
  - ممنوع يهلوس كلام المتعلم في الصمت.
  - يرجّع الحوار للغة الهدف دايماً.
- الأدوار الصوتية: أسماء أصوات Gemini مختارة لكل شخصية (Sulafat, Achird, Algieba, Vindemiatrix, Laomedeia, Sadachbia, Orus, Zephyr).

---

## 6. قاعدة البيانات (Supabase)

| Migration | المحتوى |
|---|---|
| 0001 | جداول الدروس + الدوال الأولى |
| 0002 | حسابات الدروس + `get_lesson_account` + `grant_subscription` |
| 0003 | الاشتراكات والمنح |
| 0004 | إصلاح أعمدة ملتبسة في RPCs |
| 0005 | تفضيلات المستخدم + `get_lesson_plan_context` + `save_lesson_summary` |
| 0006 | حفظ الشخصية `save_persona` |
| 0007 | صلاحيات الجداول (تغيير Supabase في أكتوبر 2026) |
| 0008 | OTP البريد: `create_email_otp` و`consume_email_otp` |
| 0009 | الملخصات بصلاحيات service_role |
| 0010 | التقدّم لكل مستوى + `save_home_preferences` |
| 0011 | تحديد المستوى (placement) |
| 0012 | السماح بتحدي 5 دقايق في `start_lesson` |
| 0013 | الأداء: `get_session_recap_text` + `get_session_bootstrap` |
| 0014 | XP وستريك: `award_xp` + `get_leaderboard` + `get_my_rank` |

**ملاحظة:** نفس اسم الدالة بيتكرر في أكتر من migration (زي `start_lesson` في 0001 و0002 و0004 و0012). الأحدث هو اللي شغال.

---

## 7. الأمان

- المفاتيح في `.env.local` وفي Vercel بس.
- كل endpoints الصوت بتتحقق من الـ session. صفحة الجلسة بتحوّل غير المسجّلين.
- التوكن `uses: 1` وقصير العمر.
- الـ OTP: hash (SHA-256) مش plaintext، TTL 10 دقايق، 5 محاولات. جدول `email_otps` مفيهوش policies وبيتوصل بالـ RPC بس.
- `awardXp` بيقفل الدقايق بين 1 و180 من السيرفر.
- `normalizeLessonMinutes` بيرفض أي مدة مش مسموحة من العميل.

---

## 8. الـ XP والتقدّم

- `lib/xp/actions.ts`: `awardXp(minutes)` بيستدعي RPC `award_xp` وبيعمل `updateTag` للكاش.
- `lib/xp/read.ts`: قراءة الـ XP. `leaderboard-actions.ts`: الليدر بورد.
- شرط تقدّم الوحدة: `SESSION_COMPLETE_RATIO = 0.6`. لو الجلسة أقل من 60% من وقتها الوحدة بتتكرر.

---

## 9. الصفحات (`apps/web/src/app`)

- `page.tsx`: الرئيسية (اختيار اللغة والمستوى والشخصية)
- `session/`: الجلسة الصوتية
- `review/`: مراجعة الملخصات
- `(auth)/`: login، signup، verify (OTP)، onboarding، placement
- `(app)/`: flashcards، leaderboard، mistakes، profile، streak-alert
- `auth/callback`: OAuth callback
- `api/placement/evaluate`: تقييم تحديد المستوى

---

## 10. ملاحظات ومشاكل لاحظتها

1. **تعديلات غير متعمّدة (uncommitted):** فيه 3 ملفات معدّلة:
   `packages/shared/src/syllabus/de.ts` و`es.ts` و`fr.ts` (حوالي 557 سطر لكل ملف).
   المحتوى الجديد فيه منهج كامل، **لكن `syllabus/index.ts` لسه بيسجّل `en` بس**،
   يعني الملفات دي مش هتتقري لحد ما تتضاف في الـ `SYLLABUS` map.
   كمان الـ git بيحذّر من CRLF/LF في الملفات دي.
2. **README متأخر:** بيقول `personas.ts` والملف الفعلي `persona.ts`، وجدول الـ migrations
   وقف عند 0008 والمشروع فيه لحد 0014. الـ README كمان مش فيه `scenarios.ts` ولا `syllabus/`.
3. **برومبت الشخصية:** فيه عنوانين متكررين تقريباً: `## Language rules` وبعده `## Language recognition (CRITICAL)`. ممكن ينضفوا.
4. **curriculum.ts:** فيه عنوان فيه "مastery" بحروف إنجليزية وسط عربي (C2-u06). تحسين شكلي بس.
5. **Next.js:** الـ AGENTS.md بيقول إن فيه breaking changes. أي كود Next جديد لازم يتراجع في `node_modules/next/dist/docs/` الأول.
6. **التحقق:** الـ shell على Windows بيشتغل PowerShell، فـ `head` و`echo a; b` مش شغالين. استخدم أوامر PowerShell أو أدوات الـ read/grep.

---

## 11. لسه ما اتدرسش بالتفصيل

- `apps/web/src/components/session/session-panel.tsx` وتنظيم الـ orchestration
- `lib/voice/gemini-live-provider.ts` و`lib/voice/audio.ts` (التفاصيل)
- `components/session/avatar/*` (الأفاتار 3D)
- `lib/lessons/summary.ts` و`lib/preferences.ts`
- `app/(app)/*` وصفحات الـ flashcards والـ mistakes
- `apps/mobile` (Flutter، قديم)
- `packages/shared/src/scenarios.ts`
- محتوى `en.ts` و`fr.ts` و`de.ts` و`es.ts` بالتفصيل
