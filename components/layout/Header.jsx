import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Travel Packages", path: "/packages" },
    { name: "The Lamsarr Apartments", path: "/gambia-apartment" },
    { name: "Affiliate", path: "/affiliate" },
    { name: "Media", path: "/media" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle scroll for transparent/solid header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <div
        className={`fixed top-0 left-0 right-0  transition-all duration-300 z-20 ${
          scrolled && !mobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 flex justify-between items-center h-20">
          {/* Logo - SVG embedded directly */}
          <Link href="/" className="relative  flex items-center h-16">
            {scrolled && !mobileMenuOpen ? (
              // Color version for scrolled state
              <svg
                width="280"
                height="60"
                viewBox="0 0 560 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Replace this with your actual SVG code for the color version */}
                <path
                  d="M10,40 Q70,20 140,30 Q200,37.5 260,37.5 Q320,37.5 380,30 L415,30 L430,22.5 L445,30 L460,22.5 L475,30 L490,22.5"
                  stroke="#F39C12"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M20,50 Q80,30 150,40 Q210,47.5 270,47.5 Q330,47.5 390,40 L425,40"
                  stroke="#E67E22"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Text: JARONG MEDIA LLC */}
                <text
                  x="220"
                  y="80"
                  fontFamily="Arial, sans-serif"
                  fontSize="32"
                  fontWeight="bold"
                  fill="#E67E22"
                  textAnchor="middle"
                >
                  JARONG MEDIA LLC
                </text>
                {/* Text: MARKETING AND TRAVEL SERVICES */}
                <text
                  x="220"
                  y="100"
                  fontFamily="Arial, sans-serif"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#F39C12"
                  textAnchor="middle"
                >
                  MARKETING AND TRAVEL SERVICES
                </text>
              </svg>
            ) : (
              // White version for transparent header
              <svg
                width="280"
                height="60"
                viewBox="0 0 560 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Replace this with your actual SVG code for the white version */}
                <path
                  d="M10,40 Q70,20 140,30 Q200,37.5 260,37.5 Q320,37.5 380,30 L415,30 L430,22.5 L445,30 L460,22.5 L475,30 L490,22.5"
                  stroke="white"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M20,50 Q80,30 150,40 Q210,47.5 270,47.5 Q330,47.5 390,40 L425,40"
                  stroke="white"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Text: JARONG MEDIA LLC */}
                <text
                  x="220"
                  y="80"
                  fontFamily="Arial, sans-serif"
                  fontSize="32"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                >
                  JARONG MEDIA LLC
                </text>
                {/* Text: MARKETING AND TRAVEL SERVICES */}
                <text
                  x="220"
                  y="100"
                  fontFamily="Arial, sans-serif"
                  fontSize="14"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                >
                  MARKETING AND TRAVEL SERVICES
                </text>
              </svg>
            )}
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={`w-fit text-center ${(item.name === "About" || item.name === "Contact") && "hidden xl:block"}`}
                >
                  <Link
                    href={item.path}
                    className={`font-medium transition-all relative after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full  ${
                      scrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-amber-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Book Now Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/booking"
              className={`px-5 py-2.5 rounded-lg transition-all transform hover:translate-y-[-3px] hover:shadow-lg ${
                scrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-amber-500 hover:bg-amber-600 text-white"
              }`}
            >
              Book Now
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-7 flex flex-col items-end space-y-1.5">
              <span
                className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"} ${scrolled && !mobileMenuOpen ? "bg-gray-800" : "bg-white"}`}
              ></span>
              <span
                className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? "opacity-0 w-6" : "w-4"} ${scrolled && !mobileMenuOpen ? "bg-gray-800" : "bg-white"}`}
              ></span>
              <span
                className={`block h-0.5 rounded transition-all ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"} ${scrolled && !mobileMenuOpen ? "bg-gray-800" : "bg-white"}`}
              ></span>
            </div>
          </div>
          {/* Mobile Menu */}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-blue-900/95 lg:hidden z-10">
          <div className="container mx-auto px-6 py-20">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="block text-white text-2xl font-medium py-2 w-fit"
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
    </nav>
  );
};

export default Header;
