# SELLER_DESIGN_MAP.md

This document maps the Stitch export HTML files to the React application routes and components for the Seller Dashboard.

| Stitch Export File | React Route | Root Component | Status |
| :--- | :--- | :--- | :--- |
| `seller_dashboard_home/code.html` | `/seller` | `SellerDashboardHome` | [ ] |
| `my_listings/code.html` | `/seller/listings` | `SellerListings` | [ ] |
| `new_listing_basics_step_1/code.html` | `/seller/listings/new/step-1` | `NewListingStep1` | [ ] |
| `new_listing_details_step_2/code.html` | `/seller/listings/new/step-2` | `NewListingStep2` | [ ] |
| `new_listing_media_step_3/code.html` | `/seller/listings/new/step-3` | `NewListingStep3` | [ ] |
| `new_listing_review_publish_step_4/code.html`| `/seller/listings/new/step-4` | `NewListingStep4` | [ ] |
| `listing_detail_edit_view/code.html` | `/seller/listings/:id` | `SellerListingDetail` | [ ] |
| `performance_analytics/code.html` | `/seller/performance` | `SellerPerformance` | [ ] |
| `inquiries_inbox/code.html` | `/seller/inquiries` | `SellerInquiries` | [ ] |
| `documents_vault/code.html` | `/seller/documents` | `SellerDocuments` | [ ] |
| `notifications_settings/code.html` | `/seller/notifications` | `SellerNotifications` | [ ] |
| `account_plan_billing/code.html` | `/seller/account` | `SellerAccount` | [ ] |

## Pricing Confirmation
All plan displays will strictly follow the canonical `auprolis.com` pricing:
- **Basic**: $15/month
- **Pro**: $30/month (Recommended)
- **Enterprise**: $45/month

## Build Order
1.  **Shared Tokens & Layout**: Define shared colors and `SellerDashboardLayout`.
2.  **Dashboard Home**: Port overview KPIs and activity feed.
3.  **My Listings**: Implement empty state and listing card/row components.
4.  **New Listing Flow**: Multi-step wizard (Steps 1-4).
5.  **Analytics & Inquiries**: Secondary data-heavy screens.
6.  **Account & Settings**: Billing and notification management.
7.  **Auth & Routing**: Protect seller routes and map them in `App.jsx`.
