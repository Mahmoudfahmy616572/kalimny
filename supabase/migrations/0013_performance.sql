-- تحسينات الأداء: نداءات أقل + نقل بيانات أقل.
--
-- 1) get_session_recap_text: بيبني نص الـ recap داخل الداتابيز (SQL) بدل ما
--    نpull الأعمدة JSON كاملة ونقصّها في السيرفر. نقل البيانات بيقلّ من
--    عشرات الكيلوبايت لـ ~١ كيلوبايت لكل جلسة.
--
-- 2) get_session_bootstrap: نداء واحد بيجيب (حساب الرصيد + سياق الدرس)
--    بدل نداءين منفصلين — توفير round-trip في كل فتح جلسة.

-- ============================================================
-- get_session_recap_text
-- ============================================================
create or replace function public.get_session_recap_text(p_language text)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user   uuid := auth.uid();
  v_rows   jsonb;
  v_result text;
  v_words  text;
  v_phrases text;
  i        integer;
  s        jsonb;
  item     jsonb;
begin
  if v_user is null then
    return '';
  end if;

  -- آخر جلستين لنفس اللغة
  select coalesce(
           jsonb_agg(
             jsonb_build_object(
               'words',   coalesce(s.words,   '[]'::jsonb),
               'phrases', coalesce(s.phrases, '[]'::jsonb)
             )
           ),
           '[]'::jsonb
         )
    into v_rows
  from (
    select ls.words, ls.phrases
    from public.lesson_summaries ls
    where ls.user_id = v_user
      and ls.language = p_language
    order by ls.created_at desc
    limit 2
  ) s;

  if v_rows = '[]'::jsonb then
    return '';
  end if;

  v_words   := '';
  v_phrases := '';

  for i in 0..jsonb_array_length(v_rows) - 1 loop
    s := v_rows -> i;

    -- أول ٥ كلمات
    for item in select value from jsonb_array_elements(s -> 'words') limit 5 loop
      if jsonb_typeof(item -> 'term') = 'string' and coalesce(item ->> 'term', '') <> '' then
        v_words := v_words || case when v_words = '' then '' else ', ' end ||
                   (item ->> 'term');
      end if;
    end loop;

    -- أول ٣ جمل
    for item in select value from jsonb_array_elements(s -> 'phrases') limit 3 loop
      if jsonb_typeof(item -> 'phrase') = 'string' and coalesce(item ->> 'phrase', '') <> '' then
        v_phrases := v_phrases || case when v_phrases = '' then '' else ', ' end ||
                     (item ->> 'phrase');
      end if;
    end loop;

    if i = 0 then
      v_result := E'## MEMORY BETWEEN SESSIONS (VERY IMPORTANT)\n' ||
        'You MUST remember the learner from previous sessions. Act like you''ve spoken before.\n' ||
        E'\n### Last session (most recent):';
    else
      v_result := v_result || E'\n### Older session:';
    end if;

    if v_words <> '' then
      v_result := v_result || E'\n- Words learned: ' || v_words;
    end if;
    if v_phrases <> '' then
      v_result := v_result || E'\n- Useful phrases: ' || v_phrases;
    end if;

    v_words   := '';
    v_phrases := '';
  end loop;

  v_result := v_result ||
    E'\n\n- Start naturally: "إزيك؟ فاكر لما كنا بنتكلم المرة اللي فاتت عن..." or reference something from above.' ||
    E'\n- Don''t start from scratch. Pick up where you left off naturally.' ||
    E'\n- Be subtle, don''t list everything like a robot.';

  return v_result;
end;
$$;

grant execute on function public.get_session_recap_text(text) to authenticated;

-- ============================================================
-- get_session_bootstrap
-- ============================================================
-- لازم drop قبل create لأننا غيّرنا نوع الـ return (interests بقت text[]).
drop function if exists public.get_session_bootstrap(text);

create function public.get_session_bootstrap(p_language text)
returns table (
  onboarded          boolean,
  language           text,
  level              text,
  goal               text,
  interests          text[],
  daily_minutes      integer,
  unit_index         integer,
  recap_words        jsonb,
  persona_id         text,
  trial_lessons_left integer,
  paid_minutes_left  integer,
  paid_period_end    timestamptz,
  has_active_plan    boolean
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user uuid := auth.uid();

  -- التفضيلات (سكالارز — نتجنّب الوصول لحقول record null)
  v_prefs_onboarded boolean := false;
  v_prefs_language  text;
  v_prefs_level     text;
  v_prefs_goal      text;
  v_prefs_interests text[] := '{}'::text[];
  v_prefs_minutes   integer;
  v_prefs_persona   text;

  -- خطة الدرس
  v_plan_onboarded boolean;
  v_plan_language  text;
  v_plan_level     text;
  v_plan_goal      text;
  v_plan_interests text[];
  v_plan_minutes   integer;
  v_plan_unit      integer := 0;
  v_plan_recap     jsonb := '[]'::jsonb;
  v_plan_persona   text;

  -- الرصيد
  v_trial      integer;
  v_paid       integer;
  v_period_end timestamptz;
  v_has_plan   boolean;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- التفضيلات
  select p.onboarded, p.language, p.level, p.goal, p.interests,
         p.daily_minutes, p.persona_id
    into v_prefs_onboarded, v_prefs_language, v_prefs_level, v_prefs_goal,
         v_prefs_interests, v_prefs_minutes, v_prefs_persona
  from public.user_preferences p
  where p.user_id = v_user;

  if not found then
    v_prefs_onboarded := false;
    v_prefs_interests := '{}'::text[];
  end if;

  -- خطة الدرس (الوحدة الحالية + كلمات الملخص)
  select ctx.onboarded, ctx.language, ctx.level, ctx.goal, ctx.interests,
         ctx.daily_minutes, ctx.unit_index, ctx.recap_words, ctx.persona_id
    into v_plan_onboarded, v_plan_language, v_plan_level, v_plan_goal,
         v_plan_interests, v_plan_minutes, v_plan_unit, v_plan_recap, v_plan_persona
  from public.get_lesson_plan_context(p_language) ctx;

  -- الرصيد (بنفس منطق get_lesson_account بالظبط)
  insert into public.lesson_accounts (user_id, trial_lessons_left, paid_minutes_left)
  values (v_user, 3, 0)
  on conflict (user_id) do nothing;

  select a.trial_lessons_left, a.paid_minutes_left, a.paid_period_end,
         (a.paid_period_end is not null and a.paid_period_end > now())
    into v_trial, v_paid, v_period_end, v_has_plan
  from public.lesson_accounts a
  where a.user_id = v_user
  for update;

  if not found then
    v_trial := 0;
    v_paid  := 0;
    v_period_end := null;
    v_has_plan := false;
  end if;

  -- من غير اشتراك ساري، الدقايق المدفوعة ما تُحسبش.
  if not v_has_plan then
    v_paid := 0;
  end if;

  return query
  select
    coalesce(v_plan_onboarded, v_prefs_onboarded, false),
    coalesce(v_plan_language, v_prefs_language, p_language),
    coalesce(v_plan_level, v_prefs_level),
    coalesce(v_plan_goal, v_prefs_goal),
    coalesce(v_plan_interests, v_prefs_interests, '{}'::text[]),
    coalesce(v_plan_minutes, v_prefs_minutes),
    coalesce(v_plan_unit, 0),
    coalesce(v_plan_recap, '[]'::jsonb),
    coalesce(v_plan_persona, v_prefs_persona),
    coalesce(v_trial, 0),
    coalesce(v_paid, 0),
    v_period_end,
    coalesce(v_has_plan, false);
end;
$$;

grant execute on function public.get_session_bootstrap(text) to authenticated;
