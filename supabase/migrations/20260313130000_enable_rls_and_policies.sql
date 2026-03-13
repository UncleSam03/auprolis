-- 1. Enable RLS on Tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Properties Table Policies

-- SELECT: Public can view approved properties, or if they are the owner/admin
-- Drop if exists to avoid errors on reapplying
DROP POLICY IF EXISTS "Public can view approved properties" ON properties;
CREATE POLICY "Public can view approved properties" ON properties
FOR SELECT USING (
  status = 'approved' OR 
  (auth.uid() = seller_id) OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

-- INSERT: Only authenticated sellers/admins
DROP POLICY IF EXISTS "Authorized users can insert properties" ON properties;
CREATE POLICY "Authorized users can insert properties" ON properties
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type IN ('admin', 'sheriff', 'bank', 'agent'))
  )
);

-- UPDATE/DELETE: Only the owner or an admin
DROP POLICY IF EXISTS "Owners or admins can update properties" ON properties;
CREATE POLICY "Owners or admins can update properties" ON properties
FOR UPDATE USING (
  auth.uid() = seller_id OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

DROP POLICY IF EXISTS "Owners or admins can delete properties" ON properties;
CREATE POLICY "Owners or admins can delete properties" ON properties
FOR DELETE USING (
  auth.uid() = seller_id OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

-- 3. Profiles Table Policies (Restricted)

-- SELECT: Public can view profiles (needed for seller info)
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
CREATE POLICY "Profiles are viewable by everyone" ON profiles
FOR SELECT USING (true);

-- INSERT: Users can create their own profile during signup
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
CREATE POLICY "Users can create their own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE: Users can update their own profile EXCEPT user_type and subscription_type
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND (
      user_type = (SELECT user_type FROM profiles WHERE id = auth.uid()) AND
      subscription_type = (SELECT subscription_type FROM profiles WHERE id = auth.uid())
  )
);

-- 4. Storage Policies (Bucket: property-images)
-- Note: Storage policies are in the storage.objects table

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'property-images' );

DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'property-images' AND 
  auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Owners or admins can delete" ON storage.objects;
CREATE POLICY "Owners or admins can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'property-images' AND (
    (auth.uid() = owner) OR
    (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin'))
  )
);
