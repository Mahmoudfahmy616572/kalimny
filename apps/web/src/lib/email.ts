import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/**
 * إرسال البريد عبر Brevo SMTP.
 *
 * بنستخدم SMTP relay بتاع Brevo بدل SMTP الافتراضي بتاع Supabase عشان
 * نتجنّب الـ rate limit ومنتحكمش في شكل الرسالة. بيانات الاعتماد من
 * متغيّرات البيئة:
 *   SMTP_HOST      (افتراضي smtp-relay.brevo.com)
 *   SMTP_PORT      (افتراضي 587)
 *   SMTP_USER      (بريد الحساب في Brevo)
 *   SMTP_PASS      (SMTP key من Brevo)
 *   SMTP_FROM      (بريد المرسل الموثّق)
 *   SMTP_FROM_NAME (اسم المرسل — افتراضي "Kalimny")
 *
 * لو الإعدادات مش موجودة، الإرسال بيرمي خطأ واضح بدل ما يفشل بصت.
 */

let cached: Transporter | null = null;

function getTransport(): Transporter {
  if (cached) return cached;

  const host = process.env.SMTP_HOST ?? "smtp-relay.brevo.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP not configured: SMTP_USER / SMTP_PASS are required",
    );
  }

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cached;
}

function fromAddress(): string {
  const email = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  if (!email) {
    throw new Error("SMTP not configured: SMTP_FROM is required");
  }
  const name = process.env.SMTP_FROM_NAME ?? "Kalimny";
  return `${name} <${email}>`;
}

export async function sendOtpEmail(params: {
  to: string;
  code: string;
  displayName: string | null;
}): Promise<void> {
  const { to, code, displayName } = params;
  const name = displayName?.trim() ? displayName.trim() : "صديقنا";

  const subject = `كود تأكيد حسابك في Kalimny: ${code}`;

  const text = [
    `أهلاً ${name}،`,
    "",
    `كود تأكيد حسابك في Kalimny هو: ${code}`,
    "",
    "الكود صالح 10 دقايق. لو مش إنت اللي طلبته، تجاهل الرسالة.",
    "",
    "— فريق Kalimny ☕",
  ].join("\n");

  const html = `<!doctype html>
<html lang="ar" dir="rtl">
  <body style="margin:0;padding:0;background:#f7f3ee;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:460px;margin:0 auto;padding:32px 20px">
      <div style="text-align:center;font-size:28px">☕</div>
      <h1 style="text-align:center;font-size:20px;color:#2b2b2b;margin:8px 0 4px">
        أهلاً ${name}
      </h1>
      <p style="text-align:center;color:#6b6b6b;font-size:14px;margin:0 0 24px">
        استخدم الكود ده لتأكيد حسابك وتبدأ تتكلم
      </p>
      <div style="background:#fff;border:1px solid #eadfd5;border-radius:16px;padding:24px;text-align:center">
        <div style="font-size:36px;letter-spacing:12px;font-weight:bold;color:#c1683c;direction:ltr">
          ${code}
        </div>
      </div>
      <p style="text-align:center;color:#9a9a9a;font-size:12px;margin:24px 0 0">
        الكود صالح 10 دقايق. لو مش إنت اللي طلبته، تجاهل الرسالة.
      </p>
    </div>
  </body>
</html>`;

  await getTransport().sendMail({
    from: fromAddress(),
    to,
    subject,
    text,
    html,
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}
