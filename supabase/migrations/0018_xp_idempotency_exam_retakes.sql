-- إصلاحان مرتبطان بتجربة المستخدم:
--
-- 1) XP كان بيتحسب من العميل بعد نهاية الجلسة، و`award_xp` مش tied بأي جلسة.
--    يعني إعادة إنهاء نفس الجلسة (أو نداء الدالة مباشرة) كانت بتدي XP تاني.
--    دلوقتي المنح بيحصل من السيرفر بعد `end_lesson`، ومرة واحدة لكل جلسة
--    عن طريق جدول `lesson_xp_awards` (session_id مفتاح أساسي).
--
-- 2) `0017` كان بيقفل المحاولات نهائيًا بعد ٣ محاولات على نفس الوحدة.
--    ولأن الترقية في الوحدات اللي ليها بنك أسئلة بتحصل بالنجاح بس، الطالب
--    اللي يفشل ٣ مرات كان بيفضل معلّق على الوحدة للأبد. الحد اتشال: كل
--    محاولة أصلًا محتاجة جلسة درس جديدة (`submitExam` بيرفض نفس الجلسة)،
--    فمفيش تكرار مجاني. عدد المحاولات لسه بيرجع للواجهة للعرض بس.

-- ============================================================
-- 1) جدول منح XP لكل جلسة
-- ============================================================

create table if not exists public.lesson_xp_awards (
  session_id uuid        primary key references public.lesson_sessions (id) on delete cascade,
  user_id    uuid        not null references auth.users (id) on delete cascade,
  minutes    integer     not null check (minutes > 0),
  gained     integer     not null check (gained > 0),
  created_at timestamptz not null default now()
);

create index if not exists lesson_xp_awards_user_idx
  on public.lesson_xp_awards (user_id, created_at desc);

alter table public.lesson_xp_awards enable row level security;

-- مفيش policies: الجدول للقراءة/الكتابة من السيرفر بس.
revoke all on public.lesson_xp_awards from public, anon, authenticated;
grant select, insert, update, delete on public.lesson_xp_awards to service_role;

-- ============================================================
-- 2) منح XP مرة واحدة لكل جلسة
-- ============================================================

-- الدقايق بتتقرا من الجلسة نفسها (used_seconds) مش من العميل، فالنتيجة
-- ثابتة مهما اتعاودت — حتى لو النداء التاني رجع `already_ended` بدون دقايق.
create or replace function public.award_xp_for_session(p_session_id uuid)
returns table (
  xp             integer,
  streak         integer,
  gained         integer,
  total_sessions integer,
  total_minutes  integer,
  awarded        boolean
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user     uuid := auth.uid();
  v_owner    uuid;
  v_status   text;
  v_alloc    integer;
  v_seconds  integer;
  v_minutes  integer;
  v_gain     integer;
  v_day      date := public.current_lesson_day();
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select s.user_id, s.status, s.allocated_minutes, s.used_seconds
    into v_owner, v_status, v_alloc, v_seconds
  from public.lesson_sessions s
  where s.id = p_session_id;

  if v_owner is null or v_owner <> v_user then
    raise exception 'session not found' using errcode = '22025';
  end if;

  -- الجلسة لازم تكون اتقفلت. الجلسة النشطة أو الملغاة ملهاش XP.
  if v_status <> 'ended' then
    return query
      select ux.xp, ux.streak, 0, ux.total_sessions, ux.total_minutes, false
      from public.user_xp ux
      where ux.user_id = v_user;
    return;
  end if;

  v_minutes := least(v_alloc, greatest(1, ceil(coalesce(v_seconds, 0) / 60.0)::int));
  v_gain := greatest(10, v_minutes * 2);

  -- ON CONFLICT DO NOTHING = الحماية من التكرار. لو الصف موجود، FOUND = false
  -- وبنرجع الرصيد الحالي من غير ما نزوّد حاجة.
  insert into public.lesson_xp_awards (session_id, user_id, minutes, gained)
  values (p_session_id, v_user, v_minutes, v_gain)
  on conflict (session_id) do nothing;

  if not found then
    return query
      select ux.xp, ux.streak, 0, ux.total_sessions, ux.total_minutes, false
      from public.user_xp ux
      where ux.user_id = v_user;
    return;
  end if;

  return query
  insert into public.user_xp as ux
    (user_id, xp, streak, last_session_date,
     total_sessions, total_minutes, first_session_at, last_session_at)
  values
    (v_user, v_gain, 1, v_day, 1, v_minutes, now(), now())
  on conflict (user_id) do update
    set xp = ux.xp + v_gain,
        streak = case
          when ux.last_session_date = v_day     then ux.streak
          when ux.last_session_date = v_day - 1 then ux.streak + 1
          else 1
        end,
        last_session_date = v_day,
        total_sessions    = ux.total_sessions + 1,
        total_minutes     = ux.total_minutes + v_minutes,
        first_session_at  = coalesce(ux.first_session_at, now()),
        last_session_at   = now(),
        updated_at        = now()
  returning ux.xp, ux.streak, v_gain, ux.total_sessions, ux.total_minutes, true;
end;
$$;

-- المنح بقى من السيرفر بس — الدالة القديمة `award_xp` كانت مفتوحة
-- للعميل، وأي حد يقدر يناديها بأي عدد دقايق من غير جلسة.
revoke all on function public.award_xp(integer) from authenticated;
grant execute on function public.award_xp(integer) to service_role;

-- مسموح للمستخدم الحالي يناديها (السيرفر بيستخدمه)، لكن الدالة نفسها
-- بتتحقق من ملكية الجلسة وبتدي XP مرة واحدة بس، فمفيش ضرر من النداء المباشر.
revoke all on function public.award_xp_for_session(uuid) from public, anon;
grant execute on function public.award_xp_for_session(uuid) to authenticated, service_role;

-- ============================================================
-- 3) فك حد المحاولات النهائي
-- ============================================================

-- نفس توقيع 0017 بالظبط، فـ create or replace كفاية.
create or replace function public.record_exam_result_for_user(
  p_user_id    uuid,
  p_session_id uuid,
  p_language   text,
  p_level      text,
  p_unit_index integer,
  p_correct    integer,
  p_total      integer,
  p_details    jsonb
)
returns table (outcome text, score_pct integer, attempts integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_owner    uuid;
  v_outcome  text;
  v_pct      integer;
  v_attempts integer;
begin
  if p_user_id is null then
    raise exception 'user id required' using errcode = '28000';
  end if;

  if p_language is null or p_language not in ('en', 'fr', 'es', 'de') then
    raise exception 'invalid language: %', p_language using errcode = '22023';
  end if;

  if p_level is null or p_level not in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2') then
    raise exception 'invalid level: %', p_level using errcode = '22023';
  end if;

  if p_total is null or p_total <= 0 or p_correct is null
     or p_correct < 0 or p_correct > p_total then
    raise exception 'invalid exam score' using errcode = '22023';
  end if;

  select s.user_id into v_owner
  from public.lesson_sessions s
  where s.id = p_session_id;

  if v_owner is null or v_owner <> p_user_id then
    raise exception 'session not found' using errcode = '22025';
  end if;

  -- محاولات سابقة على نفس الوحدة — للعرض بس، مفيش حد أقصى.
  select count(*) into v_attempts
  from public.lesson_exams e
  where e.user_id    = p_user_id
    and e.language   = p_language
    and e.level      = p_level
    and e.unit_index = coalesce(p_unit_index, 0);

  v_pct := round(p_correct * 100.0 / p_total);

  v_outcome := case
    when p_correct * 10 >= p_total * 7 then 'pass'
    when p_correct * 10 >= p_total * 5 then 'partial'
    else 'fail'
  end;

  insert into public.lesson_exams
    (user_id, session_id, language, level, unit_index, total, correct, outcome, details)
  values
    (p_user_id, p_session_id, p_language, p_level, coalesce(p_unit_index, 0),
     p_total, p_correct, v_outcome, coalesce(p_details, '[]'::jsonb))
  on conflict (session_id) do update
    set total      = excluded.total,
        correct    = excluded.correct,
        outcome    = excluded.outcome,
        details    = excluded.details,
        created_at = now();

  -- النجاح = ترقية الوحدة (مرة واحدة، وللمستوى الحالي بس).
  if v_outcome = 'pass' then
    insert into public.user_progress (user_id, language, level, unit_index)
    values (p_user_id, p_language, p_level, coalesce(p_unit_index, 0) + 1)
    on conflict (user_id, language, level) do update
      set unit_index = greatest(
            public.user_progress.unit_index,
            coalesce(p_unit_index, 0) + 1
          ),
          updated_at = now();
  end if;

  return query select v_outcome, v_pct, v_attempts + 1;
end;
$$;

revoke all on function public.record_exam_result_for_user(uuid, uuid, text, text, integer, integer, integer, jsonb)
  from public, anon, authenticated;
grant execute on function public.record_exam_result_for_user(uuid, uuid, text, text, integer, integer, integer, jsonb)
  to service_role;
