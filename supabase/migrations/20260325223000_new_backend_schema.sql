-- =============================================
-- Auprolis.com New Backend Schema (DIAGNOSTIC)
-- DROPPING TRIGGER COMPLETELY TO TEST CORE SIGNUP
-- =============================================

-- Clean up trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Ensure tables exist but have no constraints for now
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT
);

-- DISABLE RLS
ALTER TABLE IF EXISTS public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.properties DISABLE ROW LEVEL SECURITY;
