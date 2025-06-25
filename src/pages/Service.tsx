
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MatrixBackground from '@/components/MatrixBackground';
import { generateKeyPair, encrypt, decrypt } from '@/utils/rsa';
import { RefreshCcwIcon, LockIcon, UnlockIcon, LoaderIcon, CopyIcon, CheckIcon } from 'lucide-react';

interface KeyPair {
  n: bigint;
  e: bigint;
  d: bigint;
  p: bigint;
  q: bigint;
}

const Service = () => {
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptInput, setDecryptInput] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [keyStrength, setKeyStrength] = useState<number>(256);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerateKeys = async () => {
    setIsGeneratingKeys(true);
    try {
      // Using setTimeout to allow the UI to update before the expensive calculation
      setTimeout(() => {
        const newKeyPair = generateKeyPair(keyStrength);
        setKeyPair(newKeyPair);
        setIsGeneratingKeys(false);
        toast({
          title: "Keys Generated",
          description: "Your RSA key pair has been successfully generated",
          variant: "default",
        });
      }, 500);
    } catch (error) {
      console.error("Error generating keys:", error);
      setIsGeneratingKeys(false);
      toast({
        title: "Error",
        description: "Failed to generate keys. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEncrypt = () => {
    if (!plaintext) {
      toast({
        title: "Error",
        description: "Please enter text to encrypt",
        variant: "destructive",
      });
      document.getElementById('plaintextInput')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('plaintextInput')?.classList.remove('animate-shake');
      }, 500);
      return;
    }

    if (!keyPair) {
      toast({
        title: "Error",
        description: "Please generate RSA keys first",
        variant: "destructive",
      });
      return;
    }

    setIsEncrypting(true);
    try {
      setTimeout(() => {
        const result = encrypt(plaintext, keyPair.n, keyPair.e);
        setCiphertext(result);
        setIsEncrypting(false);
        toast({
          title: "Encryption Complete",
          description: "Your message has been encrypted",
          variant: "default",
        });
      }, 800);
    } catch (error) {
      console.error("Encryption error:", error);
      setIsEncrypting(false);
      toast({
        title: "Encryption Failed",
        description: "Could not encrypt the message. Check your input.",
        variant: "destructive",
      });
    }
  };

  const handleDecrypt = () => {
    if (!decryptInput) {
      toast({
        title: "Error",
        description: "Please enter ciphertext to decrypt",
        variant: "destructive",
      });
      document.getElementById('decryptInput')?.classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('decryptInput')?.classList.remove('animate-shake');
      }, 500);
      return;
    }

    if (!keyPair) {
      toast({
        title: "Error",
        description: "Please generate RSA keys first",
        variant: "destructive",
      });
      return;
    }

    setIsDecrypting(true);
    try {
      setTimeout(() => {
        const result = decrypt(decryptInput, keyPair.n, keyPair.d);
        setDecryptedText(result);
        setIsDecrypting(false);
        toast({
          title: "Decryption Complete",
          description: "Your message has been decrypted",
          variant: "default",
        });
      }, 800);
    } catch (error) {
      console.error("Decryption error:", error);
      setIsDecrypting(false);
      toast({
        title: "Decryption Failed",
        description: "Could not decrypt the message. Check your input.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setKeyPair(null);
    setPlaintext('');
    setCiphertext('');
    setDecryptInput('');
    setDecryptedText('');
    toast({
      title: "Cleared",
      description: "All inputs and outputs have been cleared",
      variant: "default",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
        variant: "default",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

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
      
      <div className="container max-w-5xl mx-auto pt-32 pb-16 px-4 md:px-0">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-light-purple text-transparent bg-clip-text animate-fade-in">
            RSA Encryption Tool
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Generate keys, encrypt and decrypt messages using RSA algorithm.
          </p>
          <div className="mt-4 p-2 bg-yellow-900/40 border border-yellow-600/30 rounded-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-yellow-200 text-sm">
              ⚠️ This is a demonstration tool for educational purposes only. 
              Do not use for real-world secure communication.
            </p>
          </div>
        </div>
        
        <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md overflow-hidden mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-crypto-purple to-crypto-light-purple flex items-center justify-center mr-3">
                <RefreshCcwIcon className="h-4 w-4 text-white" />
              </div>
              Key Generation
            </CardTitle>
            <CardDescription>
              Generate RSA public and private key pairs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Key Strength (bits)</label>
                <div className="flex space-x-4">
                  {[256, 512, 1024].map((bits) => (
                    <Button 
                      key={bits} 
                      variant={keyStrength === bits ? "default" : "outline"}
                      className={
                        keyStrength === bits 
                          ? "bg-crypto-purple hover:bg-crypto-purple/90" 
                          : "hover:bg-crypto-purple/20"
                      }
                      onClick={() => setKeyStrength(bits)}
                    >
                      {bits}
                    </Button>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Note: Higher bit values will take longer to generate but provide stronger encryption.
                </p>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-crypto-purple to-crypto-light-purple hover:opacity-90"
                onClick={handleGenerateKeys}
                disabled={isGeneratingKeys}
              >
                {isGeneratingKeys ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Generating Keys...
                  </>
                ) : (
                  <>Generate RSA Keys</>
                )}
              </Button>
            </div>
            
            {keyPair && (
              <div className="mt-6 space-y-4 opacity-0 animate-slide-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/20 p-4 rounded-lg border border-crypto-purple/20">
                    <h3 className="text-sm font-medium mb-1 text-crypto-light-purple">Public Key</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-400">Modulus (n):</span>
                        <p className="font-mono text-xs break-all">{keyPair.n.toString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Public Exponent (e):</span>
                        <p className="font-mono text-xs">{keyPair.e.toString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg border border-crypto-purple/20">
                    <h3 className="text-sm font-medium mb-1 text-crypto-light-purple">Private Key</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-400">Private Exponent (d):</span>
                        <p className="font-mono text-xs break-all">{keyPair.d.toString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400">
                  In practice, the private key should be kept secret while the public key can be shared.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mb-8 mt-12 initially-hidden opacity-0">
          <Tabs defaultValue="encrypt">
            <TabsList className="w-full bg-muted/20 border-b border-crypto-purple/30">
              <TabsTrigger 
                value="encrypt" 
                className="flex-1 data-[state=active]:bg-crypto-purple/20 data-[state=active]:text-crypto-light-purple"
              >
                <LockIcon className="h-4 w-4 mr-2" />
                Encrypt
              </TabsTrigger>
              <TabsTrigger 
                value="decrypt" 
                className="flex-1 data-[state=active]:bg-crypto-purple/20 data-[state=active]:text-crypto-light-purple"
              >
                <UnlockIcon className="h-4 w-4 mr-2" />
                Decrypt
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="encrypt" className="mt-4">
              <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Text Encryption</CardTitle>
                  <CardDescription>
                    Encrypt your message using the generated public key
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Message to Encrypt</label>
                    <Textarea 
                      id="plaintextInput"
                      placeholder="Enter your message here..."
                      className="bg-muted/20 border-crypto-purple/20 focus:border-crypto-purple placeholder:text-gray-500"
                      value={plaintext}
                      onChange={(e) => setPlaintext(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-crypto-purple hover:bg-crypto-purple/90"
                    disabled={isEncrypting || !keyPair}
                    onClick={handleEncrypt}
                  >
                    {isEncrypting ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Encrypting...
                      </>
                    ) : (
                      <>
                        <LockIcon className="mr-2 h-4 w-4" />
                        Encrypt Message
                      </>
                    )}
                  </Button>
                  
                  {ciphertext && (
                    <div className="mt-4 animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-300">Encrypted Message</label>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 border-crypto-purple/20 hover:bg-crypto-purple/20"
                          onClick={() => copyToClipboard(ciphertext)}
                        >
                          {copied ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                          <span className="ml-1">Copy</span>
                        </Button>
                      </div>
                      <div className="bg-muted/20 p-4 rounded-lg border border-crypto-purple/20">
                        <p className="font-mono text-xs break-all">{ciphertext}</p>
                      </div>
                      <p className="mt-2 text-xs text-gray-400">
                        This encrypted message can only be decrypted with the corresponding private key. 
                        <strong> Make sure to copy the entire text</strong> when moving to decrypt.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="decrypt" className="mt-4">
              <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Text Decryption</CardTitle>
                  <CardDescription>
                    Decrypt a message using the generated private key
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Encrypted Message</label>
                    <Textarea 
                      id="decryptInput"
                      placeholder="Enter encrypted text (comma-separated numbers)..."
                      className="bg-muted/20 border-crypto-purple/20 focus:border-crypto-purple placeholder:text-gray-500"
                      value={decryptInput}
                      onChange={(e) => setDecryptInput(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Paste the exact encrypted message - it should be a series of numbers separated by commas.
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-crypto-purple hover:bg-crypto-purple/90"
                    disabled={isDecrypting || !keyPair}
                    onClick={handleDecrypt}
                  >
                    {isDecrypting ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Decrypting...
                      </>
                    ) : (
                      <>
                        <UnlockIcon className="mr-2 h-4 w-4" />
                        Decrypt Message
                      </>
                    )}
                  </Button>
                  
                  {decryptedText && (
                    <div className="mt-4 animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-300">Decrypted Message</label>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 border-crypto-purple/20 hover:bg-crypto-purple/20"
                          onClick={() => copyToClipboard(decryptedText)}
                        >
                          {copied ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                          <span className="ml-1">Copy</span>
                        </Button>
                      </div>
                      <div className="bg-muted/20 p-4 rounded-lg border border-crypto-purple/20">
                        <p className="break-all">{decryptedText}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-center mt-8 initially-hidden opacity-0">
          <Button 
            variant="outline" 
            className="border-crypto-purple/30 hover:bg-crypto-purple/20 transition-all duration-300"
            onClick={handleClear}
          >
            Clear All Data
          </Button>
        </div>
        
        <Card className="bg-muted/10 border-crypto-purple/30 backdrop-blur-md mt-16 initially-hidden opacity-0">
          <CardHeader>
            <CardTitle className="text-xl">How to Use This Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-3">
              <li className="text-gray-300">
                <span className="font-medium text-crypto-light-purple">Generate Keys: </span> 
                Start by creating RSA key pair using the "Generate RSA Keys" button at the top
              </li>
              <li className="text-gray-300">
                <span className="font-medium text-crypto-light-purple">Encrypt: </span> 
                Enter your message in the "Encrypt" tab and click the "Encrypt Message" button
              </li>
              <li className="text-gray-300">
                <span className="font-medium text-crypto-light-purple">Decrypt: </span> 
                Copy the encrypted text to the "Decrypt" tab and click "Decrypt Message"
              </li>
              <li className="text-gray-300">
                <span className="font-medium text-crypto-light-purple">Clear: </span> 
                Use the "Clear All Data" button to reset everything and start fresh
              </li>
            </ol>
          </CardContent>
          <CardFooter className="border-t border-crypto-purple/20 pt-4">
            <p className="text-sm text-gray-400">
              Note: This tool uses client-side JavaScript to perform RSA operations and does not send your data to any server.
            </p>
          </CardFooter>
        </Card>
      </div>
      
      
    </div>
  );
};

export default Service;
