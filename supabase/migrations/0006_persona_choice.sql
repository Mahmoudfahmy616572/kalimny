-- اختيار الشخصية (Voice DNA) للمستخدم.
--
-- المنصّة فيها 8 شخصيات (شخصيتان لكل لغة) وكل واحدة ليها صوت Gemini
-- فريد. المستخدم يختار شخصيته من الصفحة الرئيسية، ونحفظ اختياره في
-- user_preferences عشان الجلسات الجاية تفتح عليه تلقائيًا.
--
-- ملاحظات أمنية (نفس نمط 0002/0005):
--   * المستخدم يقرا صفه بس (RLS select own) — ممنوع أي كتابة مباشرة.
--   * الكتابة من الدالة SECURITY DEFINER تحت، وبتجيب المستخدم من
--     auth.uid() جوّاها مش من باراميتر.
--   * التطبيق (session page) بيتحقق إن المعرّف من PERSONAS في
--     packages/shared قبل النداء — الدالة بتحقق صيغة المعرّف بس.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) عمود الاختيار في user_preferences
-- ============================================================

alter table public.user_preferences
  add column if not exists persona_id text
  check (persona_id is null or char_length(persona_id) <= 64);

-- ============================================================
-- 2) حفظ اختيار الشخصية
-- ============================================================

create or replace function public.save_persona(p_persona_id text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  if p_persona_id is null or char_length(p_persona_id) = 0 or char_length(p_persona_id) > 64 then
    raise exception 'invalid persona_id' using errcode = '22023';
  end if;

  -- صف التفضيلات موجود بعد الـ onboarding — لو مش موجود ده مش مسجّل لسه،
  -- وننسى الكتابة بصمت (الجلسة نفسها هترفض قبل كده).
  update public.user_preferences
  set persona_id  = p_persona_id,
      updated_at  = now()
  where user_id = v_user;
end;
$$;

-- ============================================================
-- 3) قراءة سياق الجلسة: نرجّع persona_id كمان
-- ============================================================

-- ملاحظة: Postgres بيرفض CREATE OR REPLACE لو نوع الإرجاع اتغيّر،
-- فنحذف الدالة القديمة الأول ثم نعيد بناءها بنفس الاسم/الباراميترات.
drop function if exists public.get_lesson_plan_context(text);

create function public.get_lesson_plan_context(p_language text)
returns table (
  onboarded      boolean,
  language       text,
  level          text,
  goal           text,
  interests      text[],
  daily_minutes  integer,
  unit_index     integer,
  recap_words    jsonb,
  persona_id     text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  if p_language is null or p_language not in ('en', 'fr', 'es', 'de') then
    raise exception 'invalid language: %', p_language using errcode = '22023';
  end if;

  return query
    select
      coalesce(prefs.onboarded, false),
      p_language,
      prefs.level,
      prefs.goal,
      coalesce(prefs.interests, '{}'),
      prefs.daily_minutes,
      coalesce(prog.unit_index, 0),
      (
        select COALESCE(
          (select jsonb_agg(word -> 'term')
             from jsonb_array_elements(
                    (select ls.words from public.lesson_summaries ls
                      where ls.user_id = v_user and ls.language = p_language
                      order by ls.created_at desc limit 1)
                  ) WITH ORDINALITY AS t(word, ord)
            where ord <= 3),
          '[]'::jsonb
        )
      ),
      prefs.persona_id
    from (select v_user as uid) AS u
    left join public.user_preferences prefs on prefs.user_id = u.uid
    left join public.user_progress    prog on prog.user_id = u.uid and prog.language = p_language;
end;
$$;

-- ============================================================
-- 4) الصلاحيات
-- ============================================================

revoke all on function public.save_persona(text) from public;
revoke all on function public.save_persona(text) from anon;
revoke all on function public.get_lesson_plan_context(text) from public;
revoke all on function public.get_lesson_plan_context(text) from anon;

grant execute on function public.save_persona(text) to authenticated;
grant execute on function public.get_lesson_plan_context(text) to authenticated;
