-- =============================================
-- Wipe public schema (auth-only baseline)
-- Run in SQL Editor on a dev DB only.
-- =============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;
