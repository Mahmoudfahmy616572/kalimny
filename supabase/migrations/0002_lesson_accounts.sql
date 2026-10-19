-- محفظة الدروس: تجربة مجانية بالدروس + اشتراك شهري بالدقايق.
--
-- بديل نموذج "الميزانية اليومية" القديم (0001). الفرق:
--   * مابقاش فيه تصفير يومي — الرصيد عايش لحد ما يتصرف أو الشهر يخلص.
--   * مصدرين للرصيد: دروس تجريبية (مرة واحدة) ودقايق اشتراك (بتتجدد شهريًا).
--   * كل درس بيتسجّل بمصدره (trial/paid) عشان التسوية والاسترداد يروحوا للمصدر الصح.
--
-- ملاحظات أمنية (زي 0001):
--   * المستخدم يقرا صفوفه بس (RLS)، وممنوع يكتب مباشرة.
--   * كل الكتابة من الدوال تحت، ودي SECURITY DEFINER.
--   * الدوال بتجيب المستخدم من auth.uid() جواها — مش من باراميتر.
--   * grant_subscription ممنوعة على authenticated — بتتفعّل بس من لوحة
--     التحكم/SQL Editor (مرحلة الدفع اليدوي لحد ما Paymob ييجي).
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) تنضيف نموذج اليوميات القديم
-- ============================================================

-- الدوال القديمة بتعتمد على جدول lesson_days وعمود lesson_day، فلازم
-- تتشال الأول قبل ما نغيّر الأعمدة (الدوال SQL بتتربط بأعمدتها وقت الإنشاء).
drop function if exists public.start_lesson(integer, integer);
drop function if exists public.end_lesson(uuid, integer);
drop function if exists public.void_lesson(uuid);
drop function if exists public.remaining_minutes(integer);
drop function if exists public.current_lesson_day();

-- جدول الأيام القديم مابقاش له لزمة (الاشتراك شهري والتجربة بالدروس).
drop table if exists public.lesson_days cascade;

-- ============================================================
-- 2) الجداول
-- ============================================================

-- صف واحد لكل مستخدم: رصيده الحالي.
-- ملاحظة: القيمة الافتراضية 3 لازم تطابق TRIAL_LESSONS في الـ shared.
create table if not exists public.lesson_accounts (
  user_id            uuid        primary key references auth.users (id) on delete cascade,
  trial_lessons_left integer     not null default 3,
  paid_minutes_left  integer     not null default 0,
  paid_period_end    timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint lesson_accounts_trial_nonnegative check (trial_lessons_left >= 0),
  constraint lesson_accounts_paid_nonnegative  check (paid_minutes_left >= 0)
);

-- مصدر الدرس: تجريبي ولا مدفوع. بيحدّد فين يترجّع المحجوز عند التسوية/الإلغاء.
alter table public.lesson_sessions
  add column if not exists source text not null default 'paid'
  check (source in ('trial', 'paid'));

-- اليوم التعليمي مابقاش له معنى (مفيش تصفير يومي).
alter table public.lesson_sessions drop column if exists lesson_day;

-- ============================================================
-- 3) RLS: قراءة الصفوف الشخصية بس، ممنوع أي كتابة مباشرة
-- ============================================================

alter table public.lesson_accounts enable row level security;

drop policy if exists lesson_accounts_select_own on public.lesson_accounts;
create policy lesson_accounts_select_own on public.lesson_accounts
  for select to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- 4) تهيئة الحسابات الموجودة (أي مستخدم مسجّل ياخد تجربة كاملة)
-- ============================================================

insert into public.lesson_accounts (user_id)
select id from auth.users
on conflict (user_id) do nothing;

-- ============================================================
-- 5) قراءة الحساب (وبتنشئ الصف لو مش موجود — أول استخدام)
-- ============================================================

-- الدالة volatile لأنها بتكتب (بتنشئ الصف). بتقفل الاشتراك المنتهي تلقائيًا:
-- الدقايق بتبان صفر لما paid_period_end يعدّي الوقت الحالي.
create or replace function public.get_lesson_account(p_trial_lessons integer)
returns table (
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
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  insert into public.lesson_accounts (user_id, trial_lessons_left)
  values (v_user, p_trial_lessons)
  on conflict (user_id) do nothing;

  return query
    select
      a.trial_lessons_left,
      case
        when a.paid_period_end is not null and a.paid_period_end > now()
          then a.paid_minutes_left
        else 0
      end,
      a.paid_period_end,
      (a.paid_period_end is not null and a.paid_period_end > now())
    from public.lesson_accounts a
    where a.user_id = v_user;
end;
$$;

-- ============================================================
-- 6) فتح درس (ذرّي: يحمي من فتح تابين في نفس اللحظة)
-- ============================================================

-- اختيار المصدر:
--   * لو في اشتراك نشط وفيه دقايق كفاية  → مدفوع.
--   * وإلا لو في دروس تجريبية والمدة = مدة التجربة → تجريبي.
--   * وإلا نرفض بسبب واضح (no_credit / insufficient_minutes /
--     trial_requires_minutes) عشان الواجهة تعرض الإجراء الصح.
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

  -- قفل المستخدم على مستوى المعاملة: يمنع طلبين متوازيين (تابين، أو إعادة
  -- محاولة) من إنشاء درسين نشطين في نفس الوقت.
  perform pg_advisory_xact_lock(hashtextextended(v_user::text, 0));

  -- ننشئ الحساب لو أول استخدام.
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
      update public.lesson_accounts
         set paid_minutes_left = greatest(0, paid_minutes_left - v_stale_alloc + v_stale_actual),
             updated_at        = now()
       where user_id = v_user;
      if v_has_plan then
        v_paid := v_paid - v_stale_alloc + v_stale_actual;
      end if;
    else
      -- الدرس التجريبي استُهلك عند البدء — مفيش استرداد جزئي.
      null;
    end if;
  end if;

  if v_has_plan and v_paid >= p_minutes then
    v_source := 'paid';
    update public.lesson_accounts
       set paid_minutes_left = paid_minutes_left - p_minutes,
           updated_at        = now()
     where user_id = v_user;
    v_paid := v_paid - p_minutes;
  elsif not v_has_plan and v_trial > 0 and p_minutes = p_trial_minutes then
    v_source := 'trial';
    update public.lesson_accounts
       set trial_lessons_left = trial_lessons_left - 1,
           updated_at         = now()
     where user_id = v_user;
    v_trial := v_trial - 1;
  else
    -- مفيش رصيد يكفي — نرجّع سبب واضح للواجهة.
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
-- 7) تقفيل درس (تسوية بالدقايق الفعلية + آمنة لو اتندهت مرتين)
-- ============================================================

-- المدفوع: بيتسوّى بالدقايق الفعلية (المحجوز ناقص المستخدم).
-- التجريبي: اتستهلك بالكامل عند البدء — مفيش استرداد جزئي.
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

  -- لو اتقفلت قبل كده، مفيش خصم تاني (التسوية بتتنده من أكتر من مكان).
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
    update public.lesson_accounts
       set paid_minutes_left = greatest(0, paid_minutes_left - v_alloc + v_actual),
           updated_at        = now()
     where user_id = v_user;
    v_paid := v_paid - v_alloc + v_actual;
  end if;

  return query select true, v_actual, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;

-- ============================================================
-- 8) إلغاء درس ما اشتغلش خالص (بيرجّع المحجوز للمصدر بتاعه)
-- ============================================================

-- بنستخدمها لو حجزنا رصيد وبعدين فشل إصدار التوكن — الدرس ما اشتغلش
-- أصلًا فمينفعش يتحسب عليه، ولا حتى الدقيقة الدنيا بتاعة end_lesson.
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
    update public.lesson_accounts
       set paid_minutes_left = paid_minutes_left + v_alloc,
           updated_at        = now()
     where user_id = v_user;
    v_paid := v_paid + v_alloc;
  else
    update public.lesson_accounts
       set trial_lessons_left = trial_lessons_left + 1,
           updated_at         = now()
     where user_id = v_user;
    v_trial := v_trial + 1;
  end if;

  return query select true, v_trial, v_paid, v_period_end, v_has_plan, 'ok'::text;
end;
$$;

-- ============================================================
-- 9) تفعيل/تجديد اشتراك — يدوي في مرحلة ما قبل الدفع
-- ============================================================

-- بتتفعّل بس من SQL Editor / service_role. ممنوعة على المستخدم العادي
-- عشان ما يقدرش يمنح نفسه رصيد. بتضيف مدة جديدة فوق أي مدة متبقية.
create or replace function public.grant_subscription(
  p_user_id uuid,
  p_minutes integer,
  p_days    integer
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_minutes is null or p_minutes < 0 then
    raise exception 'invalid minutes: %', p_minutes using errcode = '22023';
  end if;
  if p_days is null or p_days < 1 then
    raise exception 'invalid days: %', p_days using errcode = '22023';
  end if;

  insert into public.lesson_accounts (user_id, trial_lessons_left)
  values (p_user_id, 0)
  on conflict (user_id) do nothing;

  update public.lesson_accounts
     set paid_minutes_left = p_minutes,
         paid_period_end   = greatest(coalesce(paid_period_end, now()), now())
                             + make_interval(days => p_days),
         updated_at        = now()
   where user_id = p_user_id;
end;
$$;

-- ============================================================
-- 10) الصلاحيات
-- ============================================================

revoke all on function public.get_lesson_account(integer)              from public, anon;
revoke all on function public.start_lesson(integer, integer, integer)  from public, anon;
revoke all on function public.end_lesson(uuid, integer)                from public, anon;
revoke all on function public.void_lesson(uuid)                        from public, anon;
-- منح الاشتراكات ممنوع تمامًا على المستخدمين — بس من لوحة التحكم.
revoke all on function public.grant_subscription(uuid, integer, integer)
  from public, anon, authenticated;

grant execute on function public.get_lesson_account(integer)             to authenticated;
grant execute on function public.start_lesson(integer, integer, integer) to authenticated;
grant execute on function public.end_lesson(uuid, integer)               to authenticated;
grant execute on function public.void_lesson(uuid)                       to authenticated;
