import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "RSA", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-crypto-dark-blue/80 backdrop-blur-md z-50 border-b border-crypto-purple/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-crypto-purple to-crypto-light-purple flex items-center justify-center overflow-hidden group-hover:animate-spin-slow transition-all duration-500">
            <span className="text-white font-bold text-xs">RSA</span>
          </div> */}
          {/* <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-crypto-purple to-crypto-light-purple flex items-center justify-center overflow-hidden group-hover:animate-spin-slow transition-all duration-500 bg-gradient-to-br from-crypto-light-purple to-crypto-purple rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
            <img
              src="public/ITE.jpg"
              alt="ITE Logo"
              className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
            />
            <span className="text-white font-bold text-xs">RSA</span>
          </div> */}
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-crypto-purple to-crypto-light-purple inline-block text-transparent bg-clip-text">
            {/* CipherVerse */}
          </span>
          {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-crypto-purple to-crypto-light-purple flex items-center justify-center overflow-hidden group-hover:animate-spin-slow transition-all duration-500">
            <span className="text-white font-bold text-xs ">


              <img src="public/ITE.jpg" alt="" className=""/>
            </span>
          </div> */}
          <div className="relative w-13 h-13 bg-gradient-to-br from-crypto-light-purple to-crypto-purple rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
            <img
              src="public/ITE.jpg"
              alt="ITE Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            
          </div>
          <span>Information Technology Engineering</span>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-crypto-purple to-crypto-light-purple inline-block text-transparent bg-clip-text">
            {/* CipherVerse */}
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative px-2 py-1 text-sm font-medium transition-colors duration-300",
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

        <div className="md:hidden">
          {/* Mobile menu button would go here */}
          <button className="p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
