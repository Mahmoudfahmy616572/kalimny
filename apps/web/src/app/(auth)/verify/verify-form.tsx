"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  resendOtpAction,
  verifyOtpAction,
  type AuthState,
} from "../actions";

const initialState: AuthState = { error: null, message: null };

const inputClass =
  "w-full rounded-2xl border border-border bg-cream px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta-soft";

export function VerifyForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(
    verifyOtpAction,
    initialState,
  );
  const [resendState, resendAction, resendPending] = useActionState(
    resendOtpAction,
    initialState,
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-1 text-center">
        <span className="text-3xl">☕</span>
        <h1 className="text-2xl font-bold">أكّد بريدك</h1>
        <p className="text-sm text-muted">
          بعتنالك كود من 4 أرقام على{" "}
          <span dir="ltr" className="font-semibold text-terracotta">
            {email}
          </span>
        </p>
      </header>

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="email" value={email} />

        <label className="flex flex-col gap-1 text-sm font-medium">
          كود التحقق
          <input
            name="code"
            type="text"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={4}
            pattern="\d{4}"
            dir="ltr"
            placeholder="••••"
            className={`${inputClass} text-center text-2xl tracking-[0.5em]`}
          />
        </label>

        {state.error ? (
          <p className="rounded-2xl bg-terracotta-soft/50 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-terracotta px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
        >
          {pending ? "جاري التأكيد…" : "تأكيد ودخول"}
        </button>
      </form>

      <form action={resendAction} className="flex flex-col gap-2">
        <input type="hidden" name="email" value={email} />
        {resendState.message ? (
          <p className="rounded-2xl bg-sage-soft/60 px-4 py-3 text-sm">
            {resendState.message}
          </p>
        ) : null}
        {resendState.error ? (
          <p className="rounded-2xl bg-terracotta-soft/50 px-4 py-3 text-sm">
            {resendState.error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={resendPending}
          className="rounded-2xl border border-border px-4 py-2 text-sm font-medium text-muted transition hover:bg-cream disabled:opacity-60"
        >
          {resendPending ? "جاري الإرسال…" : "مابعتليش؟ ابعت تاني"}
        </button>
      </form>

      <p className="text-center text-sm text-muted">
        عندك حساب بالفعل؟{" "}
        <Link href="/login" className="font-semibold text-terracotta">
          سجّل دخولك
        </Link>
      </p>
    </div>
  );
}
