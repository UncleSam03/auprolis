import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollText, ShieldCheck, CreditCard, Ban, Scale, Lock, Globe, RefreshCw, Mail, MapPin } from 'lucide-react';

const Section = ({ icon: Icon, number, title, children }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900">
        {number}. {title}
      </h2>
    </div>
    <div className="pl-13 text-gray-600 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2 mt-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service – Auprolis</title>
        <meta name="description" content="Read the Auprolis Terms of Service. Understand your rights and obligations when using Botswana's leading sheriff sales and distressed property platform." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <ScrollText className="w-4 h-4" />
              Legal Document
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              By accessing or using Auprolis, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
            <p className="mt-4 text-blue-400 text-sm font-medium">Last Updated: March 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

            <p className="text-gray-600 leading-relaxed mb-10 text-base border-l-4 border-blue-500 pl-5 bg-blue-50 py-4 rounded-r-xl">
              Welcome to <strong>Auprolis (auprolis.com)</strong>. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully, as they contain important information regarding your legal rights and obligations within the Botswana property auction market.
            </p>

            <Section icon={ScrollText} number="1" title="The Nature of Our Service">
              <p>
                Auprolis is a property intelligence and data aggregation platform. We specialize in identifying, verifying, and listing "Sales in Execution," "Sheriff Sales," and other distressed property assets in Botswana.
              </p>
              <BulletList items={[
                'Not an Auctioneer: Auprolis is not a licensed auctioneer or a law firm. We do not conduct the auctions ourselves.',
                'Information Only: The content provided on this platform is for informational purposes. While we strive for 100% accuracy, the "Conditions of Sale" provided by the specific Deputy Sheriff at the time of the auction are the final legal authority.',
              ]} />
            </Section>

            <Section icon={ShieldCheck} number="2" title="User Accounts and Subscriptions">
              <BulletList items={[
                'Eligibility: You must be at least 18 years old to use this service.',
                'Account Security: You are responsible for maintaining the confidentiality of your login credentials.',
                'Subscription Tiers (Basic, Pro, Enterprise): Access to certain premium data—such as title deeds, sheriff contact info, and internal photos—is restricted to paid subscribers.',
                'Billing: Subscriptions are billed in advance and are non-refundable unless otherwise stated by local consumer protection laws.',
              ]} />
            </Section>

            <Section icon={Scale} number="3" title="Accuracy of Data and Listings">
              <p>Property auctions in Botswana are highly dynamic.</p>
              <BulletList items={[
                'Cancellations: Auctions may be cancelled or stayed (postponed) by the court or the High Court of Botswana at any time, even on the day of the sale. Auprolis is not liable for costs incurred (travel, time, etc.) due to such cancellations.',
                '"Voetstoots" (As-Is): You acknowledge that all properties listed are sold "Voetstoots." Auprolis provides data to assist your due diligence, but we do not guarantee the physical or legal condition of any property.',
              ]} />
            </Section>

            <Section icon={Ban} number="4" title="Prohibited Use">
              <p>Users are strictly prohibited from:</p>
              <BulletList items={[
                'Using automated systems (bots, scrapers) to extract data from our platform.',
                'Redistributing our "Pro" or "Enterprise" data to third parties without written consent.',
                'Misrepresenting their identity or intention to bid when using the "Make a Reservation" feature.',
              ]} />
            </Section>

            <Section icon={CreditCard} number="5" title="Fees and Payments">
              <BulletList items={[
                'All subscription fees are listed on the site.',
                'Auprolis does not handle the "deposit" or "bid price" for the properties themselves. Those transactions are handled directly between the purchaser and the Deputy Sheriff/Law Firm as per the High Court Rules of Botswana.',
              ]} />
            </Section>

            <Section icon={ShieldCheck} number="6" title="Limitation of Liability">
              <p>
                To the maximum extent permitted by the laws of Botswana, Auprolis, its directors, and employees shall not be liable for any direct, indirect, or consequential loss arising from:
              </p>
              <BulletList items={[
                'Errors or omissions in property listings.',
                'The loss of an auction bid.',
                'The physical condition of a purchased property.',
                'Issues regarding the eviction of previous occupants.',
              ]} />
            </Section>

            <Section icon={Lock} number="7" title="Intellectual Property">
              <p>
                The design, logo, and aggregated database structure of Auprolis are the exclusive property of Auprolis and are protected under the Copyright and Neighbouring Rights Act of Botswana.
              </p>
            </Section>

            <Section icon={Globe} number="8" title="Governing Law">
              <p>
                These terms are governed by and construed in accordance with the laws of the Republic of Botswana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Botswana.
              </p>
            </Section>

            <Section icon={RefreshCw} number="9" title="Changes to Terms">
              <p>
                We reserve the right to modify these terms at any time. Significant changes will be communicated via the email address associated with your account or through a prominent notice on our homepage.
              </p>
            </Section>

            {/* Contact */}
            <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Us</h3>
              <p className="text-gray-600 mb-4">For questions regarding these Terms, please contact:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a href="mailto:info@auprolis.com" className="hover:text-blue-600 transition-colors">info@auprolis.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Gaborone, Botswana</span>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-gray-100 text-sm">
              <Link to="/faqs" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ FAQs</Link>
              <Link to="/legal-guide" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ Legal Guide</Link>
              <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">← Back to Home</Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
