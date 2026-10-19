-- حدود الاستخدام اليومي للدروس.
--
-- الطبقة الأساسية = الدقايق. "عدد الدروس في اليوم" نتيجة مش رقم مستقل:
--   عدد الدروس = ميزانية اليوم ÷ مدة الدرس.
-- عشان كده الميزانية بتتخزّن بالدقايق، والعرض للطالب بالدروس.
--
-- ملاحظات أمنية:
--   * المستخدم يقدر يقرا صفوفه بس (RLS)، وممنوع يكتب مباشرة.
--   * كل الكتابة بتمشي من الدوال تحت، ودي SECURITY DEFINER.
--   * الدوال بتجيب المستخدم من auth.uid() جواها — مش من باراميتر — فتأمينها
--     مقفول ومستحيل مستخدم يحسب على حساب حد تاني أو يلعب في أرقامه.
--
-- التطبيق: الزق الملف ده في SQL Editor في لوحة Supabase.

-- ============================================================
-- 1) اليوم التعليمي (الساعة اللي بيتصفّر فيها العدّاد)
-- ============================================================

-- القاهرة، واليوم بيتقفل 4 الفجر بالتوقيت المحلي.
-- يعني درس الساعة 2:30 فجرًا بيتحسب على يوم أمس — عشان "اليوم" يبان
-- يوم عادة واحد للطالب مش نصين حوالين نص الليل.
create or replace function public.current_lesson_day()
returns date
language sql
stable
set search_path = public, pg_temp
as $$
  select ((now() at time zone 'Africa/Cairo') - interval '4 hours')::date;
$$;

-- ============================================================
-- 2) الجداول
-- ============================================================

-- صف واحد لكل مستخدم لكل يوم تعليمي.
create table if not exists public.lesson_days (
  user_id         uuid        not null references auth.users (id) on delete cascade,
  lesson_day      date        not null,
  minutes_granted integer     not null,
  minutes_used    integer     not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  primary key (user_id, lesson_day),
  constraint lesson_days_granted_nonnegative check (minutes_granted >= 0),
  constraint lesson_days_used_nonnegative    check (minutes_used >= 0)
);

-- صف واحد لكل درس مفتوح.
create table if not exists public.lesson_sessions (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references auth.users (id) on delete cascade,
  lesson_day        date        not null,
  allocated_minutes integer     not null,
  used_seconds      integer     not null default 0,
  status            text        not null default 'active'
                                check (status in ('active', 'ended', 'abandoned')),
  started_at        timestamptz not null default now(),
  ended_at          timestamptz,
  constraint lesson_sessions_allocated_positive check (allocated_minutes > 0),
  constraint lesson_sessions_used_nonnegative   check (used_seconds >= 0)
);

create index if not exists lesson_sessions_user_started_idx
  on public.lesson_sessions (user_id, started_at desc);

-- درس واحد نشِط لكل مستخدم في المرة — يمنع فتح تابين واستهلاك مضاعف.
create unique index if not exists lesson_sessions_one_active_idx
  on public.lesson_sessions (user_id)
  where status = 'active';

-- ============================================================
-- 3) RLS: قراءة الصفوف الشخصية بس، ممنوع أي كتابة مباشرة
-- ============================================================

alter table public.lesson_days     enable row level security;
alter table public.lesson_sessions enable row level security;

drop policy if exists lesson_days_select_own on public.lesson_days;
create policy lesson_days_select_own on public.lesson_days
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists lesson_sessions_select_own on public.lesson_sessions;
create policy lesson_sessions_select_own on public.lesson_sessions
  for select to authenticated
  using (user_id = auth.uid());

-- رصيد الدقايق المتبقي النهاردة. لو مفيش صف لسه (أول درس)، بنرجّع الميزانية كاملة.
-- معرّفة هنا بعد الجداول عشان دالة LANGUAGE sql بتفحص مراجع الجداول وقت الإنشاء.
create or replace function public.remaining_minutes(p_default_grant integer)
returns integer
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (
      select minutes_granted - minutes_used
      from public.lesson_days
      where user_id = auth.uid()
        and lesson_day = public.current_lesson_day()
    ),
    p_default_grant
  );
$$;

-- ============================================================
-- 4) فتح درس (ذرّي: يحمي من فتح تابين في نفس اللحظة)
-- ============================================================

create or replace function public.start_lesson(
  p_minutes       integer,
  p_default_grant integer
)
returns table (
  ok                boolean,
  session_id        uuid,
  remaining_minutes integer,
  message           text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user      uuid := auth.uid();
  v_day       date := public.current_lesson_day();
  v_granted   integer;
  v_used      integer;
  v_session   uuid;
  v_stale_id  uuid;
  v_stale_alloc integer;
  v_stale_day date;
  v_stale_at  timestamptz;
  v_stale_sec integer;
  v_stale_actual integer;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  if p_minutes is null or p_minutes < 1 or p_minutes > 90 then
    raise exception 'invalid lesson duration: %', p_minutes using errcode = '22023';
  end if;

  -- قفل المستخدم على مستوى المعاملة: يمنع طلبين متوازيين (تابين، أو إعادة
  -- محاولة) من إنشاء درسين نشطين في نفس الوقت. من غيره الطلبين ممكن ما
  -- يشوفوش بعض ويصطدموا بالفهرس الفريد. بيتفك لوحده آخر المعاملة.
  perform pg_advisory_xact_lock(hashtextextended(v_user::text, 0));

  -- درس قديم لسه "نشِط" (تاب اتقفل قبل التسوية)؟ نقفله الأول.
  -- الفهرس الفريد يسمح بدرس نشِط واحد بس، فلو سيبنا هيمنع الفتح الجديد.
  -- النسوية بالوقت المنقضي فعليًا: استنى أطول = اتحسب أكتر، فمفيش استغلال.
  select id, allocated_minutes, lesson_day, started_at
    into v_stale_id, v_stale_alloc, v_stale_day, v_stale_at
  from public.lesson_sessions
  where user_id = v_user and status = 'active'
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

    update public.lesson_days
       set minutes_used = minutes_used - v_stale_alloc + v_stale_actual,
           updated_at   = now()
     where user_id = v_user and lesson_day = v_stale_day;
  end if;

  -- ننشئ صف اليوم لو مش موجود (أول درس في اليوم).
  insert into public.lesson_days (user_id, lesson_day, minutes_granted)
  values (v_user, v_day, p_default_grant)
  on conflict (user_id, lesson_day) do nothing;

  -- قفل الصف: أي محاولة متوازية تستنى لحد ما نخلص.
  select minutes_granted, minutes_used
    into v_granted, v_used
  from public.lesson_days
  where user_id = v_user and lesson_day = v_day
  for update;

  if v_granted - v_used < p_minutes then
    return query
      select false, null::uuid, v_granted - v_used, 'insufficient_minutes'::text;
    return;
  end if;

  update public.lesson_days
     set minutes_used = minutes_used + p_minutes,
         updated_at    = now()
   where user_id = v_user and lesson_day = v_day;

  insert into public.lesson_sessions (user_id, lesson_day, allocated_minutes)
  values (v_user, v_day, p_minutes)
  returning id into v_session;

  return query
    select true, v_session, v_granted - v_used - p_minutes, 'ok'::text;
end;
$$;

-- ============================================================
-- 5) تقفيل درس (تسوية بالدقايق الفعلية + آمنة لو اتندهت مرتين)
-- ============================================================

create or replace function public.end_lesson(
  p_session_id   uuid,
  p_used_seconds integer
)
returns table (
  ok                boolean,
  charged_minutes   integer,
  remaining_minutes integer,
  message           text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user      uuid := auth.uid();
  v_allocated integer;
  v_day       date;
  v_status    text;
  v_seconds   integer := greatest(coalesce(p_used_seconds, 0), 0);
  v_actual    integer;
  v_remaining integer;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select allocated_minutes, lesson_day, status
    into v_allocated, v_day, v_status
  from public.lesson_sessions
  where id = p_session_id and user_id = v_user
  for update;

  if not found then
    return query select false, 0, 0, 'session_not_found'::text;
    return;
  end if;

  -- لو اتقفلت قبل كده، مفيش خصم تاني (التسوية بتتنده من أكتر من مكان).
  if v_status <> 'active' then
    select minutes_granted - minutes_used
      into v_remaining
    from public.lesson_days
    where user_id = v_user and lesson_day = v_day;
    return query select true, 0, coalesce(v_remaining, 0), 'already_ended'::text;
    return;
  end if;

  -- بنحسب الدقايق الفعلية: تقريب لأعلى وحد أدنى دقيقة، وما تتجاوزش المحجوز.
  v_actual := least(v_allocated, greatest(1, ceil(v_seconds / 60.0)::int));

  update public.lesson_sessions
     set used_seconds = v_seconds,
         status       = 'ended',
         ended_at     = now()
   where id = p_session_id;

  -- نرجّع الفرق: نشيل المحجوز ونضيف المستخدم فعليًا.
  update public.lesson_days
     set minutes_used = minutes_used - v_allocated + v_actual,
         updated_at   = now()
   where user_id = v_user and lesson_day = v_day;

  select minutes_granted - minutes_used
    into v_remaining
  from public.lesson_days
  where user_id = v_user and lesson_day = v_day;

  return query select true, v_actual, v_remaining, 'ok'::text;
end;
$$;

-- ============================================================
-- 6) إلغاء درس ما اشتغلش خالص (بيرجّع الميزانية كاملة)
-- ============================================================

-- بنستخدمها لو حجزنا ميزانية وبعدين فشل إصدار التوكن — الدرس ما اشتغلش
-- أصلًا فمينفعش يتحسب عليه، ولا حتى الدقيقة الدنيا بتاعة end_lesson.
create or replace function public.void_lesson(p_session_id uuid)
returns table (
  ok                boolean,
  remaining_minutes integer,
  message           text
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user      uuid := auth.uid();
  v_allocated integer;
  v_day       date;
  v_status    text;
  v_remaining integer;
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  select allocated_minutes, lesson_day, status
    into v_allocated, v_day, v_status
  from public.lesson_sessions
  where id = p_session_id and user_id = v_user
  for update;

  if not found then
    return query select false, 0, 'session_not_found'::text;
    return;
  end if;

  if v_status <> 'active' then
    select minutes_granted - minutes_used
      into v_remaining
    from public.lesson_days
    where user_id = v_user and lesson_day = v_day;
    return query select true, coalesce(v_remaining, 0), 'already_closed'::text;
    return;
  end if;

  update public.lesson_sessions
     set status   = 'abandoned',
         ended_at = now()
   where id = p_session_id;

  update public.lesson_days
     set minutes_used = minutes_used - v_allocated,
         updated_at   = now()
   where user_id = v_user and lesson_day = v_day;

  select minutes_granted - minutes_used
    into v_remaining
  from public.lesson_days
  where user_id = v_user and lesson_day = v_day;

  return query select true, v_remaining, 'ok'::text;
end;
$$;

-- ============================================================
-- 7) الصلاحيات
-- ============================================================

revoke all on function public.start_lesson(integer, integer) from public, anon;
revoke all on function public.end_lesson(uuid, integer)      from public, anon;
revoke all on function public.remaining_minutes(integer)     from public, anon;
revoke all on function public.void_lesson(uuid)              from public, anon;

grant execute on function public.current_lesson_day()          to authenticated;
grant execute on function public.start_lesson(integer, integer) to authenticated;
grant execute on function public.end_lesson(uuid, integer)      to authenticated;
grant execute on function public.remaining_minutes(integer)     to authenticated;
grant execute on function public.void_lesson(uuid)              to authenticated;
