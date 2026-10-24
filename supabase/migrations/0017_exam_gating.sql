-- ربط الترقية بنتيجة الاختبار + حد أقصى للمحاولات.
--
-- قبل كده: التقدّم كان بيتحسب بالوقت بس (≥60% من الجلسة).
-- بعد كده: لو الوحدة ليها بنك أسئلة، التقدّم بيحصل فقط لما الاختبار ينجح (pass).
-- الوحدات اللي لسه ملهاش بنك بتكمل بالوقت زي ما هي، عشان التقدّم ما يتوقفش.
--
-- الحد الأقصى: 3 محاولات لنفس الوحدة (نفس المستخدم/اللغة/المستوى/الوحدة).

-- نوع الإرجاع اتغيّر (زدنا attempts)، فالدالة لازم تتشال الأول.
drop function if exists public.record_exam_result_for_user(uuid, uuid, text, text, integer, integer, integer, jsonb);

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

  -- المحاولات السابقة على نفس الوحدة (قبل تسجيل المحاولة الحالية).
  select count(*) into v_attempts
  from public.lesson_exams e
  where e.user_id    = p_user_id
    and e.language   = p_language
    and e.level      = p_level
    and e.unit_index = coalesce(p_unit_index, 0);

  if v_attempts >= 3 then
    raise exception 'attempt limit reached' using errcode = '54000';
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
