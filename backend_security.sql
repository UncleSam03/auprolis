ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 1.1 Ensure Relationships exist (PostgREST needs explicit FKs for joins)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES profiles(id);

-- Fix for specific relationship issue
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'properties_seller_id_fkey'
    ) THEN
        ALTER TABLE properties ADD CONSTRAINT properties_seller_id_fkey 
        FOREIGN KEY (seller_id) REFERENCES profiles(id);
    END IF;
END $$;

-- 2. Properties Table Policies

-- SELECT: Public can view approved properties, or if they are the owner/admin
CREATE POLICY "Public can view approved properties" ON properties
FOR SELECT USING (
  status = 'approved' OR 
  (auth.uid() = seller_id) OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

-- INSERT: Only authenticated sellers/admins
CREATE POLICY "Authorized users can insert properties" ON properties
FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type IN ('admin', 'sheriff', 'bank', 'agent'))
  )
);

-- UPDATE/DELETE: Only the owner or an admin
CREATE POLICY "Owners or admins can update properties" ON properties
FOR UPDATE USING (
  auth.uid() = seller_id OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

CREATE POLICY "Owners or admins can delete properties" ON properties
FOR DELETE USING (
  auth.uid() = seller_id OR
  (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'admin'))
);

-- 3. Profiles Table Policies (Restricted)

-- SELECT: Public can view profiles (needed for seller info)
CREATE POLICY "Profiles are viewable by everyone" ON profiles
FOR SELECT USING (true);

-- INSERT: Users can create their own profile during signup
CREATE POLICY "Users can create their own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE: Users can update their own profile EXCEPT user_type and subscription_type
-- Note: Suboptimal check for field-level security in vanilla RLS, but better than nothing:
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND (
      user_type = (SELECT user_type FROM profiles WHERE id = auth.uid()) AND
      subscription_type = (SELECT subscription_type FROM profiles WHERE id = auth.uid())
  )
);

-- 4. Storage Policies (Bucket: property-images)

-- Enable RLS on Storage (if applicable, usually done via policies in Supabase dashboard)

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'property-images' );

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'property-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Owners or admins can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'property-images' AND (
    (auth.uid() = owner) OR
    (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin'))
  )
);
