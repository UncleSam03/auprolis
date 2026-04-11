-- Drop the old policy that causes infinite recursion
DROP POLICY IF EXISTS "Allow owners and admins to delete" ON public.properties;

-- Recreate using the non-recursive public.is_admin() helper
CREATE POLICY "Allow owners and admins to delete"
ON public.properties FOR DELETE
USING (auth.uid() = seller_id OR public.is_admin());

-- Also fix other policies on properties that use the recursive SELECT to be fully safe
DROP POLICY IF EXISTS "Allow owners and admins to update" ON public.properties;
CREATE POLICY "Allow owners and admins to update"
ON public.properties FOR UPDATE
USING (auth.uid() = seller_id OR public.is_admin())
WITH CHECK (auth.uid() = seller_id OR public.is_admin());

DROP POLICY IF EXISTS "View approved listings" ON public.properties;
CREATE POLICY "View approved listings"
ON public.properties FOR SELECT
USING (status = 'approved' OR auth.uid() = seller_id OR public.is_admin());
