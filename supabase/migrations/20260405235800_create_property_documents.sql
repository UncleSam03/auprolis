-- Create Property Documents table
CREATE TABLE IF NOT EXISTS public.property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    file_type TEXT, -- e.g. 'application/pdf', 'image/jpeg'
    file_path TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'missing')),
    category TEXT DEFAULT 'legal' CHECK (category IN ('legal', 'identification', 'property_photos', 'tax')),
    size_bytes BIGINT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS
ALTER TABLE public.property_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "property_documents_select_own" ON public.property_documents;
CREATE POLICY "property_documents_select_own" ON public.property_documents
    FOR SELECT USING (auth.uid() = seller_id OR (SELECT public.is_admin()));

DROP POLICY IF EXISTS "property_documents_insert_own" ON public.property_documents;
CREATE POLICY "property_documents_insert_own" ON public.property_documents
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

DROP POLICY IF EXISTS "property_documents_update_own" ON public.property_documents;
CREATE POLICY "property_documents_update_own" ON public.property_documents
    FOR UPDATE USING (auth.uid() = seller_id OR (SELECT public.is_admin()));

DROP POLICY IF EXISTS "property_documents_delete_own" ON public.property_documents;
CREATE POLICY "property_documents_delete_own" ON public.property_documents
    FOR DELETE USING (auth.uid() = seller_id OR (SELECT public.is_admin()));

-- Trigger for updated_at
CREATE TRIGGER trg_property_documents_updated_at
    BEFORE UPDATE ON public.property_documents
    FOR EACH ROW
    EXECUTE PROCEDURE public.set_updated_at();

-- Note: Storage bucket 'documents' should be created manually in Supabase Dashboard or via API
