-- Add views_count and sheriff_information to properties
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS sheriff_information TEXT;

-- Create an RPC to increment views safely
CREATE OR REPLACE FUNCTION increment_property_views(property_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.properties
  SET views_count = views_count + 1
  WHERE id = property_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
