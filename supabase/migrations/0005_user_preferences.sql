-- تفضيلات المستخدم + مسار التعلّم + ملخصات الدروس.
--
-- بيحل مشكلتين:
--   1) الـ onboarding: بعد التسجيل بنحفظ اللغة/المستوى/الهدف/الاهتمامات/الوقت
--      اليومي عشان المدرّس الذكي ياخد مسار واضح بدل العشوائية.
--   2) الذاكرة: كل جلسة بتسيب ملخص (كلمات/جمل/قواعد) + رقم وحدة متقدّم،
--      فالمدرّس يرجع يفتّكر آخر جلسة والمستخدم يراجع منها.
--
-- ملاحظات أمنية (نفس نمط 0002):
--   * المستخدم يقرا صفوفه بس (RLS select own) — ممنوع أي كتابة مباشرة.
--   * كل الكتابة من الدوال SECURITY DEFINER تحت، وبتجيب المستخدم من
--     auth.uid() جواها مش من باراميتر (ما عدا save_lesson_summary اللي
--     بياخد session_id وتتأكد إنه بتاع المستخدم نفسه).
--   * مفيش كتابة من المتصفح لـ lesson_summaries — بتتكتب من السيرفر
--     بعد توليد الملخص بـ Gemini.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) الجداول
-- ============================================================

-- صف واحد لكل مستخدم: إجابات الـ onboarding.
-- القيم المسموحة للـ goal بتطابق GOAL_IDS في packages/shared.
create table if not exists public.user_preferences (
  user_id       uuid        primary key references auth.users (id) on delete cascade,
  language      text        not null check (language in ('en', 'fr', 'es', 'de')),
  level         text        not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  goal          text        not null check (goal in ('travel', 'work', 'immigration', 'hobby', 'social')),
  interests     text[]      not null default '{}',
  daily_minutes integer     not null check (daily_minutes between 5 and 240),
  onboarded     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- تقدّم المستخدم في المنهج: رقم الوحدة الحالية لكل لغة.
-- الوحدات خطية (unit 0 → 1 → 2 ...) داخل مستوى المستخدم.
create table if not exists public.user_progress (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  language   text        not null check (language in ('en', 'fr', 'es', 'de')),
  unit_index integer     not null default 0 check (unit_index >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, language)
);

-- ملخص كل جلسة: أهم الكلمات والجمل والقواعد اللي اتقالت.
-- الـ jsonb arrays بتتخزن بصيغة:
--   words:   [{ "term": "...", "meaning": "...", "example": "..." }]
--   phrases: [{ "phrase": "...", "meaning": "..." }]
--   grammar: [{ "point": "...", "explanation": "...", "example": "..." }]
create table if not exists public.lesson_summaries (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users (id) on delete cascade,
  session_id uuid        not null unique references public.lesson_sessions (id) on delete cascade,
  language   text        not null check (language in ('en', 'fr', 'es', 'de')),
  unit_index integer     not null default 0,
  words      jsonb       not null default '[]'::jsonb,
  phrases    jsonb       not null default '[]'::jsonb,
  grammar    jsonb       not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lesson_summaries_user_language_idx
  on public.lesson_summaries (user_id, language, created_at desc);

-- ============================================================
-- 2) RLS: قراءة الصفوف الشخصية بس
-- ============================================================

alter table public.user_preferences enable row level security;
alter table public.user_progress    enable row level security;
alter table public.lesson_summaries enable row level security;

drop policy if exists user_preferences_select_own on public.user_preferences;
create policy user_preferences_select_own on public.user_preferences
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists user_progress_select_own on public.user_progress;
create policy user_progress_select_own on public.user_progress
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists lesson_summaries_select_own on public.lesson_summaries;
create policy lesson_summaries_select_own on public.lesson_summaries
  for select to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- 3) حفظ إجابات الـ onboarding (بيهيّئ كمان صف التقدّم)
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

  -- نensure صف التقدّم موجود (مبدأيًا الوحدة 0).
  insert into public.user_progress (user_id, language)
  values (v_user, p_language)
  on conflict (user_id, language) do nothing;
end;
$$;

-- ============================================================
-- 4) قراءة سياق الجلسة (تفضيلات + تقدّم + آخر ملخص للرجوع)
-- ============================================================

-- بترجع كل اللي المدرّس محتاجه يفتح بيه الجلسة في نداء واحد.
-- recap_words: أهم 3 كلمات من آخر ملخص (لو فيه) — عشان يفتّكر ويكمّل.
create or replace function public.get_lesson_plan_context(p_language text)
returns table (
  onboarded      boolean,
  language       text,
  level          text,
  goal           text,
  interests      text[],
  daily_minutes  integer,
  unit_index     integer,
  recap_words    jsonb
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
      )
    from (select v_user as uid) AS u
    left join public.user_preferences prefs on prefs.user_id = u.uid
    left join public.user_progress    prog on prog.user_id = u.uid and prog.language = p_language;
end;
$$;

-- ============================================================
-- 5) حفظ ملخص الجلسة + (اختياريًا) تقدّم الوحدة
-- ============================================================

-- بتنده من السيرفر بعد توليد الملخص بـ Gemini.
-- p_advance: true لو الجلسة خلصت عادي واتستهلكت ≥ 60% من الوقت —
-- كده الوحدة تتخطى والجايّة تكمل من اللي بعدها. غير كده تتكرر.
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
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- نتأكد الجلسة بتاعة المستخدم نفسه (منع كتابة ملخصات لجلسات غيرك).
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
    insert into public.user_progress (user_id, language, unit_index)
    values (v_user, p_language, v_index)
    on conflict (user_id, language) do update
      set unit_index = excluded.unit_index,
          updated_at = now();
  end if;

  return query select true, v_index;
end;
$$;

-- ============================================================
-- 6) الصلاحيات
-- ============================================================

revoke all on function public.save_user_preferences(text, text, text, text[], integer)
  from public, anon;
revoke all on function public.get_lesson_plan_context(text) from public, anon;
revoke all on function public.save_lesson_summary(uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  from public, anon;

grant execute on function public.save_user_preferences(text, text, text, text[], integer)
  to authenticated;
grant execute on function public.get_lesson_plan_context(text) to authenticated;
-- بتتنده من السيرفر بجلسة المستخدم (كوكيز) — authenticated كافي، مفيش
-- داعي نمنح service_role لأن الدالة بتشوف auth.uid() جواها.
grant execute on function public.save_lesson_summary(uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  to authenticated;
