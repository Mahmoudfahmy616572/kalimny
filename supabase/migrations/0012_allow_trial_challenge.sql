create or replace function public.start_lesson(
  p_minutes       integer,
  p_trial_minutes integer,
  p_trial_lessons integer
)
returns table (
  ok                 boolean,
  session_id         uuid,
  source             text,
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
  v_trial     integer;
  v_paid      integer;
  v_period_end timestamptz;
  v_has_plan  boolean;
  v_source    text;
  v_session   uuid;
  v_reason    text;
  v_alloc     integer := greatest(coalesce(p_minutes, 0), 1);
  v_stale     record;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- نضمن وجود الحساب مع القيم الافتراضية.
  insert into public.lesson_accounts (user_id, trial_lessons_left, paid_minutes_left)
  values (v_user, coalesce(p_trial_lessons, 3), 0)
  on conflict (user_id) do nothing;

  select a.trial_lessons_left, a.paid_minutes_left, a.paid_period_end,
         (a.paid_period_end is not null and a.paid_period_end > now())
    into v_trial, v_paid, v_period_end, v_has_plan
  from public.lesson_accounts a
  where a.user_id = v_user
  for update;

  if v_period_end is not null and v_period_end <= now() then
    v_has_plan := false;
  end if;

  if not v_has_plan then
    v_paid := 0;
  end if;

  -- إقفال أي درس نشط متهالك (مثال: أغلق المتصفح قبل void) ونُعيد المحجوز.
  select s.id, s.allocated_minutes, s.source
    into v_stale
  from public.lesson_sessions s
  where s.user_id = v_user and s.status = 'active'
  order by s.started_at asc
  for update of s skip locked
  limit 1;

  if found then
    if v_stale.source = 'paid' and v_has_plan then
      update public.lesson_accounts la
         set paid_minutes_left = la.paid_minutes_left + v_stale.allocated_minutes,
             updated_at        = now()
       where la.user_id = v_user;
      v_paid := v_paid + v_stale.allocated_minutes;
    end if;
    -- الدرس التجريبي استُهلك عند البدء — مفيش استرداد جزئي.
    update public.lesson_sessions
       set status   = 'void',
           ended_at = now()
     where id = v_stale.id;
  end if;

  if v_has_plan and v_paid >= v_alloc then
    v_source := 'paid';
    update public.lesson_accounts la
       set paid_minutes_left = la.paid_minutes_left - v_alloc,
           updated_at        = now()
     where la.user_id = v_user;
    v_paid := v_paid - v_alloc;
  elsif not v_has_plan and v_trial > 0 and v_alloc <= coalesce(p_trial_minutes, 15) then
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
  values (v_user, v_alloc, v_source)
  returning id into v_session;

  return query
    select true, v_session, v_source, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;
