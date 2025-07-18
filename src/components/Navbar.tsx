import React, { useState } from "react"; // Import useState for managing mobile menu state
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // Assuming you have this utility for classnames

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "RSA", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "About Us", path: "/aboutus" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-crypto-dark-blue/80 backdrop-blur-md z-50 border-b border-crypto-purple/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Site Title */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative w-13 h-13 bg-gradient-to-br from-crypto-light-purple to-crypto-purple rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
            {/* Using a relative path for the image assuming 'public' is directly accessible or configured */}
            <img
              src="/ITE.jpg" 
              alt="ITE Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
          </div>
          <span className="text-white text-lg md:text-xl font-bold">
            Information Technology Engineering
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative px-2 py-1 text-sm font-medium transition-colors duration-300 group", // Added 'group' class here
                currentPath === link.path
                  ? "text-crypto-light-purple"
                  : "text-gray-300 hover:text-crypto-purple"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-crypto-light-purple transform origin-left transition-transform duration-300",
                  currentPath === link.path
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2 text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" // 'X' icon when menu is open
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" // Hamburger icon when menu is closed
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-crypto-dark-blue border-t border-crypto-purple/20 pb-4">
          <div className="flex flex-col items-center space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                className={cn(
                  "text-lg font-medium transition-colors duration-300",
                  currentPath === link.path
                    ? "text-crypto-light-purple"
                    : "text-gray-300 hover:text-crypto-purple"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;