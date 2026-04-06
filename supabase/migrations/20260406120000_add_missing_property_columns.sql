-- Add missing columns to properties table to support the new listing workflow
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS bedroom_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bathroom_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS land_size TEXT,
ADD COLUMN IF NOT EXISTS year_built INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS listing_category TEXT;
