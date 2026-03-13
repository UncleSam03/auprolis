import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ id }) => {
  const {
    toast
  } = useToast();
  const handleClick = () => {
    toast({
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };
  const footerSections = [{
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Blog', 'Contact']
  }, {
    title: 'Resources',
    links: ['Help Center', 'FAQs', 'Legal Guide', 'Safety Tips', 'Terms of Service']
  }, {
    title: 'Services',
    links: ['Browse Properties', 'List Property', 'Auction Schedule', 'Valuation', 'Financing']
  }];
  const socialLinks = [{
    icon: Facebook,
    name: 'Facebook'
  }, {
    icon: Twitter,
    name: 'Twitter'
  }, {
    icon: Instagram,
    name: 'Instagram'
  }, {
    icon: Linkedin,
    name: 'LinkedIn'
  }];
  return (
    <footer id={id} className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <span className="text-3xl font-bold text-[#2563eb]">Auprolis</span>
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
                <span>+267  74 104 511</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Gaborone, Botswana</span>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => <div key={index}>
              <span className="font-bold text-lg mb-4 block">{section.title}</span>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => <li key={linkIndex}>
                    <button onClick={handleClick} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </button>
                  </li>)}
              </ul>
            </div>)}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Auprolis. All rights reserved.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return <button key={index} onClick={handleClick} className="w-10 h-10 bg-gray-800 hover:bg-[#2563eb] rounded-full flex items-center justify-center transition-colors duration-200" aria-label={social.name}>
                    <Icon size={18} />
                  </button>;
            })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;