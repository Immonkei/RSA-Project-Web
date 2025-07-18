import React, { useEffect, useState } from "react";
// Assuming Card and CardContent are from shadcn/ui
// Assuming Button is from shadcn/ui
// Placeholder for Card and CardContent if shadcn/ui is not directly available
// For a self-contained example, we'll remove these imports as they're not provided.
// If shadcn/ui is expected to be available in the environment, these imports would remain.

// We will use basic div elements to simulate Card and CardContent for a self-contained example.
// If the user's environment includes shadcn/ui, these imports would be valid.
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

import {
  ArrowRight,
  MessageCircle,
  Facebook,
  GraduationCap,
  BookOpen,
  Sparkles,
  Code,
  Users,
} from "lucide-react"; // Importing icons from lucide-react

// Custom styles for the animations and colors, in addition to Tailwind CSS
const customStyles = `
/* Define custom Tailwind CSS colors */
.bg-crypto-dark-blue { background-color: #0d0d1a; }
.text-crypto-light-purple { color: #d8b4fe; }
.bg-crypto-purple { background-color: #8B5CF6; }
.border-crypto-purple\\/30 { border-color: rgba(139, 92, 246, 0.3); } /* Escaped / for CSS */
.border-crypto-purple\\/40 { border-color: rgba(139, 92, 246, 0.4); } /* Escaped / for CSS */
.bg-crypto-purple\\/10 { background-color: rgba(139, 92, 246, 0.1); } /* Escaped / for CSS */
.bg-crypto-purple\\/20 { background-color: rgba(139, 92, 246, 0.2); } /* Escaped / for CSS */
.bg-crypto-purple\\/80 { background-color: rgba(139, 92, 246, 0.8); } /* Escaped / for CSS */
.from-crypto-purple { --tw-gradient-from: #8B5CF6 var(--tw-gradient-from-position); --tw-gradient-to: rgba(139, 92, 246, 0) var(--tw-gradient-to-position); }
.to-crypto-purple { --tw-gradient-to: #8B5CF6 var(--tw-gradient-to-position); }

.from-crypto-light-purple { --tw-gradient-from: #d8b4fe var(--tw-gradient-from-position); --tw-gradient-to: rgba(216, 180, 254, 0) var(--tw-gradient-to-position); }
.to-crypto-light-purple { --tw-gradient-to: #d8b4fe var(--tw-gradient-to-position); }

/* Keyframes for animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-5px) translateX(5px); }
  50% { transform: translateY(0px) translateX(0px); }
  75% { transform: translateY(5px) translateX(-5px); }
  100% { transform: translateY(0px) translateX(0px); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes glitch {
  0% {
    text-shadow: 2px 2px #d8b4fe, -2px -2px #8B5CF6;
    transform: translate(0);
  }
  20% {
    text-shadow: -2px -2px #d8b4fe, 2px 2px #8B5CF6;
    transform: translate(-2px, 2px);
  }
  40% {
    text-shadow: 2px -2px #d8b4fe, -2px 2px #8B5CF6;
    transform: translate(2px, -2px);
  }
  60% {
    text-shadow: -2px 2px #d8b4fe, 2px -2px #8B5CF6;
    transform: translate(-2px, -2px);
  }
  80% {
    text-shadow: 2px 2px #d8b4fe, -2px -2px #8B5CF6;
    transform: translate(0);
  }
  100% {
    text-shadow: 2px 2px #d8b4fe, -2px -2px #8B5CF6;
    transform: translate(0);
  }
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blinkCaret {
  from, to { border-color: transparent; }
  50% { border-color: #d8b4fe; }
}

/* Apply animations */
.animate-fade-in { animation: fadeIn 1s ease-out forwards; }
.animate-float { animation: float 10s ease-in-out infinite; }
.animate-spin-slow { animation: spinSlow 30s linear infinite; }
.animate-spin-reverse { animation: spinReverse 25s linear infinite; }
.animate-pulse { animation: pulse 2s infinite; }
.glitch { animation: glitch 2s linear infinite alternate; }

.typewriter {
  overflow: hidden; /* Ensures the text is not visible until animated */
  margin: 0 auto; /* Centers the text */
  /* Default for small screens: allow wrapping, no blinking caret, simple fade-in */
  white-space: normal;
  border-right: none;
  animation: fadeIn 1s ease-out forwards;
}

/* For medium screens and up, apply typewriter effect */
@media (min-width: 768px) { /* Changed from max-width to min-width for mobile-first approach */
  .typewriter {
    white-space: nowrap; /* Keeps the content on a single line for typewriter effect */
    border-right: 0.15em solid #d8b4fe; /* The typewriter cursor */
    animation:
      typewriter 2.5s steps(40, end) forwards, /* Added forwards to keep the final state */
      blinkCaret 0.75s step-end infinite;
  }
}


/* Ensure font Inter is used */
body {
  font-family: "Inter", sans-serif;
}
`;

// Component for simulating Card and CardContent if shadcn/ui is not available
const Card = ({ children, className }) => (
  <div className={`rounded-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`${className}`}>{children}</div>
);

const Button = ({ children, className, onClick }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const AboutUS = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Matrix background animation
  useEffect(() => {
    const canvas = document.getElementById(
      "matrix-canvas"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#8B5CF6";
      ctx.font = fontSize + "px arial";

      for (let i = 0; i < drops.length; i++) {
        const text =
          matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    // Handle canvas resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize drops for new dimensions
      // Recalculate columns based on new width
      const newColumns = canvas.width / fontSize;
      drops.length = 0; // Clear existing drops
      for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0"); // Ensure it's visible after animation
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".initially-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Inject custom styles */}
      <style>{customStyles}</style>

      <div className="min-h-screen bg-crypto-dark-blue overflow-hidden relative">
        {/* Matrix Background */}
        <canvas
          id="matrix-canvas"
          className="fixed inset-0 z-0 opacity-20"
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          }}
        />

        {/* Floating particles */}
        <div className="fixed inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-crypto-purple rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className="container max-w-6xl mx-auto pt-16 pb-16 px-4 md:px-0 relative z-10">
          {/* Enhanced Hero Section */}
          <div className="relative min-h-screen flex items-center justify-center">
            {/* Background glow effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
              }}
            />

            {/* Main hero content */}
            <div className="text-center relative z-10 max-w-5xl mx-auto">
              {/* Animated badges */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/40 rounded-full text-sm text-crypto-light-purple animate-pulse">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Discrete Mathematics
                </div>
                <div
                  className="px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/40 rounded-full text-sm text-crypto-light-purple animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Code className="w-4 h-4 inline mr-2" />
                  RSA Encryption
                </div>
                <div
                  className="px-4 py-2 bg-crypto-purple/20 border border-crypto-purple/40 rounded-full text-sm text-crypto-light-purple animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Team Project
                </div>
              </div>
              {/* Logo section with enhanced design */}
              <div className="relative mb-12">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 border border-crypto-purple/20 rounded-full animate-spin-slow"></div>
                  <div className="absolute w-80 h-80 border border-crypto-light-purple/20 rounded-full animate-spin-reverse"></div>
                </div>

                {/* Logo container */}
                <div className="relative flex justify-center items-center gap-8 mb-8">
                  {/* University Logo with enhanced styling */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 scale-110"></div>
                    <div className="relative w-28 h-28 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                      <img
                        src="https://e7.pngegg.com/pngimages/199/395/png-clipart-royal-university-of-phnom-penh-royal-university-of-law-and-economics-institute-of-technology-of-cambodia-university-of-cambodia-phnom-emblem-university.png"
                        alt="RUPP Logo"
                        className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                      />
                      {/* <img
                        src="https://scontent-sin2-1.xx.fbcdn.net/v/t39.30808-6/396717787_804857584773344_3543346762002089097_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=F8A4fQzmXycQ7kNvwEsLt37&_nc_oc=AdlyZW5byTsKH-j6ezkHBxtxShr7ax9ZmLhGWq4SYqwVLHVT17N3_shXtx8Sz4CgXm3wgIEVlgTD2PKFU2b8lMLp&_nc_zt=23&_nc_ht=scontent-sin2-1.xx&_nc_gid=WCfqZv3qmJyhr8vEzq2axg&oh=00_AfPT-MznX1J8uwZB_0zYD8PccNLPiASIp-ICGhqOAgff5Q&oe=686A99CD"
                        alt="RUPP Logo"
                        className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                      /> */}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-crypto-purple/80 rounded-full text-xs text-white font-medium">
                      RUPP
                    </div>
                  </div>

                  {/* Connection line with animation */}
                  <div className="flex items-center">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-crypto-purple via-crypto-light-purple to-crypto-purple animate-pulse"></div>
                    <div className="w-3 h-3 bg-crypto-light-purple rounded-full mx-2 animate-ping"></div>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-crypto-purple via-crypto-light-purple to-crypto-purple animate-pulse"></div>
                  </div>

                  {/* Department Logo with enhanced styling */}
                  {/* Department Logo with same size as RUPP */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500 scale-110"></div>

                    <div className="relative w-28 h-28 bg-gradient-to-br from-crypto-light-purple to-crypto-purple rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                      <img
                        src="/ITE.jpg"
                        alt="ITE Logo"
                        className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                      />
                    </div>

                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-crypto-light-purple/80 rounded-full text-xs text-white font-medium">
                      ITE
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced title with glitch effect */}
              <div className="relative mb-8">
                <h1 className="text-6xl md:text-7xl font-black mb-4 relative">
                  <span
                    className="bg-gradient-to-r from-crypto-purple via-crypto-light-purple to-white text-transparent bg-clip-text animate-fade-in glitch"
                    data-text="Rivest-Shamir-Adleman"
                  >
                    Rivest-Shamir-Adleman
                  </span>
                </h1>
                <div className="absolute inset-0 text-6xl md:text-8xl font-black bg-gradient-to-r from-crypto-purple/30 via-crypto-light-purple/30 to-white/30 text-transparent bg-clip-text animate-pulse blur-sm">
                  {/* Rivest-Shamir-Adleman */}
                </div>
              </div>

              {/* Subtitle with typewriter effect - Adjusted for better responsiveness */}
              <div className="mb-8">
                <p
                  className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="typewriter">
                    A{" "}
                    <span className="text-crypto-light-purple font-semibold">
                      Discrete Mathematics
                    </span>{" "}
                    project by{" "}
                    <span className="text-crypto-purple font-semibold">
                      Information Technology Engineering
                    </span>{" "}
                    students
                  </span>
                </p>
                <p
                  className="text-lg text-gray-400 mt-4 animate-fade-in"
                  style={{ animationDelay: "0.8s" }}
                >
                  Royal University of Phnom Penh • Academic Year 2024–2028
                </p>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <div className="bg-crypto-purple/10 backdrop-blur-md border border-crypto-purple/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 initially-hidden opacity-0">
                  <div className="text-3xl font-bold text-crypto-light-purple mb-2">
                    7
                  </div>
                  <div className="text-sm text-gray-300">Team Members</div>
                </div>
                <div
                  className="bg-crypto-purple/10 backdrop-blur-md border border-crypto-purple/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 initially-hidden opacity-0"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="text-3xl font-bold text-crypto-light-purple mb-2">
                    RSA
                  </div>
                  <div className="text-sm text-gray-300">Encryption Focus</div>
                </div>
                <div
                  className="bg-crypto-purple/10 backdrop-blur-md border border-crypto-purple/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 initially-hidden opacity-0"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="text-3xl font-bold text-crypto-light-purple mb-2">
                    2025
                  </div>
                  <div className="text-sm text-gray-300">Project Year</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-crypto-purple/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-crypto-light-purple rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Rest of the sections remain the same */}
          <section className="mb-16">
            {/* Project Overview */}
            <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  About This Project
                </h2>
                <p className="mb-4 text-gray-300">
                  This RSA encryption educational tool is developed as part of
                  our Discrete Mathematics coursework at the Royal University of
                  Phnom Penh. Our project aims to demonstrate the practical
                  application of mathematical concepts learned in class,
                  specifically focusing on number theory, modular arithmetic,
                  and cryptographic algorithms.
                </p>
                <p className="text-gray-300">
                  Through this interactive web application, we showcase how RSA
                  encryption works using the mathematical principles of prime
                  numbers, Euler's totient function, and modular exponentiation
                  - all key topics covered in our Discrete Mathematics
                  curriculum.
                </p>
              </CardContent>
            </Card>

            {/* University Information */}
            <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple flex items-center gap-3">
                  <GraduationCap className="w-6 h-6" />
                  Our Academic Background
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-crypto-purple/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-crypto-purple">
                      University
                    </h3>
                    <p className="text-gray-300">
                      Royal University of Phnom Penh (RUPP)
                    </p>
                  </div>

                  <div className="border border-crypto-purple/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-crypto-purple">
                      Department
                    </h3>
                    <p className="text-gray-300">
                      Information Technology Engineering
                    </p>
                  </div>

                  <div className="border border-crypto-purple/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-crypto-purple">
                      Subject
                    </h3>
                    <p className="text-gray-300">Discrete Mathematics</p>
                  </div>

                  <div className="border border-crypto-purple/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-crypto-purple">
                      Academic Year
                    </h3>
                    <p className="text-gray-300">2024-2028</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Section */}
            <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-crypto-light-purple text-center">
                  Our Instructor
                </h2>
                <div className="max-w-2xl mx-auto">
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Instructor Photo Placeholder */}
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full flex items-center justify-center flex-shrink-0">
                        {/* <span className="text-3xl font-bold text-white">
                          Prof
                        </span> */}
                        <img
                          src="dist/assets/image/prof.lim seyha.jpg"
                          alt=""
                        />
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-semibold mb-2 text-crypto-light-purple">
                          Lim Seyha
                        </h3>
                        <p className="text-lg text-crypto-purple mb-2">
                          Discrete Mathematics Professor
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                          Royal University of Phnom Penh • Information
                          Technology Engineering Department
                        </p>

                        <p className="text-gray-300 mb-6">
                          Our dedicated instructor guides us through the
                          fascinating world of discrete mathematics, helping us
                          understand complex mathematical concepts and their
                          real-world applications in computer science and
                          information technology.
                        </p>

                        <div className="flex justify-center md:justify-start">
                          <span className="text-sm text-gray-400 italic">
                            Contact information available through university
                            channels
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members Section */}
            <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-crypto-light-purple text-center">
                  Our Members
                </h2>
                <p className="text-center text-gray-400 mb-8">
                  Information Technology Engineering Students - Discrete
                  Mathematics Project Team
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {/* Team Member 1 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S1</span> */}
                      <div className="w-25 h-25 rounded-full overflow-hidden">
                        <img src="dist/assets/image/phanit.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Min Phanith
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">
                      ....................
                    </p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Team Member 2 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S2</span> */}
                      <div className="w-22 h-22 rounded-full overflow-hidden">
                        <img src="dist/assets/image/lang.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Ly Soklang
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">
                      Researcher & Developer
                    </p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Team Member 3 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S3</span> */}
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img src="dist/assets/image/hour.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Ly Hour
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">
                      Researcher & Developer
                    </p>
                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Team Member 4 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S4</span> */}
                      <div className="w-25 h-25 rounded-full overflow-hidden">
                        <img src="dist/assets/image/long.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Borey Penglong
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">
                      Support & Deployer
                    </p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S5</span> */}
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img src="dist/assets/image/nha.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Yom Mongkulphanha
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">Tester</p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Team Member 5 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S6</span> */}
                      <div className="w-25 h-25 rounded-full overflow-hidden">
                        <img src="dist/assets/image/chhnoeum.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Rath Chhnoeum
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">Designer</p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Team Member 6 */}

                  {/* Team Member 7 */}
                  <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                      {/* <span className="text-xl font-bold text-white">S7</span> */}
                      <div className="w-18 h-20 rounded-full overflow-hidden">
                        <img src="dist/assets/image/sing.jpg" alt="" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                      Ly keasing
                    </h3>
                    <p className="text-sm text-crypto-purple mb-1">
                      Documenter
                    </p>

                    <div className="flex justify-center gap-2">
                      <a
                        href="https://t.me/student6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href="https://facebook.com/student6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-crypto-purple/20 hover:bg-crypto-purple/40 rounded-lg transition-colors"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUS;
