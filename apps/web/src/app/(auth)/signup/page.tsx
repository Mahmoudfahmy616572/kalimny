"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUpAction, type AuthState } from "../actions";

const initialState: AuthState = { error: null, message: null };

const inputClass =
  "w-full rounded-2xl border border-border bg-cream px-4 py-3 text-sm outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta-soft";

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col items-center gap-1 text-center">
        <span className="text-3xl">☕</span>
        <h1 className="text-2xl font-bold">اعمل حساب جديد</h1>
        <p className="text-sm text-muted">دقيقة واحدة وتبدأ تتكلم</p>
      </header>

      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          اسمك
          <input
            name="displayName"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          البريد الإلكتروني
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            dir="ltr"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          كلمة المرور
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            dir="ltr"
            className={inputClass}
          />
        </label>

        {state.error ? (
          <p className="rounded-2xl bg-terracotta-soft/50 px-4 py-3 text-sm">
            {state.error}
          </p>
        ) : null}

        {state.message ? (
          <p className="rounded-2xl bg-sage-soft/60 px-4 py-3 text-sm">
            {state.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-terracotta px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
        >
          {pending ? "جاري الإنشاء…" : "إنشاء الحساب"}
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
