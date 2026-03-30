import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Gavel, Map, Receipt, AlertTriangle, Home, ClipboardList, Info
} from 'lucide-react';

const Section = ({ icon: Icon, number, title, color = 'blue', children }) => {
  const colorVariants = {
    blue: 'bg-blue-600/10 text-blue-600',
    emerald: 'bg-emerald-600/10 text-emerald-600',
    amber: 'bg-amber-600/10 text-amber-700',
    red: 'bg-red-600/10 text-red-600',
    purple: 'bg-purple-600/10 text-purple-600',
    slate: 'bg-slate-600/10 text-slate-700',
  };
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colorVariants[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          {number}. {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-14 space-y-4 text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

const BulletList = ({ items, color = 'blue' }) => {
  const dotColors = {
    blue: 'bg-blue-600', emerald: 'bg-emerald-500', amber: 'bg-amber-500',
    red: 'bg-red-500', purple: 'bg-purple-500', slate: 'bg-slate-500',
  };
  return (
    <ul className="space-y-3 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-2 w-1.5 h-1.5 rounded-full ${dotColors[color]} shrink-0`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

const LegalGuide = () => {
  return (
    <>
      <Helmet>
        <title>Legal Guide – Buying Property at Auction in Botswana | Auprolis</title>
        <meta name="description" content="Understand the legal process of buying property at sheriff sales in Botswana. Learn about land tenure, financial obligations, Voetstoots, eviction rights, and due diligence checklists." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        {/* Hero */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
              <Gavel className="w-4 h-4" />
              Legal Resource
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Legal Guide
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Buying property through a 'Sale in Execution' can be highly lucrative — but it requires a solid understanding of the legal landscape in Botswana.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">Contents</p>
            <div className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                'The \'Sale in Execution\' Process',
                'Understanding Land Tenure in Botswana',
                'Financial Obligations (The \'Hidden\' Costs)',
                'The \'Voetstoots\' Clause',
                'Occupation and Eviction',
                'Due Diligence Checklist',
              ].map((item, i) => (
                <a
                  key={i}
                  href={`#section-${i + 1}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-1"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">

            {/* Section 1 */}
            <div id="section-1">
              <Section icon={Gavel} number="1" title="The 'Sale in Execution' Process" color="blue">
                <p>
                  A Sale in Execution is a legal process where a judgment creditor (usually a bank) recovers a debt by selling the debtor's property under the authority of a court order.
                </p>
                <BulletList color="blue" items={[
                  'The Writ of Execution: After a court judgment is granted, a Writ is issued, authorizing the Deputy Sheriff to "attach" (seize) the property.',
                  'The Attachment: The Sheriff serves a notice of attachment on the Registrar of Deeds, which prevents the owner from selling the property privately.',
                  'Advertisement: By law (High Court Rules), the sale must be advertised in the Government Gazette and local newspapers. Auprolis aggregates these notices so you don\'t have to scan every paper.',
                ]} />
              </Section>
            </div>

            <div className="border-t border-gray-100 my-10" />

            {/* Section 2 */}
            <div id="section-2">
              <Section icon={Map} number="2" title="Understanding Land Tenure in Botswana" color="emerald">
                <p>
                  You will encounter three main types of land on our platform. The legal requirements for transfer vary significantly between them:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <h4 className="font-bold text-gray-900 mb-2">Freehold Land</h4>
                    <p className="text-sm text-gray-600">You own the land and buildings indefinitely. Transfer is relatively straightforward through the Deeds Registry.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-2">State Land</h4>
                    <p className="text-sm text-gray-600">Held under a 'Fixed Period State Grant' (usually 99 years for residential, 50 for commercial). You own the leasehold rights.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                    <h4 className="font-bold text-gray-900 mb-2">Tribal Land</h4>
                    <p className="text-sm text-gray-600">Administered by Land Boards. Non-citizens require specialized ministerial consent to acquire rights in tribal land, even at auction.</p>
                  </div>
                </div>
              </Section>
            </div>

            <div className="border-t border-gray-100 my-10" />

            {/* Section 3 */}
            <div id="section-3">
              <Section icon={Receipt} number="3" title="Financial Obligations (The 'Hidden' Costs)" color="amber">
                <p>When the hammer falls, the bid price is only the beginning. As a buyer, you are legally responsible for:</p>
                <BulletList color="amber" items={[
                  "Sheriff's Commission: Calculated as a percentage of the purchase price (check the specific Conditions of Sale for the applicable rate).",
                  'Transfer Duty: This is a tax paid to BURS (Botswana Unified Revenue Service).',
                  'VAT: If the seller is a VAT vendor (common in commercial auctions), you may have to pay 14% VAT. Note: If you pay VAT, you are usually exempt from Transfer Duty.',
                  'Arrear Rates & Utilities: In most Sheriff auctions, the purchaser is liable for all outstanding council rates and utility bills (BPC/WUC) required to obtain a "Clearance Certificate" for transfer.',
                ]} />

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-amber-50 border border-amber-100">
                    <h4 className="font-bold text-gray-800 mb-3">Transfer Duty – Citizens</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between"><span>Up to P1,500,000</span><span className="font-semibold text-gray-900">0%</span></div>
                      <div className="flex justify-between"><span>Above P1,500,000</span><span className="font-semibold text-gray-900">5%</span></div>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-orange-50 border border-orange-100">
                    <h4 className="font-bold text-gray-800 mb-3">Transfer Duty – Non-Citizens</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between"><span>Up to P2,000,000</span><span className="font-semibold text-gray-900">10%</span></div>
                      <div className="flex justify-between"><span>Above P2,000,000</span><span className="font-semibold text-gray-900">15%</span></div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="border-t border-gray-100 my-10" />

            {/* Section 4 */}
            <div id="section-4">
              <Section icon={AlertTriangle} number="4" title="The 'Voetstoots' Clause" color="red">
                <p>All auction properties are sold "Voetstoots" (as-is).</p>
                <BulletList color="red" items={[
                  'There are no warranties against latent (hidden) or patent (visible) defects.',
                  'The Sheriff does not guarantee that the property is in the same condition it was when the photos were taken.',
                ]} />
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    <strong>Legal Tip:</strong> Always conduct a "drive-by" inspection. If the property is vacant, try to view it through the fence.
                  </p>
                </div>
              </Section>
            </div>

            <div className="border-t border-gray-100 my-10" />

            {/* Section 5 */}
            <div id="section-5">
              <Section icon={Home} number="5" title="Occupation and Eviction" color="purple">
                <p>One of the most complex legal areas in distressed property is taking physical possession.</p>
                <BulletList color="purple" items={[
                  'The "Huur Gaat Voor Koop" Principle: If there is a valid tenant in the house with a lease that predates the mortgage, that lease might still be valid. However, in most forced sales, the bank\'s rights take precedence.',
                  'Eviction: If the previous owner refuses to leave, you cannot forcefully remove them yourself. You must apply for an Eviction Order from the court once the property is registered in your name. The Sheriff will then execute the eviction.',
                ]} />
              </Section>
            </div>

            <div className="border-t border-gray-100 my-10" />

            {/* Section 6 – Checklist */}
            <div id="section-6">
              <Section icon={ClipboardList} number="6" title="Due Diligence Checklist" color="slate">
                <p>Before bidding, we strongly recommend completing the following:</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Search the Deed', desc: 'Verify the size of the plot and any registered encumbrances (mortgages or interdicts).' },
                    { label: 'Check Zoning', desc: 'Ensure the property is zoned for your intended use (Residential vs. Commercial).' },
                    { label: 'Inspect the "Conditions of Sale"', desc: 'This is the contract you sign immediately after winning. It outlines the deposit requirements and the deadline for the balance.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-7 h-7 rounded-lg bg-slate-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Disclaimer */}
            <div className="mt-10 p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <strong>Disclaimer:</strong> This guide is provided by Auprolis for educational purposes and does not constitute formal legal advice. We strongly recommend consulting with a registered conveyancer or attorney before finalizing high-value property transactions.
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-gray-100 text-sm">
              <Link to="/faqs" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ FAQs</Link>
              <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">→ Terms of Service</Link>
              <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium transition-colors">← Back to Home</Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LegalGuide;
