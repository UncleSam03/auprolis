import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ id }) => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', action: () => navigate('/', { state: { scrollTo: 'why-choose' } }) },
        { label: 'Contact', action: () => navigate('/', { state: { scrollTo: 'contact' } }) },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'FAQs', to: '/faqs' },
        { label: 'Terms of Service', to: '/terms-of-service' },
        { label: 'Legal Guide', to: '/legal-guide' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Browse Properties', action: () => navigate('/', { state: { scrollTo: 'properties' } }) },
        { label: 'Auction Schedule', action: () => navigate('/', { state: { scrollTo: 'properties' } }) },
      ],
    },
  ];

  return (
    <footer id={id} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold text-[#2563eb]">Auprolis</Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Botswana's trusted marketplace for sheriff sales and distressed assets. Connecting buyers with verified opportunities.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={18} />
                <span>info@auprolis.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={18} />
                <span>+267 74 104 511</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Gaborone, Botswana</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <span className="font-bold text-lg mb-4 block">{section.title}</span>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={link.action}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Auprolis. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/legal-guide" className="hover:text-gray-300 transition-colors duration-200">
                Legal Guide
              </Link>
              <Link to="/faqs" className="hover:text-gray-300 transition-colors duration-200">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;