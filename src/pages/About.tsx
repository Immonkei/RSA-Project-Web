import React, { useEffect } from 'react';
import MatrixBackground from '@/components/MatrixBackground';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      
      <div className="container max-w-4xl mx-auto pt-32 pb-16 px-4 md:px-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-light-purple text-transparent bg-clip-text animate-fade-in">
            Understanding RSA Encryption
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Learn how RSA encryption works and why it's one of the most widely used cryptographic algorithms in the world.
          </p>
        </div>
        
        <section className="mb-16">
          <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple">What is RSA Encryption?</h2>
              <p className="mb-4">
                RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem that is widely used for secure data transmission. 
                It is named after its inventors: Ron Rivest, Adi Shamir, and Leonard Adleman, who introduced it in 1977.
              </p>
              <p>
                As an asymmetric encryption algorithm, RSA uses a pair of keys: a public key for encryption which can be freely shared, 
                and a private key for decryption which must be kept secret. This approach allows secure communication without 
                the need to exchange secret keys beforehand.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple">The Mathematics Behind RSA</h2>
              <p className="mb-4">
                RSA's security rests on the mathematical difficulty of factoring the product of two large prime numbers.
                The steps to generate RSA keys are:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 mb-6">
                <li>Select two large prime numbers, <span className="font-mono">p</span> and <span className="font-mono">q</span></li>
                <li>Compute <span className="font-mono">n = p × q</span> (the modulus)</li>
                <li>Compute <span className="font-mono">φ(n) = (p-1) × (q-1)</span> (Euler's totient function)</li>
                <li>Choose an integer <span className="font-mono">e</span> such that <span className="font-mono">1 &#60; e &#60; φ(n)</span> and <span className="font-mono">gcd(e, φ(n)) = 1</span></li>
                <li>Compute <span className="font-mono">d</span> such that <span className="font-mono">d × e ≡ 1 (mod φ(n))</span></li>
              </ol>
              
              <p className="mb-2">
                The public key consists of <span className="font-mono">(n, e)</span>, and the private key includes <span className="font-mono">d</span>.
              </p>
              
              <p>
                For encryption, if <span className="font-mono">m</span> is the message, the ciphertext <span className="font-mono">c</span> is computed as:
                <span className="block font-mono text-center my-4 text-crypto-light-purple">c = m<sup>e</sup> mod n</span>
                
                For decryption, the original message is recovered with:
                <span className="block font-mono text-center my-4 text-crypto-light-purple">m = c<sup>d</sup> mod n</span>
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 initially-hidden opacity-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 text-crypto-light-purple">Use Cases for RSA</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">Secure Communications</h3>
                  <p>RSA is used in secure email, secure messaging, and secure communications protocols to protect sensitive information during transmission.</p>
                </div>
                
                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">Digital Signatures</h3>
                  <p>RSA allows the creation of digital signatures which verify the authenticity and integrity of digital messages or documents.</p>
                </div>
                
                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">Certificate Authorities</h3>
                  <p>RSA is fundamental to how HTTPS certificates work, verifying the identity of websites and establishing encrypted connections.</p>
                </div>
                
                <div className="border border-crypto-purple/30 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-crypto-purple">Key Exchange</h3>
                  <p>RSA can be used to securely exchange symmetric encryption keys, which are then used for faster bulk encryption of data.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mb-16 initially-hidden opacity-0">
            <h2 className="text-2xl font-semibold mb-8">Ready to try RSA encryption yourself?</h2>
            <Button asChild className="bg-gradient-to-r from-crypto-purple to-crypto-light-purple hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              <Link to="/service" className="px-8 py-6 text-lg">
                Try our RSA Tool <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      
      
    </div>
  );
};

export default About;