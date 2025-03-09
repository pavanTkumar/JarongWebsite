// Header.jsx - Fixed Link components
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Travel Packages', path: '/packages' },
    { name: 'Gambia Apartment', path: '/gambia-apartment' },
    { name: 'Affiliate', path: '/affiliate' },
    { name: 'Media', path: '/media' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  // Handle scroll for transparent/solid header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className={`text-2xl font-bold relative z-10 ${
            scrolled ? 'text-blue-600' : 'text-white'
          }`}
        >
          <span className={scrolled ? 'text-blue-600' : 'text-white'}>Jarong</span>
          <span className={scrolled ? 'text-amber-500' : 'text-amber-400'}>Media</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`font-medium transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full ${
                    scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-amber-200'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Book Now Button - Desktop */}
        <div className="hidden lg:block">
          <Link 
            href="/booking"
            className={`px-6 py-3 rounded-lg transition-all transform hover:translate-y-[-3px] hover:shadow-lg ${
              scrolled 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
          >
            Book Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-7 flex flex-col items-end space-y-1.5">
            <span className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'} ${scrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
            <span className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? 'opacity-0 w-6' : 'w-4'} ${scrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
            <span className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'} ${scrolled ? 'bg-gray-800' : 'bg-white'}`}></span>
          </div>
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-blue-900/95 z-40 lg:hidden">
            <div className="container mx-auto px-6 py-20">
              <ul className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.path}
                      className="block text-white text-2xl font-medium py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-6">
                  <Link 
                    href="/booking"
                    className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;