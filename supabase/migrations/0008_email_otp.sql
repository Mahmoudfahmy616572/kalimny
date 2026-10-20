-- رمز تحقق البريد (OTP) من 4 أرقام — بديلنا الخاص عن تأكيد الإيميل بتاع
-- Supabase، عشان نتجنّب rate limit الـ SMTP الافتراضي ونتحكم في طول الكود.
--
-- الفكرة:
--   * بعد التسجيل، الحساب بيتعمل في auth.users لكن الإيميل مش متأكد
--     (email_confirmed_at = null). المستخدم مش هيقدر يسجّل دخول غير لما
--     يأكّد بالكود.
--   * بنولّد كود 4 أرقام عشوائي، بنخزّن الـ hash بتاعه بس (SHA-256) مع
--     وقت انتهاء (10 دقايق) وعدّاد محاولات (5 كحد أقصى).
--   * السيرفر بيبعت الكود على الإيميل عبر Brevo SMTP.
--   * لما المستخدم يدخّله، بنقارن الـ hash، ولو صح بنأكّد الإيميل في
--     Supabase (email_confirm: true) ونعمل session.
--
-- ملاحظات أمنية (نفس نمط 0002/0005/0006):
--   * الجدول مالوش أي وصول مباشر من المتصفح — RLS مفعّلة بلا سياسات،
--     وكل الوصول من دوال SECURITY DEFINER بس.
--   * الدوال ممنوعة على anon/authenticated — بتتنادى من السيرفر
--     (service_role) بس، عشان محدش يقدر يعمل OTP لغيره أو يتحقق منه.
--   * الـ hash مش الكود نفسه، فاللي يشوف الجدول ميعرفش الكود.
--
-- التطبيق: supabase db push --db-url "..."

-- ============================================================
-- 1) الجدول
-- ============================================================

create table if not exists public.email_otps (
  email        text        primary key,
  user_id      uuid        not null,
  code_hash    text        not null,
  attempts     integer     not null default 0,
  expires_at   timestamptz not null,
  created_at   timestamptz not null default now(),
  constraint email_otps_attempts_nonnegative check (attempts >= 0)
);

-- RLS مفعّلة بلا أي سياسة: مفيش وصول مباشر من أي دور غير service_role
-- (اللي بيتخطّى RLS أصلاً). الصفوف بتتكتب/تتقرأ من الدوال تحت بس.
alter table public.email_otps enable row level security;

-- ============================================================
-- 2) إنشاء/تحديث كود OTP
-- ============================================================

-- بتحفظ الـ hash والانتهاء لإيميل معيّن (باستبدال أي كود قديم).
-- السيرفر بيولّد الكود العشوائي ويبعت الـ hash هنا، فالكود الخام
-- مابيخزّنش في قاعدة البيانات أبدًا.
create or replace function public.create_email_otp(
  p_email      text,
  p_user_id    uuid,
  p_code_hash  text,
  p_ttl_seconds integer default 600
)
returns timestamptz
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_expires timestamptz;
begin
  if p_email is null or char_length(trim(p_email)) < 3 then
    raise exception 'invalid email' using errcode = '22023';
  end if;
  if p_user_id is null then
    raise exception 'invalid user id' using errcode = '22023';
  end if;
  if p_code_hash is null or char_length(p_code_hash) <> 64 then
    raise exception 'invalid code hash' using errcode = '22023';
  end if;
  if p_ttl_seconds is null or p_ttl_seconds < 60 or p_ttl_seconds > 3600 then
    raise exception 'invalid ttl' using errcode = '22023';
  end if;

  v_expires := now() + make_interval(secs => p_ttl_seconds);

  insert into public.email_otps (email, user_id, code_hash, attempts, expires_at, created_at)
  values (lower(trim(p_email)), p_user_id, p_code_hash, 0, v_expires, now())
  on conflict (email) do update
    set user_id    = excluded.user_id,
        code_hash  = excluded.code_hash,
        attempts   = 0,
        expires_at = excluded.expires_at,
        created_at = now();

  return v_expires;
end;
$$;

-- ============================================================
-- 3) التحقق من الكود
-- ============================================================

-- بترجع (result, user_id): 'ok' | 'invalid' | 'expired' | 'too_many_attempts'
-- | 'not_found'. بتزوّد عدّاد المحاولات على أي كود غلط، وبتمسح الصف
-- عند النجاح (استخدام لمرة واحدة). الـ user_id بيرجع عشان السيرفر
-- يأكّد الإيميل من غير ما يدوّر على المستخدم.
create or replace function public.consume_email_otp(
  p_email     text,
  p_code_hash text
)
returns table (result text, user_id uuid)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_row public.email_otps%rowtype;
  v_max_attempts constant integer := 5;
begin
  if p_email is null or p_code_hash is null then
    return query select 'not_found'::text, null::uuid;
    return;
  end if;

  select * into v_row
  from public.email_otps
  where email = lower(trim(p_email));

  if not found then
    return query select 'not_found'::text, null::uuid;
    return;
  end if;

  if v_row.expires_at < now() then
    delete from public.email_otps where email = v_row.email;
    return query select 'expired'::text, null::uuid;
    return;
  end if;

  if v_row.attempts >= v_max_attempts then
    delete from public.email_otps where email = v_row.email;
    return query select 'too_many_attempts'::text, null::uuid;
    return;
  end if;

  if v_row.code_hash = p_code_hash then
    delete from public.email_otps where email = v_row.email;
    return query select 'ok'::text, v_row.user_id;
    return;
  end if;

  update public.email_otps
  set attempts = attempts + 1
  where email = v_row.email;

  return query select 'invalid'::text, null::uuid;
end;
$$;

-- ============================================================
-- 4) الصلاحيات: السيرفر (service_role) بس
-- ============================================================

revoke all on table public.email_otps from public, anon, authenticated;
grant select, insert, update, delete on table public.email_otps to service_role;

revoke all on function public.create_email_otp(text, uuid, text, integer) from public, anon, authenticated;
grant execute on function public.create_email_otp(text, uuid, text, integer) to service_role;

revoke all on function public.consume_email_otp(text, text) from public, anon, authenticated;
grant execute on function public.consume_email_otp(text, text) to service_role;
