import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const usePropertyData = (options = {}) => {
  const { user, profile } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const subscriptionType = profile?.subscription_type || 'free';

  const staticProperties = [
    {
      id: '1',
      case_number: 'CVHGB-002250-22',
      listing_title: '3-Bedroom House with Garage for Sale in Execution - Lot 59217',
      property_type: 'Residential',
      listing_type: null,
      auction_date: '2026-02-13',
      auction_time: '10:00',
      auction_venue: 'On-Site: Lot 59217',
      address_lot_number: 'Gaborone Lot 59217',
      size_m2: '320m2',
      title_deed_number: 'Deed of Transfer No. 1118/2019',
      bedrooms: 3,
      condition: 'Developed Property',
      full_description: '3 bed House with Garage',
      terms_of_sale: 'Bank transfer (EFT)',
      seller_contact_entity: 'Deputy Sheriff Molebi Galeitsiwe',
      contact_numbers: '71632036 / 3975580',
      attorney: 'Bookbinder Business Law',
      plaintiff: 'First National Bank of Botswana Limited',
      defendant_owner: 'Mpho Dorothy Seretse',
      notice_date: '2026-01-13',
      status: 'active',
      images: [] 
    },
    {
      id: '2',
      case_number: 'CVHGB-002228-24',
      listing_title: '4-Bedroom House for Sale in Execution - Lot 4245',
      property_type: 'Residential',
      listing_type: null,
      auction_date: '2026-02-13',
      auction_time: '10:30',
      auction_venue: 'On-Site: Lot 4245',
      address_lot_number: 'Gaborone Lot 4245',
      size_m2: '511m2',
      title_deed_number: 'Deed of Transfer No. 2423/2010',
      bedrooms: 4,
      condition: 'Developed Property',
      full_description: '4-bedroomed house, sitting room, dining room, kitchen, bath and toilet combined, 2 x verandas, 2-roomed',
      terms_of_sale: 'Bank transfer (EFT)',
      seller_contact_entity: 'Deputy Sheriff Omphemetse Peter Kaisara',
      contact_numbers: '72195113 / 71222244 / 3973799',
      attorney: 'Bookbinder Business Law',
      plaintiff: 'First National Bank of Botswana Limited',
      defendant_owner: 'Oteng Reikeletseng',
      notice_date: '2026-01-13',
      status: 'active',
      images: []
    },
    {
      id: '3',
      case_number: 'CVHGB-000522-25',
      listing_title: '3-Bedroom House for Sale in Execution - Tribal Lot 5009',
      property_type: 'Residential',
      listing_type: null,
      auction_date: '2026-01-29',
      auction_time: '10:00',
      auction_venue: 'On-Site: Tribal Lot 5009',
      address_lot_number: 'Mogoditshane Tribal Lot 5009',
      size_m2: 'n/a',
      title_deed_number: 'Deed of Transfer No. MA603/2015',
      bedrooms: 3,
      condition: 'Developed Property',
      full_description: 'Sitting room combined with kitchen, Screen wall, electric fence, unfinished, two rooms house',
      terms_of_sale: 'Cash or Bank guaranteed cheque',
      seller_contact_entity: 'Deputy Sheriff Meshack Moshabi',
      contact_numbers: '71623026 / 73301311',
      attorney: 'Ramalepa Attorneys',
      plaintiff: 'Botswana Savings Bank',
      defendant_owner: 'Tshepo Mothupi',
      notice_date: '2025-12-17',
      status: 'active',
      images: []
    }
  ];

  useEffect(() => {
    // Simulate a brief loading state or just set immediately
    setProperties(staticProperties);
    setLoading(false);
    setError(null);
  }, []);

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setProperties(staticProperties);
      setLoading(false);
    }, 500);
  };

  return { properties, loading, error, subscriptionType, refresh };
};