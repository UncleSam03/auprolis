import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, HelpCircle, Users, Scale, LayoutDashboard, Mail } from 'lucide-react';

const faqs = [
  {
    category: 'General Questions',
    icon: HelpCircle,
    color: 'blue',
    questions: [
      {
        q: 'What exactly is a "Sale in Execution"?',
        a: 'In Botswana, a Sale in Execution occurs when a debtor fails to meet their financial obligations (usually a mortgage or a judgment debt). A court order is issued, and the Deputy Sheriff is tasked with seizing and selling the property to recover the debt. These are public auctions open to everyone.',
      },
      {
        q: 'Is Auprolis an auctioneer?',
        a: 'No. Auprolis is a property intelligence platform. We aggregate, verify, and track listings from Deputy Sheriffs and legal firms across Botswana. We provide the data and legal insights you need to make an informed bid, but the actual auction is conducted by a licensed Deputy Sheriff.',
      },
      {
        q: 'Why should I buy a distressed property?',
        a: 'The primary advantage is price. Distressed assets often sell at a "forced sale value," which can be significantly lower than the market value. However, they come with unique risks that Auprolis helps you manage through our Pro and Enterprise data tools.',
      },
    ],
  },
  {
    category: 'For Buyers & Investors',
    icon: Users,
    color: 'emerald',
    questions: [
      {
        q: 'Can I view the property before the auction?',
        a: 'Yes, but with limitations. Since these are often occupied by the debtor, internal viewings are not always guaranteed. We provide Lot numbers and coordinates so you can perform "drive-by" inspections. Our Pro plan also includes available deed information to help you understand the plot\'s boundaries.',
      },
      {
        q: 'What costs should I prepare for besides the bid price?',
        a: 'In Botswana, buying at a Sheriff\'s sale involves: (1) The Bid Price — the amount you won at; (2) Deputy Sheriff\'s Commission — usually a percentage of the sale price; (3) Transfer Duties — paid to the Botswana Unified Revenue Service (BURS); and (4) Outstanding Rates & Utilities — in most cases, the purchaser is responsible for clearing outstanding council rates and utility bills before transfer.',
      },
      {
        q: 'Do I need the full cash amount on the day of the auction?',
        a: 'Usually, you must pay a deposit (often 10% or a fixed amount like P5,000–P10,000) immediately via EFT or bank-guaranteed cheque. The balance is typically required within 21 to 30 days. Always check the specific "Conditions of Sale" listed on our platform for each property.',
      },
      {
        q: 'Can I get a bank loan (mortgage) for a sheriff sale?',
        a: 'It is difficult but possible. Most auctions require the balance in a short timeframe (30 days), which is faster than most banks process home loans. We recommend having a pre-approval or "cash-ready" status before bidding.',
      },
    ],
  },
  {
    category: 'Legal & Safety',
    icon: Scale,
    color: 'purple',
    questions: [
      {
        q: 'What happens if the debtor refuses to leave the house?',
        a: 'This is a common concern. Once the property is transferred into your name, you become the legal owner. If the previous occupant refuses to vacate, you may need to apply for an Eviction Order through the court. Our Legal Guide (found in the footer) provides more detail on this process.',
      },
      {
        q: 'What does "Sold Voetstoots" mean?',
        a: 'This is a Roman-Dutch legal term used in Botswana meaning "as is." The buyer accepts the property with all its faults, visible or hidden. This is why Auprolis emphasizes document verification — so you aren\'t surprised by hidden legal encumbrances.',
      },
      {
        q: 'Are the listings on Auprolis verified?',
        a: 'Yes. Every listing on Auprolis is cross-referenced with official Government Gazette notices, newspaper advertisements, and Deputy Sheriff circulars to ensure the auction is legitimate and the date is current.',
      },
    ],
  },
  {
    category: 'Using the Platform',
    icon: LayoutDashboard,
    color: 'amber',
    questions: [
      {
        q: 'Why are some details "Hidden" on property cards?',
        a: 'To maintain the quality of our data and support the platform, certain high-value data—such as the specific Deputy Sheriff\'s contact details, internal photos, and legal document scans—are reserved for our Pro and Enterprise subscribers.',
      },
      {
        q: 'How do I "Reserve" a property on Auprolis?',
        a: 'The "Make a Reservation" feature allows you to signal your intent to bid. This alerts our team to provide you with real-time updates (e.g., if the auction is cancelled or postponed) and ensures you have the necessary "Conditions of Sale" document ahead of time.',
      },
      {
        q: 'How often is the Auction Schedule updated?',
        a: 'Daily. The distressed property market moves fast—sales are often stayed (cancelled) at the last minute if the debtor pays. We update our schedule as soon as we receive official notice.',
      },
    ],
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-100', icon: 'bg-blue-600/10 text-blue-600', dot: 'bg-blue-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'bg-emerald-600/10 text-emerald-600', dot: 'bg-emerald-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', icon: 'bg-purple-600/10 text-purple-600', dot: 'bg-purple-500' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-100', icon: 'bg-amber-600/10 text-amber-700', dot: 'bg-amber-500' },
};

const AccordionItem = ({ question, answer, isOpen, onToggle, color }) => {
  const colors = colorMap[color];
  return (
    <div className={`border ${isOpen ? colors.border : 'border-gray-100'} rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? colors.bg : 'bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-800 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <div className={`w-8 h-0.5 ${colors.dot} mb-3 rounded-full`} />
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  const [openItems, setOpenItems] = useState({});

  const toggle = (catIdx, qIdx) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Helmet>
        <title>FAQs – Auprolis | Sheriff Sales & Distressed Properties in Botswana</title>
        <meta name="description" content="Find answers to common questions about buying properties at sheriff sales and auctions in Botswana. Learn about the process, costs, legal requirements, and how to use Auprolis." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <HelpCircle className="w-4 h-4" />
              Help Centre
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about buying distressed properties and sheriff sales in Botswana with confidence.
            </p>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10 text-gray-600 leading-relaxed">
            Welcome to Botswana's leading intelligence platform for distressed properties and sheriff sales. We've compiled these answers to help you navigate the complexities of "Sales in Execution" and "Public Auctions" with confidence.
          </div>

          <div className="space-y-12">
            {faqs.map((category, catIdx) => {
              const Icon = category.icon;
              const colors = colorMap[category.color];
              return (
                <div key={catIdx}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-3">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem
                        key={qIdx}
                        question={item.q}
                        answer={item.a}
                        isOpen={!!openItems[`${catIdx}-${qIdx}`]}
                        onToggle={() => toggle(catIdx, qIdx)}
                        color={category.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still need help? */}
          <div className="mt-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center shadow-lg">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-blue-100 mb-6">If your question isn't answered here, our team is ready to help.</p>
            <a
              href="mailto:info@auprolis.com"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              id="faq-contact-email-btn"
            >
              <Mail className="w-4 h-4" />
              info@auprolis.com
            </a>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-gray-100 text-sm">
            <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ Terms of Service</Link>
            <Link to="/legal-guide" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ Legal Guide</Link>
            <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">← Back to Home</Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default FAQs;
