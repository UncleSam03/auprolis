-- SQL Migration: Add Interest Notifications for Property Updates

-- 1. Add notify_email toggle to property_attendees if it doesn't exist
ALTER TABLE public.property_attendees ADD COLUMN IF NOT EXISTS notify_email BOOLEAN DEFAULT true;

-- 2. Create the notification function for property updates
CREATE OR REPLACE FUNCTION public.handle_property_update_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    prop_attendee RECORD;
BEGIN
    -- Only trigger if significant fields changed (excluding analytics)
    IF (OLD.price_usd IS DISTINCT FROM NEW.price_usd OR
        OLD.listing_title IS DISTINCT FROM NEW.listing_title OR
        OLD.description IS DISTINCT FROM NEW.description OR
        OLD.sheriff_information IS DISTINCT FROM NEW.sheriff_information OR
        OLD.status IS DISTINCT FROM NEW.status) THEN
        
        -- Find all users who marked interest (RSVP'd) for this property
        FOR prop_attendee IN 
            SELECT user_id FROM public.property_attendees WHERE property_id = NEW.id
        LOOP
            -- Create a notification for each interested user
            INSERT INTO public.notifications (
                recipient_id, 
                type, 
                title, 
                message, 
                link, 
                metadata
            )
            VALUES (
                prop_attendee.user_id,
                'listing_update',
                'Listing Updated: ' || NEW.listing_title,
                'The details for a property you are interested in (' || NEW.listing_title || ') have been adjusted.',
                '/property/' || NEW.id,
                jsonb_build_object('property_id', NEW.id, 'updated_fields', 
                    jsonb_build_array(
                        CASE WHEN OLD.price_usd IS DISTINCT FROM NEW.price_usd THEN 'price' END,
                        CASE WHEN OLD.status IS DISTINCT FROM NEW.status THEN 'status' END
                    )
                )
            );
            
            -- In a real environment, this is where you'd trigger an actual email 
            -- or flag it for an email worker.
        END LOOP;
    END IF;
    
    RETURN NEW;
END;
$$;

-- 3. Create the trigger
DROP TRIGGER IF EXISTS trg_property_update_notification ON public.properties;
CREATE TRIGGER trg_property_update_notification
    AFTER UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_property_update_notification();
