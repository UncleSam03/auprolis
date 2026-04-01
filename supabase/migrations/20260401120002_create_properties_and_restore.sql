-- Basic table for properties based on frontend requirements
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT,
    listing_title TEXT,
    property_type TEXT,
    type TEXT,
    address_lot_number TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT,
    auction_date TIMESTAMPTZ,
    price_usd NUMERIC,
    status TEXT DEFAULT 'pending',
    case_number TEXT,
    images TEXT[] DEFAULT '{}'
);

-- Basic reservations table matching useProperties relation
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fix orphaned profiles
INSERT INTO public.profiles (id, email, name, user_type, status, subscription_type)
SELECT 
    au.id, 
    au.email, 
    COALESCE(au.raw_user_meta_data->>'name', ''),
    COALESCE(NULLIF(au.raw_user_meta_data->>'user_type', ''), 'buyer'),
    COALESCE(NULLIF(au.raw_user_meta_data->>'status', ''), 'active'),
    COALESCE(NULLIF(au.raw_user_meta_data->>'subscription_type', ''), 'free')
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL;
