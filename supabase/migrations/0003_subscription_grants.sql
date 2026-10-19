-- منح تنفيذ دالة تفعيل الاشتراك لدور الخدمة (service_role).
--
-- دالة grant_subscription ممنوعة تمامًا على المستخدم العادي (شوف 0002)،
-- بس السيرفر لازم يقدر ينادّيها — الدفع (Paymob) هيستخدم الـ service_role،
-- وكمان إحنا بنستخدمها يدوي في مرحلة ما قبل الدفع.
grant execute on function public.grant_subscription(uuid, integer, integer)
  to service_role;
