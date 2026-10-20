-- ملخّص الجلسة من خلف الطلب (after) — نسخة تخدم الـ service_role.
--
-- ليه:
--   توليد الملخّص (Gemini) بيتم جوه after() بعد ما الرد يتبعت، لكن
--   سياق الطلب بيكون اتقفل وقتها: cookies() ما بقتش متاحة، فعميل
--   Supabase المبني على الكوكيز بيفشل، وauth.uid() بترجع null. النتيجة
--   إن الملخّص بيتولّد بس ما بيتحفظش في lesson_summaries.
--
-- الحل:
--   نسخة من save_lesson_summary بتاخد p_user_id صريح بدل الاعتماد على
--   auth.uid()، وممنوحة لـ service_role بس. السيرفر بيبعت الـ user_id
--   اللي اتحقق منه أصلًا في بداية الطلب (auth.getUser).
--
-- التطبيق: الزق الملف ده في SQL Editor في لوحة Supabase.

create or replace function public.save_lesson_summary_for_user(
  p_user_id    uuid,
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
  v_owner uuid;
  v_index integer;
begin
  if p_user_id is null then
    raise exception 'user id required' using errcode = '28000';
  end if;

  -- نتأكد الجلسة بتاعة المستخدم نفسه (منع كتابة ملخّصات لجلسات غيرك).
  select s.user_id into v_owner
  from public.lesson_sessions s
  where s.id = p_session_id;

  if v_owner is null or v_owner <> p_user_id then
    raise exception 'session not found' using errcode = '22025';
  end if;

  insert into public.lesson_summaries
    (user_id, session_id, language, unit_index, words, phrases, grammar)
  values
    (p_user_id, p_session_id, p_language, coalesce(p_unit_index, 0),
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
    values (p_user_id, p_language, v_index)
    on conflict (user_id, language) do update
      set unit_index = excluded.unit_index,
          updated_at = now();
  end if;

  return query select true, v_index;
end;
$$;

-- سياق خطة الدرس — نسخة تخدم الـ service_role من غير auth.uid().
create or replace function public.get_lesson_plan_context_for_user(
  p_user_id  uuid,
  p_language text
)
returns table (
  onboarded      boolean,
  language       text,
  level          text,
  goal           text,
  interests      text[],
  daily_minutes  integer,
  unit_index     integer,
  recap_words    jsonb,
  persona_id     text
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if p_user_id is null then
    raise exception 'user id required' using errcode = '28000';
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
                      where ls.user_id = p_user_id and ls.language = p_language
                      order by ls.created_at desc limit 1)
                  ) WITH ORDINALITY AS t(word, ord)
            where ord <= 3),
          '[]'::jsonb
        )
      ),
      prefs.persona_id
    from (select p_user_id as uid) AS u
    left join public.user_preferences prefs on prefs.user_id = u.uid
    left join public.user_progress    prog on prog.user_id = u.uid and prog.language = p_language;
end;
$$;

-- ============================================================
-- الصلاحيات: service_role بس
-- ============================================================

revoke all on function public.save_lesson_summary_for_user(uuid, uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  from public, anon, authenticated;
revoke all on function public.get_lesson_plan_context_for_user(uuid, text)
  from public, anon, authenticated;

grant execute on function public.save_lesson_summary_for_user(uuid, uuid, text, integer, jsonb, jsonb, jsonb, boolean)
  to service_role;
grant execute on function public.get_lesson_plan_context_for_user(uuid, text)
  to service_role;
