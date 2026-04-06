-- Enable RLS and add policies for properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 1. All users can view approved listings
CREATE POLICY "View approved listings"
ON public.properties FOR SELECT
USING (status = 'approved' OR auth.uid() = seller_id OR (SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 2. Sellers and Admins can insert listings
CREATE POLICY "Allow sellers and admins to insert"
ON public.properties FOR INSERT
WITH CHECK (
  auth.uid() = seller_id AND 
  (SELECT user_type FROM public.profiles WHERE id = auth.uid()) IN ('seller', 'admin', 'agent', 'bank', 'sheriff')
);

-- 3. Owners and Admins can update
CREATE POLICY "Allow owners and admins to update"
ON public.properties FOR UPDATE
USING (auth.uid() = seller_id OR (SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK (auth.uid() = seller_id OR (SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 4. Owners and Admins can delete
CREATE POLICY "Allow owners and admins to delete"
ON public.properties FOR DELETE
USING (auth.uid() = seller_id OR (SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');
