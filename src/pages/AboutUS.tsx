import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageCircle,
  Facebook,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const AboutUS = () => {
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

    return () => clearInterval(interval);
  }, []);

  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
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
    <div className="min-h-screen bg-crypto-dark-blue">
      {/* Matrix Background */}
      <canvas
        id="matrix-canvas"
        className="fixed inset-0 z-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      />

      <div className="container max-w-4xl mx-auto pt-32 pb-16 px-4 md:px-0 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-6 mb-8">
            {/* University Logo Placeholder */}
            <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full flex items-center justify-center">
              <img
                src="https://e7.pngegg.com/pngimages/199/395/png-clipart-royal-university-of-phnom-penh-royal-university-of-law-and-economics-institute-of-technology-of-cambodia-university-of-cambodia-phnom-emblem-university.png"
                alt="RUPP Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>

            {/* Department Logo Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-crypto-light-purple to-crypto-purple rounded-lg flex items-center justify-center">
              <img
                src="https://scontent.fpnh11-1.fna.fbcdn.net/v/t39.30808-6/396717787_804857584773344_3543346762002089097_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEE5DUkaE__K3m43b9uYyr9aAXk4Hk-pnNoBeTgeT6mc3vQ5YGEMCFvO_cD5dYsdVEXK-fUeAipIQJXnNKtWQo6&_nc_ohc=FmhBZsdAOW0Q7kNvwHzPJ0q&_nc_oc=AdlxBOdrLTSduFCVxKm9P2q3kvkp4bvVqcPEY0QP6eqrgTNY6Wup_xsaCxhyHWH2BjE&_nc_zt=23&_nc_ht=scontent.fpnh11-1.fna&_nc_gid=HOuMrUm1J1W2Xjo7xBtGPg&oh=00_AfPdYeslfWwF3Vy5sw2dvtsdDf9gzu9eN3INB8SIBFwezw&oe=68615F4D"
                alt="ITELogo"
                className="w-16 h-16 rounded-lg object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-light-purple text-transparent bg-clip-text animate-fade-in">
            About Our RSA Project
          </h1>
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            A Discrete Mathematics project by Information Technology Engineering
            students from Royal University of Phnom Penh
          </p>
        </div>

        <section className="mb-16">
          {/* Project Overview */}
          <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                About This Project
              </h2>
              <p className="mb-4 text-gray-300">
                This RSA encryption educational tool is developed as part of our
                Discrete Mathematics coursework at the Royal University of Phnom
                Penh. Our project aims to demonstrate the practical application
                of mathematical concepts learned in class, specifically focusing
                on number theory, modular arithmetic, and cryptographic
                algorithms.
              </p>
              <p className="text-gray-300">
                Through this interactive web application, we showcase how RSA
                encryption works using the mathematical principles of prime
                numbers, Euler's totient function, and modular exponentiation -
                all key topics covered in our Discrete Mathematics curriculum.
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
                    <div className="w-32 h-32 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full flex items-center justify-center flex-shrink-0">
                      {/* Replace this div with: <img src="/path-to-instructor-photo.jpg" alt="Instructor Photo" className="w-32 h-32 rounded-full object-cover" /> */}
                      <span className="text-3xl font-bold text-white">
                        Prof
                      </span>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-semibold mb-2 text-crypto-light-purple">
                        Lim Seyha
                      </h3>
                      <p className="text-lg text-crypto-purple mb-2">
                        Discrete Mathematics Professor
                      </p>
                      <p className="text-sm text-gray-300 mb-4">
                        Royal University of Phnom Penh • Information Technology
                        Engineering Department
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
                Our Project Team
              </h2>
              <p className="text-center text-gray-400 mb-8">
                Information Technology Engineering Students - Discrete
                Mathematics Project Team
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Team Member 1 - Replace with your real info */}
                <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Replace this div with: <img src="/path-to-student1-photo.jpg" alt="Student 1" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S1</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                    Ly Soklang
                  </h3>
                  <p className="text-sm text-crypto-purple mb-1">Team Leader</p>

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
                    {/* Replace this div with: <img src="/path-to-student2-photo.jpg" alt="Student 2" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S2</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                    Min Phanith
                  </h3>
                  <p className="text-sm text-crypto-purple mb-1">Developer</p>

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
                    {/* Replace this div with: <img src="/path-to-student3-photo.jpg" alt="Student 3" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S3</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                    Ly Hour
                  </h3>
                  <p className="text-sm text-crypto-purple mb-1">Researcher</p>
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
                    {/* Replace this div with: <img src="/path-to-student4-photo.jpg" alt="Student 4" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S4</span>
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

                {/* Team Member 5 */}
                <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Replace this div with: <img src="/path-to-student5-photo.jpg" alt="Student 5" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S5</span>
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

                {/* Team Member 6 */}
                <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Replace this div with: <img src="/path-to-student6-photo.jpg" alt="Student 6" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S6</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                    Borey Penglong
                  </h3>
                  <p className="text-sm text-crypto-purple mb-1">
                    Documentation
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

                {/* Team Member 7 */}
                <div className="bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 border border-crypto-purple/40 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-crypto-purple to-crypto-light-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                    {/* Replace this div with: <img src="/path-to-student7-photo.jpg" alt="Student 7" className="w-20 h-20 rounded-full object-cover" /> */}
                    <span className="text-xl font-bold text-white">S7</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-crypto-light-purple">
                    Ly Keasing
                  </h3>
                  <p className="text-sm text-crypto-purple mb-1">Support</p>

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
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Our collaborative team effort demonstrates the practical
                  application of discrete mathematics in cryptography.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple">
                Learning Objectives
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">
                    Mathematical Foundation
                  </h3>
                  <p className="text-gray-300">
                    Understanding prime numbers, modular arithmetic, and Euler's
                    totient function in cryptography.
                  </p>
                </div>

                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">
                    Algorithm Implementation
                  </h3>
                  <p className="text-gray-300">
                    Implementing RSA key generation, encryption, and decryption
                    algorithms using discrete math principles.
                  </p>
                </div>

                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">
                    Security Analysis
                  </h3>
                  <p className="text-gray-300">
                    Analyzing the mathematical security of RSA based on the
                    difficulty of prime factorization.
                  </p>
                </div>

                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">
                    Practical Application
                  </h3>
                  <p className="text-gray-300">
                    Creating an interactive tool to demonstrate real-world
                    applications of discrete mathematics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-16 initially-hidden opacity-0">
            <h2 className="text-2xl font-semibold mb-8">
              Experience Our RSA Implementation
            </h2>
            <Button className="bg-gradient-to-r from-crypto-purple to-crypto-light-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg">
              Try RSA Encryption Tool <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .initially-hidden {
          transition: all 0.8s ease-out;
        }
        
        .crypto-dark-blue {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
        }
        
        .crypto-purple {
          color: #8B5CF6;
        }
        
        .crypto-light-purple {
          color: #A78BFA;
        }
      `}</style>
    </div>
  );
};

export default AboutUS;
