-- إصلاح لبس تسمية الأعمدة في دوال الرصيد.
--
-- في 0002، أسماء OUT parameters بتاعة الدوال (trial_lessons_left /
-- paid_minutes_left) هي نفسها أسماء أعمدة جدول lesson_accounts. في
-- UPDATE ... SET col = col ± … المكان الأيمن اتقرأ كمتغير plpgsql مش كعمود،
-- فـ Postgres رمى "column reference is ambiguous".
--
-- الحل: نسمّي جدول الهدف (la) ونؤهّل المراجع في الطرف الأيمن.
-- منطق الحساب زي ما هو تمامًا — بس مرجع بدل متغيّر.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- start_lesson
-- ============================================================
create or replace function public.start_lesson(
  p_minutes       integer,
  p_trial_minutes integer,
  p_trial_lessons integer
)
returns table (
  ok                  boolean,
  session_id          uuid,
  source              text,
  trial_lessons_left  integer,
  paid_minutes_left   integer,
  paid_period_end     timestamptz,
  has_active_plan     boolean,
  message             text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user        uuid := auth.uid();
  v_paid        integer;
  v_trial       integer;
  v_period_end  timestamptz;
  v_has_plan    boolean;
  v_session     uuid;
  v_source      text;
  v_stale_id    uuid;
  v_stale_alloc integer;
  v_stale_src   text;
  v_stale_at    timestamptz;
  v_stale_sec   integer;
  v_stale_actual integer;
  v_reason      text;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  if p_minutes is null or p_minutes < 1 or p_minutes > 90 then
    raise exception 'invalid lesson duration: %', p_minutes using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user::text, 0));

  insert into public.lesson_accounts (user_id, trial_lessons_left)
  values (v_user, p_trial_lessons)
  on conflict (user_id) do nothing;

  select a.trial_lessons_left, a.paid_minutes_left, a.paid_period_end,
         (a.paid_period_end is not null and a.paid_period_end > now())
    into v_trial, v_paid, v_period_end, v_has_plan
  from public.lesson_accounts a
  where a.user_id = v_user
  for update;

  if not v_has_plan then
    v_paid := 0;
  end if;

  -- درس قديم لسه "نشِط" (تاب اتقفل قبل التسوية)؟ نقفله ونرجّع المصدر بتاعه.
  select s.id, s.allocated_minutes, s.source, s.started_at
    into v_stale_id, v_stale_alloc, v_stale_src, v_stale_at
  from public.lesson_sessions s
  where s.user_id = v_user and s.status = 'active'
  limit 1
  for update;

  if v_stale_id is not null then
    v_stale_sec := least(
      v_stale_alloc * 60,
      greatest(0, extract(epoch from (now() - v_stale_at))::int)
    );
    v_stale_actual := least(v_stale_alloc, greatest(1, ceil(v_stale_sec / 60.0)::int));

    update public.lesson_sessions
       set used_seconds = v_stale_sec,
           status       = 'abandoned',
           ended_at     = now()
     where id = v_stale_id;

    if v_stale_src = 'paid' then
      update public.lesson_accounts la
         set paid_minutes_left = greatest(0, la.paid_minutes_left - v_stale_alloc + v_stale_actual),
             updated_at        = now()
       where la.user_id = v_user;
      if v_has_plan then
        v_paid := v_paid - v_stale_alloc + v_stale_actual;
      end if;
    else
      null; -- الدرس التجريبي استُهلك عند البدء — مفيش استرداد جزئي.
    end if;
  end if;

  if v_has_plan and v_paid >= p_minutes then
    v_source := 'paid';
    update public.lesson_accounts la
       set paid_minutes_left = la.paid_minutes_left - p_minutes,
           updated_at        = now()
     where la.user_id = v_user;
    v_paid := v_paid - p_minutes;
  elsif not v_has_plan and v_trial > 0 and p_minutes = p_trial_minutes then
    v_source := 'trial';
    update public.lesson_accounts la
       set trial_lessons_left = la.trial_lessons_left - 1,
           updated_at         = now()
     where la.user_id = v_user;
    v_trial := v_trial - 1;
  else
    if v_has_plan then
      v_reason := 'insufficient_minutes';
    elsif v_trial = 0 then
      v_reason := 'no_credit';
    else
      v_reason := 'trial_requires_minutes';
    end if;

    return query
      select false, null::uuid, null::text, v_trial, v_paid, v_period_end, v_has_plan, v_reason;
    return;
  end if;

  insert into public.lesson_sessions (user_id, allocated_minutes, source)
  values (v_user, p_minutes, v_source)
  returning id into v_session;

  return query
    select true, v_session, v_source, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;

-- ============================================================
-- end_lesson
-- ============================================================
create or replace function public.end_lesson(
  p_session_id   uuid,
  p_used_seconds integer
)
returns table (
  ok                 boolean,
  charged_minutes    integer,
  trial_lessons_left integer,
  paid_minutes_left  integer,
  paid_period_end    timestamptz,
  has_active_plan    boolean,
  message            text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user      uuid := auth.uid();
  v_alloc     integer;
  v_source    text;
  v_status    text;
  v_seconds   integer := greatest(coalesce(p_used_seconds, 0), 0);
  v_actual    integer;
  v_trial     integer;
  v_paid      integer;
  v_period_end timestamptz;
  v_has_plan  boolean;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select s.allocated_minutes, s.source, s.status
    into v_alloc, v_source, v_status
  from public.lesson_sessions s
  where s.id = p_session_id and s.user_id = v_user
  for update;

  if not found then
    return query select false, 0, 0, 0, null::timestamptz, false, 'session_not_found'::text;
    return;
  end if;

  select a.trial_lessons_left, a.paid_minutes_left, a.paid_period_end,
         (a.paid_period_end is not null and a.paid_period_end > now())
    into v_trial, v_paid, v_period_end, v_has_plan
  from public.lesson_accounts a
  where a.user_id = v_user
  for update;

  if not found then
    return query select false, 0, 0, 0, null::timestamptz, false, 'account_not_found'::text;
    return;
  end if;

  if not v_has_plan then
    v_paid := 0;
  end if;

  if v_status <> 'active' then
    return query select true, 0, v_trial, v_paid, v_period_end, v_has_plan, 'already_ended'::text;
    return;
  end if;

  v_actual := least(v_alloc, greatest(1, ceil(v_seconds / 60.0)::int));

  update public.lesson_sessions
     set used_seconds = v_seconds,
         status       = 'ended',
         ended_at     = now()
   where id = p_session_id;

  if v_source = 'paid' then
    update public.lesson_accounts la
       set paid_minutes_left = greatest(0, la.paid_minutes_left - v_alloc + v_actual),
           updated_at        = now()
     where la.user_id = v_user;
    v_paid := v_paid - v_alloc + v_actual;
  end if;

  return query select true, v_actual, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;

-- ============================================================
-- void_lesson
-- ============================================================
create or replace function public.void_lesson(p_session_id uuid)
returns table (
  ok                 boolean,
  trial_lessons_left integer,
  paid_minutes_left  integer,
  paid_period_end    timestamptz,
  has_active_plan    boolean,
  message            text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user      uuid := auth.uid();
  v_alloc     integer;
  v_source    text;
  v_status    text;
  v_trial     integer;
  v_paid      integer;
  v_period_end timestamptz;
  v_has_plan  boolean;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select s.allocated_minutes, s.source, s.status
    into v_alloc, v_source, v_status
  from public.lesson_sessions s
  where s.id = p_session_id and s.user_id = v_user
  for update;

  if not found then
    return query select false, 0, 0, null::timestamptz, false, 'session_not_found'::text;
    return;
  end if;

  select a.trial_lessons_left, a.paid_minutes_left, a.paid_period_end,
         (a.paid_period_end is not null and a.paid_period_end > now())
    into v_trial, v_paid, v_period_end, v_has_plan
  from public.lesson_accounts a
  where a.user_id = v_user
  for update;

  if not v_has_plan then
    v_paid := 0;
  end if;

  if v_status <> 'active' then
    return query select true, v_trial, v_paid, v_period_end, v_has_plan, 'already_closed'::text;
    return;
  end if;

  update public.lesson_sessions
     set status   = 'abandoned',
         ended_at = now()
   where id = p_session_id;

  if v_source = 'paid' then
    update public.lesson_accounts la
       set paid_minutes_left = la.paid_minutes_left + v_alloc,
           updated_at        = now()
     where la.user_id = v_user;
    v_paid := v_paid + v_alloc;
  else
    update public.lesson_accounts la
       set trial_lessons_left = la.trial_lessons_left + 1,
           updated_at         = now()
     where la.user_id = v_user;
    v_trial := v_trial + 1;
  end if;

  return query select true, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;
