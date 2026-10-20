-- تقدّم لكل مستوى (مش لكلغة بس) + حفظ اختيار المستوى من الرئيسية.
--
-- المشكلة:
--   * مؤشر "مستواك دلوقتي" في الرئيسية كان بيعرض وحدات المستوى
--     المحفوظ في الحساب، لكن اختيار المستوى في الواجهة كان local state
--     مش محفوظ → المستخدم يختار A1 ويظل يشوف تقدّم A2.
--   * جدول user_progress مفتاحه (user_id, language) → مستحيل يكون فيه
--     مؤشر منفصل لكل مستوى، فتبديل المستوى بيورّي وحدات مستوى تاني.
--
-- الحل:
--   1) عمود level في user_progress + مفتاح أساسي (user_id, language, level).
--   2) دالة save_home_preferences لتحديث المستوى/اللغة من الرئيسية
--      (والجلسة بتستدعيها كمان لو الرابط فيها مستوى مختلف عن المحفوظ).
--   3) كل الدوال اللي ب تقرا/تكتب التقدّم بقت تستخدم مستوى المستخدم.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) عمود المستوى + إعادة بناء المفتاح الأساسي
-- ============================================================

alter table public.user_progress
  add column if not exists level text not null default 'A1'
  check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'));

-- تعبئة الصفوف القديمة بمستوى المستخدم المحفوظ.
update public.user_progress up
set level = coalesce(
  (select p.level from public.user_preferences p where p.user_id = up.user_id),
  'A1'
);

-- لو التعبئة خلّت صفوف مكررة (نفس المستخدم/اللغة/المرحلة) نسيب الأحدث.
delete from public.user_progress a
using public.user_progress b
where a.user_id = b.user_id
  and a.language = b.language
  and a.level = b.level
  and (a.updated_at, a.created_at) < (b.updated_at, b.created_at);

alter table public.user_progress drop constraint if exists user_progress_pkey;
alter table public.user_progress add primary key (user_id, language, level);

-- ============================================================
-- 2) حفظ اختيار المستوى/اللغة من الرئيسية (أو من رابط الجلسة)
-- ============================================================

create or replace function public.save_home_preferences(
  p_level    text,
  p_language text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();
  v_lang text;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  if p_level is null or p_level not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2') then
    raise exception 'invalid level: %', p_level using errcode = '22023';
  end if;

  if p_language is not null and p_language not in ('en', 'fr', 'es', 'de') then
    raise exception 'invalid language: %', p_language using errcode = '22023';
  end if;

  update public.user_preferences
  set level      = p_level,
      language   = coalesce(p_language, language),
      updated_at = now()
  where user_id = v_user
  returning language into v_lang;

  -- لسه ما خلّصش onboarding → مفيش صف تفضيلات وننسى الكتابة بصمت.
  if v_lang is null then
    return;
  end if;

  -- نضمن صف التقدّم للمستوى المختار (لو لسه ما اتعملش يبدأ من 0).
  insert into public.user_progress (user_id, language, level)
  values (v_user, v_lang, p_level)
  on conflict (user_id, language, level) do nothing;
end;
$$;

-- ============================================================
-- 3) قراءة سياق الجلسة: مؤشر الوحدات لمستوى المستخدم الحالي
-- ============================================================

-- Postgres بيرفض CREATE OR REPLACE لو نوع الإرجاع اتغيّر — نحذف ثم نعيد.
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
    left join public.user_progress prog
           on prog.user_id  = u.uid
          and prog.language = p_language
          and prog.level    = coalesce(prefs.level, 'A1');
end;
$$;

-- ============================================================
-- 4) حفظ ملخص الجلسة: التقدّم بيتكتب لمستوى المستخدم الحالي
-- ============================================================

create or replace function public.save_lesson_summary(
  p_session_id uuid,
  p_language   text,
  p_unit_index integer,
  p_words      jsonb,
  p_phrases    jsonb,
  p_grammar    jsonb,
  p_advance    boolean
)
returns table (ok boolean, new_unit_index integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user   uuid := auth.uid();
  v_owner  uuid;
  v_index  integer;
  v_level  text;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select s.user_id into v_owner
  from public.lesson_sessions s
  where s.id = p_session_id;

  if v_owner is null or v_owner <> v_user then
    raise exception 'session not found' using errcode = '22025';
  end if;

  insert into public.lesson_summaries
    (user_id, session_id, language, unit_index, words, phrases, grammar)
  values
    (v_user, p_session_id, p_language, coalesce(p_unit_index, 0),
     coalesce(p_words, '[]'::jsonb), coalesce(p_phrases, '[]'::jsonb),
     coalesce(p_grammar, '[]'::jsonb))
  on conflict (session_id) do update
    set words   = excluded.words,
        phrases = excluded.phrases,
        grammar = excluded.grammar;

  v_index := coalesce(p_unit_index, 0);

  if coalesce(p_advance, false) then
    v_index := v_index + 1;
    select coalesce(level, 'A1') into v_level
    from public.user_preferences where user_id = v_user;

    insert into public.user_progress (user_id, language, level, unit_index)
    values (v_user, p_language, coalesce(v_level, 'A1'), v_index)
    on conflict (user_id, language, level) do update
      set unit_index = excluded.unit_index,
          updated_at = now();
  end if;

  return query select true, v_index;
end;
$$;

-- ============================================================
-- 5) نسخة service_role (من 0009): نفس التعديل لكل مستوى
-- ============================================================

create or replace function public.save_lesson_summary_for_user(
  p_user_id    uuid,
  p_session_id uuid,
  p_language   text,
  p_unit_index integer,
  p_words      jsonb,
  p_phrases    jsonb,
  p_grammar    jsonb,
  p_advance    boolean
)
returns table (ok boolean, new_unit_index integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_owner uuid;
  v_index integer;
  v_level text;
begin
  if p_user_id is null then
    raise exception 'user id required' using errcode = '28000';
  end if;

  select s.user_id into v_owner
  from public.lesson_sessions s
  where s.id = p_session_id;

  if v_owner is null or v_owner <> p_user_id then
    raise exception 'session not found' using errcode = '22025';
  end if;

  insert into public.lesson_summaries
    (user_id, session_id, language, unit_index, words, phrases, grammar)
  values
    (p_user_id, p_session_id, p_language, coalesce(p_unit_index, 0),
     coalesce(p_words, '[]'::jsonb), coalesce(p_phrases, '[]'::jsonb),
     coalesce(p_grammar, '[]'::jsonb))
  on conflict (session_id) do update
    set words   = excluded.words,
        phrases = excluded.phrases,
        grammar = excluded.grammar;

  v_index := coalesce(p_unit_index, 0);

  if coalesce(p_advance, false) then
    v_index := v_index + 1;
    select coalesce(level, 'A1') into v_level
    from public.user_preferences where user_id = p_user_id;

    insert into public.user_progress (user_id, language, level, unit_index)
    values (p_user_id, p_language, coalesce(v_level, 'A1'), v_index)
    on conflict (user_id, language, level) do update
      set unit_index = excluded.unit_index,
          updated_at = now();
  end if;

  return query select true, v_index;
end;
$$;

drop function if exists public.get_lesson_plan_context_for_user(uuid, text);

create function public.get_lesson_plan_context_for_user(
  p_user_id  uuid,
  p_language text
)
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
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if p_user_id is null then
    raise exception 'user id required' using errcode = '28000';
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
                      where ls.user_id = p_user_id and ls.language = p_language
                      order by ls.created_at desc limit 1)
                  ) WITH ORDINALITY AS t(word, ord)
            where ord <= 3),
          '[]'::jsonb
        )
      ),
      prefs.persona_id
    from (select p_user_id as uid) AS u
    left join public.user_preferences prefs on prefs.user_id = u.uid
    left join public.user_progress prog
           on prog.user_id  = u.uid
          and prog.language = p_language
          and prog.level    = coalesce(prefs.level, 'A1');
end;
$$;

-- ============================================================
-- 6) التقدّم يبتدي من 0 لأي مستوى جديد (نفس منطق save_user_preferences)
-- ============================================================

create or replace function public.save_user_preferences(
  p_language      text,
  p_level         text,
  p_goal          text,
  p_interests     text[],
  p_daily_minutes integer
)
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

  if p_language is null or p_language not in ('en', 'fr', 'es', 'de') then
    raise exception 'invalid language: %', p_language using errcode = '22023';
  end if;
  if p_level is null or p_level not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2') then
    raise exception 'invalid level: %', p_level using errcode = '22023';
  end if;
  if p_goal is null or p_goal not in ('travel', 'work', 'immigration', 'hobby', 'social') then
    raise exception 'invalid goal: %', p_goal using errcode = '22023';
  end if;
  if p_daily_minutes is null or p_daily_minutes < 5 or p_daily_minutes > 240 then
    raise exception 'invalid daily_minutes: %', p_daily_minutes using errcode = '22023';
  end if;

  insert into public.user_preferences
    (user_id, language, level, goal, interests, daily_minutes, onboarded)
  values
    (v_user, p_language, p_level, p_goal,
     coalesce(p_interests, '{}'), p_daily_minutes, true)
  on conflict (user_id) do update
    set language      = excluded.language,
        level         = excluded.level,
        goal          = excluded.goal,
        interests     = excluded.interests,
        daily_minutes = excluded.daily_minutes,
        onboarded     = true,
        updated_at    = now();

  insert into public.user_progress (user_id, language, level)
  values (v_user, p_language, p_level)
  on conflict (user_id, language, level) do nothing;
end;
$$;

-- ============================================================
-- 7) الصلاحيات
-- ============================================================

revoke all on function public.save_home_preferences(text, text) from public, anon;
grant execute on function public.save_home_preferences(text, text) to authenticated;

revoke all on function public.get_lesson_plan_context(text) from public, anon;
grant execute on function public.get_lesson_plan_context(text) to authenticated;

revoke all on function public.save_lesson_summary(uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  from public, anon;
grant execute on function public.save_lesson_summary(uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  to authenticated;

revoke all on function public.save_user_preferences(text, text, text, text[], integer)
  from public, anon;
grant execute on function public.save_user_preferences(text, text, text, text[], integer)
  to authenticated;

revoke all on function public.save_lesson_summary_for_user(uuid, uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  from public, anon, authenticated;
grant execute on function public.save_lesson_summary_for_user(uuid, uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  to service_role;

revoke all on function public.get_lesson_plan_context_for_user(uuid, text)
  from public, anon, authenticated;
grant execute on function public.get_lesson_plan_context_for_user(uuid, text)
  to service_role;
