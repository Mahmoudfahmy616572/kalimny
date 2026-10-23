-- XP + الستريك + الليدر بورد.
--
-- كان الكود بيقرا ويكتب في `public.user_xp` من غير ما الجدول يكون موجود
-- في أي migration، فكل نداء كان بيرجع PGRST202 والليدر بورد فاضي.
--
-- التصميم:
--   * القراءة الشخصية بس (RLS select own) — مفيش كتابة مباشرة من العميل.
--   * الكتابة كلها من `award_xp` وهي SECURITY DEFINER وبتجيب المستخدم من
--     auth.uid() جواها، فمستحيل حد يزوّد XP لحساب غيره أو يبعت رقم من عنده.
--   * الستريك بيتحسب على "اليوم التعليمي" بتاع القاهرة (نفس منطق الدروس)،
--     وجلسات نفس اليوم ماتزوّدش الستريك أكتر من مرة.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) الجدول
-- ============================================================

create table if not exists public.user_xp (
  user_id           uuid        primary key references auth.users (id) on delete cascade,
  xp                integer     not null default 0,
  streak            integer     not null default 0,
  last_session_date date,
  total_sessions    integer     not null default 0,
  total_minutes     integer     not null default 0,
  first_session_at  timestamptz,
  last_session_at   timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint user_xp_nonnegative check (
    xp >= 0 and streak >= 0 and total_sessions >= 0 and total_minutes >= 0
  )
);

create index if not exists user_xp_rank_idx
  on public.user_xp (xp desc, streak desc);

-- ============================================================
-- 2) RLS: قراءة شخصية بس
-- ============================================================

alter table public.user_xp enable row level security;

drop policy if exists user_xp_select_own on public.user_xp;
create policy user_xp_select_own on public.user_xp
  for select to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- 3) منح XP بعد جلسة
-- ============================================================

-- p_minutes = دقايق الجلسة الفعلية. بنحسب XP = دقيقتين لكل دقيقة بحد أدنى
-- 10 نقاط (عشان جلسة 5 دقايق تبقى مجزية). أي رقم خارج 1–180 بيتقصّ.
create or replace function public.award_xp(p_minutes integer)
returns table (
  xp             integer,
  streak         integer,
  gained         integer,
  total_sessions integer,
  total_minutes  integer
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user    uuid := auth.uid();
  v_minutes integer := greatest(1, least(coalesce(p_minutes, 1), 180));
  v_day     date := public.current_lesson_day();
  v_gain    integer := greatest(10, greatest(1, least(coalesce(p_minutes, 1), 180)) * 2);
begin
  if v_user is null then
    raise exception 'not authenticated' using errcode = '28000';
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
  returning ux.xp, ux.streak, v_gain, ux.total_sessions, ux.total_minutes;
end;
$$;

-- ============================================================
-- 4) الليدر بورد (من غير كشف الإيميل)
-- ============================================================

-- بترجع أعلى N لاعبين + اسم عرض آمن. مكتوبة SECURITY DEFINER عشان تقدر
-- تقرا صفوف كل المستخدمين رغم إن RLS بتسمح لكل واحد بصفه بس.
-- الاسم من الـmetadata، وإلا أول جزء من الإيميل — مفيش إيميل كامل بيرجع.
create or replace function public.get_leaderboard(p_limit integer default 10)
returns table (
  user_id        uuid,
  display_name   text,
  xp             integer,
  streak         integer,
  total_sessions integer,
  total_minutes  integer,
  rank           integer
)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  with ranked as (
    select
      x.user_id,
      x.xp,
      x.streak,
      x.total_sessions,
      x.total_minutes,
      row_number() over (
        order by x.xp desc, x.streak desc, x.user_id
      ) as rn
    from public.user_xp x
  )
  select
    r.user_id,
    coalesce(
      nullif(trim(u.raw_user_meta_data ->> 'full_name'), ''),
      nullif(trim(u.raw_user_meta_data ->> 'name'), ''),
      nullif(split_part(u.email, '@', 1), ''),
      'مستخدم'
    ),
    r.xp,
    r.streak,
    r.total_sessions,
    r.total_minutes,
    r.rn::int
  from ranked r
  join auth.users u on u.id = r.user_id
  where r.rn <= greatest(1, least(coalesce(p_limit, 10), 100))
  order by r.rn;
$$;

-- ترتيب المستخدم الحالي حتى لو بره أعلى N.
create or replace function public.get_my_rank()
returns table (rank integer, xp integer)
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  with me as (
    select auth.uid() as uid
  ),
  ranked as (
    select
      x.user_id,
      x.xp,
      row_number() over (
        order by x.xp desc, x.streak desc, x.user_id
      ) as rn
    from public.user_xp x
  )
  select r.rn::int, r.xp
  from ranked r
  join me on me.uid = r.user_id;
$$;

-- ============================================================
-- 5) الصلاحيات
-- ============================================================

grant select on public.user_xp to authenticated;
grant select, insert, update, delete on public.user_xp to service_role;

revoke all on function public.award_xp(integer) from public, anon;
grant execute on function public.award_xp(integer) to authenticated;
grant execute on function public.award_xp(integer) to service_role;

revoke all on function public.get_leaderboard(integer) from public, anon;
grant execute on function public.get_leaderboard(integer) to authenticated;
grant execute on function public.get_leaderboard(integer) to service_role;

revoke all on function public.get_my_rank() from public, anon;
grant execute on function public.get_my_rank() to authenticated;
grant execute on function public.get_my_rank() to service_role;
