import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    setIsOpen(false); 
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Scrolls to the top of the element
        });
      } else {
        toast({
          description: "🚧 Section not found on this page.",
        });
      }
    }
  };

  const navItems = [
    { name: 'Browse Properties', id: 'properties' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Why Choose Auprolis', id: 'why-choose' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#2563eb]">Auprolis</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollToSection(item.id)}
                className="text-gray-700 hover:text-[#2563eb] transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                 <Link to="/messages">
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-[#2563eb]">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-gray-700 hover:text-[#2563eb]">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-700 hover:text-[#2563eb]">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#2563eb]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollToSection(item.id)}
                className="block w-full text-left py-2 px-4 text-gray-700 hover:text-[#2563eb] transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <div className="flex flex-col space-y-2 mt-4 px-4">
              {user ? (
                <>
                  <Link to="/messages">
                    <Button variant="ghost" className="w-full justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" /> Messages
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="w-full">Dashboard</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signin">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;