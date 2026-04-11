-- Add is_deleted column to properties for soft delete
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;
