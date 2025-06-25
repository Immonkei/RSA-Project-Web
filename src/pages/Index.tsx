
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MatrixBackground from '@/components/MatrixBackground';
import EncryptionCard from '@/components/EncryptionCard';
import { ArrowRightIcon, LockIcon, UnlockIcon, KeyIcon } from 'lucide-react';

const Index = () => {
  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.initially-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      title: "Encrypt Messages",
      description: "Transform your text into secure ciphertext using RSA encryption algorithm",
      icon: <LockIcon className="h-8 w-8 text-white" />,
      ctaText: "Try Encryption",
      ctaLink: "/service"
    },
    {
      title: "Generate Keys",
      description: "Create your own public and private key pairs for secure communication",
      icon: <KeyIcon className="h-8 w-8 text-white" />,
      ctaText: "Generate Keys",
      ctaLink: "/service"
    },
    {
      title: "Decrypt Messages",
      description: "Decode encrypted messages with your private key to reveal the original text",
      icon: <UnlockIcon className="h-8 w-8 text-white" />,
      ctaText: "Try Decryption",
      ctaLink: "/service"
    },
  ];

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      
      {/* Hero section */}
      <section className="pt-32 pb-16 px-4 md:px-0">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-light-purple text-transparent bg-clip-text opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Secure Your Messages with RSA Encryption
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              CipherVerse provides powerful RSA encryption tools to protect your sensitive information
              with mathematical security that's trusted worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Button asChild className="bg-gradient-to-r from-crypto-purple to-crypto-light-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                <Link to="/service" className="px-8 py-6 text-lg">
                  Try Encryption <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-crypto-purple hover:bg-crypto-purple/20 transition-all duration-300">
                <Link to="/about" className="px-8 py-6 text-lg">
                  Learn About RSA
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Visual element */}
          <div className="relative max-w-2xl mx-auto mt-16 mb-32 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-crypto-purple/20 to-crypto-light-purple/20 rounded-xl blur-3xl"></div>
            <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden">
              <CardContent className="p-6">
                <pre className="text-xs md:text-sm text-crypto-light-purple/70 font-mono overflow-x-auto invisible-scrollbar">
                  <code>
                    {`// RSA Encryption Example\n
const message = "Hello, secure world!";\n
// Generate key pair\nconst { publicKey, privateKey } = await generateRSAKeyPair();\n
// Encrypt the message\nconst encrypted = encrypt(message, publicKey);\nconsole.log("Encrypted:", encrypted);\n
// Decrypt the message\nconst decrypted = decrypt(encrypted, privateKey);\nconsole.log("Decrypted:", decrypted); // "Hello, secure world!"`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
          
          {/* Features section */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center initially-hidden opacity-0">Explore Encryption Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="initially-hidden opacity-0" style={{ animationDelay: `${0.3 * (index + 1)}s` }}>
                <EncryptionCard 
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  ctaText={feature.ctaText}
                  ctaLink={feature.ctaLink}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-crypto-purple/20 bg-crypto-dark-blue/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2025 CipherVerse. Educational purposes only.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link to="/" className="text-sm text-gray-400 hover:text-crypto-purple">Home</Link>
              <Link to="/about" className="text-sm text-gray-400 hover:text-crypto-purple">About</Link>
              <Link to="/service" className="text-sm text-gray-400 hover:text-crypto-purple">Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
