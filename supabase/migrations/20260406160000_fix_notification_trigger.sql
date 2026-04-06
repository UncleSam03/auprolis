-- Fix the notification trigger to use 'title' instead of 'listing_title'
-- This resolves the 'record "new" has no field "listing_title"' error during insertion

CREATE OR REPLACE FUNCTION public.handle_new_property_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- 1. Notify the seller (Confirmation)
    INSERT INTO public.notifications (recipient_id, type, title, message, link, metadata)
    VALUES (
        NEW.seller_id,
        'new_listing',
        'Listing Logged',
        'Dossier for ' || COALESCE(NEW.title, 'Untitled') || ' has been successfully synchronized with the backend.',
        '/seller/listings/' || NEW.id,
        jsonb_build_object('property_id', NEW.id)
    );

    -- 2. Notify all admins (Moderation Alert)
    INSERT INTO public.notifications (recipient_id, type, title, message, link, metadata)
    SELECT id, 'new_listing', 'New Asset Intelligence', 
           'New dossier created: "' || COALESCE(NEW.title, 'Untitled') || '" by seller ' || COALESCE(NEW.seller_id::text, 'unknown') || '.',
           '/admin/listings/review/' || NEW.id,
           jsonb_build_object('property_id', NEW.id, 'seller_id', NEW.seller_id)
    FROM public.profiles
    WHERE user_type = 'admin';

    -- 3. Notify all buyers (Discovery Alert)
    INSERT INTO public.notifications (recipient_id, type, title, message, link, metadata)
    SELECT id, 'new_listing', 'New Property Dossier', 
           'Intelligence alert: A new property in ' || COALESCE(NEW.location, 'unspecified location') || ' hit the dossier bank.',
           '/property/' || NEW.id,
           jsonb_build_object('property_id', NEW.id)
    FROM public.profiles
    WHERE user_type = 'buyer';

    RETURN NEW;
END;
$$;
