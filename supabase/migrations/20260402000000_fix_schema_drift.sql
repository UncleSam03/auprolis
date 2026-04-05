-- Fix for schema drift and RLS recursion in Auprolis
-- This migration ensures columns exist and fixes the infinite recursion in profiles RLS

-- 1. Ensure properties has the correct columns (might have been missing due to CREATE TABLE IF NOT EXISTS failure)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='seller_id') THEN
        ALTER TABLE public.properties ADD COLUMN seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- 2. Fix the infinite recursion in profiles RLS policies
-- We simplify policies to avoid FOR ALL when possible, and ensure is_admin is robust.

-- Revise is_admin to avoid recursion by using auth.jwt() which is available in the session without querying the table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- We first try metadata from the JWT as it is faster and avoids RLS recursion
  IF (auth.jwt() -> 'user_metadata' ->> 'user_type') = 'admin' THEN
    RETURN TRUE;
  END IF;
  
  -- Fallback to DB check, but this is less likely to be needed
  -- Since this function is SECURITY DEFINER, it bypasses RLS on the table it queries
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND user_type = 'admin'
  );
END;
$$;

-- Drop and recreate policies to remove any "FOR ALL" that might still be causing issues
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;

-- Anyone can see profiles (required for auth loading and visibility)
CREATE POLICY "profiles_select_all"
  ON public.profiles FOR SELECT
  USING (true);

-- Admins can do anything to any profile
CREATE POLICY "profiles_admin_manage"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Re-verify RLS on properties while we are at it
ALTER TABLE IF EXISTS public.properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "properties_select_all" ON public.properties;
CREATE POLICY "properties_select_all"
  ON public.properties FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "properties_seller_all" ON public.properties;
CREATE POLICY "properties_seller_all"
  ON public.properties FOR ALL
  TO authenticated
  USING (auth.uid() = seller_id OR public.is_admin())
  WITH CHECK (auth.uid() = seller_id OR public.is_admin());
