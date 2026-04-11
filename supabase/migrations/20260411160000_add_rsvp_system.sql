-- SQL Migration: Add RSVP system and attendees tracking

-- 1. Add attendees_count to properties if it doesn't exist
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS attendees_count INTEGER DEFAULT 0;

-- 2. Create property_attendees table for unique user RSVPs
CREATE TABLE IF NOT EXISTS public.property_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, property_id)
);

-- 3. Enable RLS on property_attendees
ALTER TABLE public.property_attendees ENABLE ROW LEVEL SECURITY;

-- 4. Policies for property_attendees
DROP POLICY IF EXISTS "Users can view all RSVPs" ON public.property_attendees;
CREATE POLICY "Users can view all RSVPs" ON public.property_attendees
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their own RSVPs" ON public.property_attendees;
CREATE POLICY "Users can manage their own RSVPs" ON public.property_attendees
    FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. RPC to toggle RSVP safely
CREATE OR REPLACE FUNCTION toggle_property_rsvp(property_id_param UUID)
RETURNS boolean AS $$
DECLARE
    is_attending boolean;
BEGIN
    -- Check if user is already attending
    IF EXISTS (SELECT 1 FROM public.property_attendees WHERE user_id = auth.uid() AND property_id = property_id_param) THEN
        -- Remove RSVP
        DELETE FROM public.property_attendees WHERE user_id = auth.uid() AND property_id = property_id_param;
        -- Decrement count
        UPDATE public.properties SET attendees_count = GREATEST(0, attendees_count - 1) WHERE id = property_id_param;
        RETURN false;
    ELSE
        -- Add RSVP
        INSERT INTO public.property_attendees (user_id, property_id) VALUES (auth.uid(), property_id_param);
        -- Increment count
        UPDATE public.properties SET attendees_count = attendees_count + 1 WHERE id = property_id_param;
        RETURN true;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
