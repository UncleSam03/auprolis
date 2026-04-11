/* src/contexts/NewListingContext.jsx */
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const NewListingContext = createContext();

export const useNewListing = () => {
    const context = useContext(NewListingContext);
    if (!context) {
        throw new Error('useNewListing must be used within a NewListingProvider');
    }
    return context;
};

export const NewListingProvider = ({ children }) => {
    const { user, profile } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [listingData, setListingData] = useState({
        // Step 1: Basics & Location
        property_type: 'Residential Multi-Family',
        price_pula: '',
        title: '',
        location: '',
        latitude: null,
        longitude: null,
        description: '',
        auction_date: '',

        // Step 2: Media & Specs
        images: [],
        bedrooms: 0,
        bathrooms: 0,
        land_size: '',
        year_built: 2000,
        case_type: 'Sheriff Sale / Auction',

        // Step 3: Legal & Financials
        case_number: '',
        plaintiff: '',
        defendant: '',
        court_name: '',
        valuation: '',
        legal_status: 'Auction Scheduled',

        // Document Status
        documents: {
            title_deed: false,
            seller_id: false,
            court_order: false,
            tax_clearance: false
        },

        // Metadata
        status: 'pending'
    });

    const updateListingData = (newData) => {
        setListingData(prev => ({ ...prev, ...newData }));
    };

    const resetListingData = () => {
        setListingData({
            property_type: 'Residential Multi-Family',
            price_pula: '',
            title: '',
            location: '',
            latitude: null,
            longitude: null,
            description: '',
            auction_date: '',
            images: [],
            bedrooms: 0,
            bathrooms: 0,
            land_size: '',
            year_built: 2000,
            case_type: 'Sheriff Sale / Auction',
            case_number: '',
            plaintiff: '',
            defendant: '',
            court_name: '',
            valuation: '',
            legal_status: 'Auction Scheduled',
            documents: {
                title_deed: false,
                seller_id: false,
                court_order: false,
                tax_clearance: false
            },
            status: 'pending'
        });
    };

    const submitListing = async (submitStatus = 'approved') => {
        if (!user) {
            toast({
                variant: "destructive",
                title: "Authentication Required",
                description: "You must be logged in to create a listing.",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('properties')
                .insert([{
                    seller_id: user.id,
                    title: listingData.title || 'Untitled Listing',
                    description: listingData.description,
                    property_type: listingData.property_type,
                    location: listingData.location,
                    latitude: listingData.latitude,
                    longitude: listingData.longitude,
                    price_usd: parseFloat(listingData.price_pula.toString().replace(/[^0-9.]/g, '')) || 0,
                    status: submitStatus,
                    case_number: listingData.case_number || 'N/A',
                    images: listingData.images, // Added images field which was missing in the insert
                    auction_date: listingData.auction_date || null,
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;

            toast({
                title: submitStatus === 'approved' ? "Listing Published!" : "Draft Saved",
                description: "Your property has been successfully logged into the intelligence dossier.",
            });

            resetListingData();
            if (profile?.user_type === 'admin') {
                navigate('/admin/listings');
            } else {
                navigate('/seller/listings');
            }
            return true;
        } catch (error) {
            console.error('Error submitting listing:', error.message || error);
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: error.message,
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <NewListingContext.Provider value={{ listingData, updateListingData, resetListingData, submitListing, isSubmitting }}>
            {children}
        </NewListingContext.Provider>
    );
};
