-- اختبار بعد كل جلسة: نتيجة الاختبار بتتسجّل هنا، والحالة بتتحسب على السيرفر.
--
-- الحالات (من 10 أسئلة):
--   * pass    : 7 أو أكتر  (70%+)  → الوحدة بتتقفل وتتفتح اللي بعدها
--   * partial : 5 أو 6            → مراجعة النقط الضعيفة واختبار أقصر
--   * fail    : أقل من 5          → إعادة الوحدة
--
-- الترقية نفسها (p_advance) هتتربط بنتيجة pass في خطوة لاحقة، بعد ما الاختبار يتبني.

create table if not exists public.lesson_exams (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references auth.users (id) on delete cascade,
  session_id  uuid        not null unique references public.lesson_sessions (id) on delete cascade,
  language    text        not null check (language in ('en', 'fr', 'es', 'de')),
  level       text        not null check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  unit_index  integer     not null default 0 check (unit_index >= 0),
  total       integer     not null check (total > 0),
  correct     integer     not null check (correct >= 0 and correct <= total),
  outcome     text        not null check (outcome in ('pass', 'partial', 'fail')),
  details     jsonb       not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists lesson_exams_user_language_idx
  on public.lesson_exams (user_id, language, level, unit_index);

alter table public.lesson_exams enable row level security;

drop policy if exists lesson_exams_select_own on public.lesson_exams;
create policy lesson_exams_select_own on public.lesson_exams
  for select to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- دالة تسجيل النتيجة (service_role): بتحسب الحالة وتحفظها مرة واحدة للجلسة
-- ============================================================

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
returns table (outcome text, score_pct integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_owner   uuid;
  v_outcome text;
  v_pct     integer;
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

  return query select v_outcome, v_pct;
end;
$$;

revoke all on function public.record_exam_result_for_user(uuid, uuid, text, text, integer, integer, integer, jsonb)
  from public, anon, authenticated;
grant execute on function public.record_exam_result_for_user(uuid, uuid, text, text, integer, integer, integer, jsonb)
  to service_role;
