-- الجرانتس الصريحة لجداول schema public.
--
-- Supabase أعلنت إنه من 30 أكتوبر 2026 مابقاش بيمنح صلاحيات Data API
-- تلقائيًا للجداول الجديدة في schema "public". أي جدول جديد (أو migration
-- بتعيد إنشاء الجداول: مشروع جديد، preview branch، "supabase db reset")
-- لازم ياخد GRANT صريح وإلا الـ REST/GraphQL يرجع "permission denied".
--
-- الجداول الحالية (0001–0006) اتعملت قبل التاريخ ده فجرانتسها موجودة،
-- لكن الملف ده بيخلي الوضع صريح وواضح + بيغطّي أي جدول يتعمل بعدين.
--
-- ملاحظة أمنية: الـ GRANT هنا مالهوش علاقة بالأمان الفعلي — RLS هي
-- اللي بتحدد مين يشوف إيه. الجرانتس بس بتسمح للدور يوصل للجدول أصلاً،
-- والسياسات (select own) هي اللي بتفلتر الصفوف. مفيش أي كتابة مباشرة:
-- كل الكتابة بتمر عبر دوال SECURITY DEFINER (شوف 0002/0005/0006).
--
-- بنستخدم نفس الجرانتس اللي Supabase كانت بتدّيها تلقائيًا
-- (select/insert/update/delete) عشان مانغيّرش سلوك النظام الحالي:
-- الجداول دي مقفولة بـ RLS أصلًا (select own فقط، مفيش سياسات كتابة)،
-- فالـ insert/update/delete الممنوحة نظريًا مش قابلة للتنفيذ.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) الجداول الحالية: نفس جرانتس Supabase الافتراضية
-- ============================================================

do $$
declare
  t text;
  -- كل جداول الدومين في schema public.
  tables text[] := array[
    'lesson_days',
    'lesson_sessions',
    'lesson_accounts',
    'user_preferences',
    'user_progress',
    'lesson_summaries'
  ];
begin
  foreach t in array tables loop
    if exists (
      select 1 from information_schema.tables
      where table_schema = 'public' and table_name = t
    ) then
      -- قراءة/كتابة نظرية للدورين (RLS بتفلتر فعليًا)، وكل حاجة للسيرفر.
      -- ده يطابق الجرانتس اللي اتعملت تلقائيًا للجداول دي قبل 30 أكتوبر.
      execute format(
        'grant select, insert, update, delete on public.%I to anon;', t
      );
      execute format(
        'grant select, insert, update, delete on public.%I to authenticated;', t
      );
      execute format(
        'grant select, insert, update, delete on public.%I to service_role;', t
      );
    end if;
  end loop;
end $$;

-- ============================================================
-- 2) أي جدول جديد في المستقبل (يمنع الفشل بعد 30 أكتوبر)
-- ============================================================
--
-- default privileges: أي CREATE TABLE بعد كده (بنفس الدور اللي عمل
-- migration) ياخد الجرانتس تلقائيًا. ده بيخلّي migrations الجاية آمنة
-- من غير ما نكرّر GRANT يدوي — ويطابق سلوك ما قبل 30 أكتوبر.

alter default privileges in schema public
  grant select, insert, update, delete on tables to anon;

alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;

alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;

-- ============================================================
-- 3) الدوال: تأكيد الجرانتس على الـ RPCs (نفس المتّبع في 0001–0006)
-- ============================================================

do $$
declare
  f record;
  sig text;
begin
  for f in
    select p.proname,
           pg_get_function_identity_arguments(p.oid) as args
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in (
        'current_lesson_day',
        'remaining_minutes',
        'start_lesson',
        'end_lesson',
        'void_lesson',
        'get_lesson_account',
        'save_user_preferences',
        'get_lesson_plan_context',
        'save_lesson_summary',
        'save_persona'
      )
  loop
    sig := format('public.%I(%s)', f.proname, f.args);
    execute format('revoke all on function %s from public;', sig);
    execute format('revoke all on function %s from anon;', sig);
    execute format('grant execute on function %s to authenticated;', sig);
    execute format('grant execute on function %s to service_role;', sig);
  end loop;
end $$;

-- grant_subscription مسموحة للسيرفر بس (service_role) — مش للمستخدم.
do $$
begin
  if exists (
    select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'grant_subscription'
  ) then
    execute 'revoke all on function public.grant_subscription(uuid, integer, integer) from public';
    execute 'revoke all on function public.grant_subscription(uuid, integer, integer) from anon';
    execute 'revoke all on function public.grant_subscription(uuid, integer, integer) from authenticated';
    execute 'grant execute on function public.grant_subscription(uuid, integer, integer) to service_role';
  end if;
end $$;
