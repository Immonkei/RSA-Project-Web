// RSA encryption/decryption utility functions

/**
 * Find the greatest common divisor (GCD) of two numbers
 */
const gcd = (a: bigint, b: bigint): bigint => {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
};

/**
 * Extended Euclidean Algorithm to find modular inverse
 */
const modInverse = (a: bigint, m: bigint): bigint => {
  if (m === 1n) return 0n;
  
  let m0 = m;
  let y = 0n;
  let x = 1n;
  
  while (a > 1n) {
    // q is quotient
    const q = a / m;
    let t = m;
    
    // m is remainder now, process same as Euclid's algorithm
    m = a % m;
    a = t;
    t = y;
    
    // Update y and x
    y = x - q * y;
    x = t;
  }
  
  // Make x positive
  if (x < 0n) x += m0;
  
  return x;
};

/**
 * Primality test using Miller-Rabin test
 * This is a probabilistic test but sufficient for our demo
 */
const isPrime = (n: bigint, k = 10): boolean => {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n) return false;
  
  // Write n-1 as 2^r * d
  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    r += 1n;
    d /= 2n;
  }
  
  // Witness loop
  for (let i = 0; i < k; i++) {
    // Random in [2, n-2]
    const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));
    let x = powerMod(a, d, n);
    
    if (x === 1n || x === n - 1n) continue;
    
    let j = 0n;
    while (j < r) {
      x = (x * x) % n;
      if (x === n - 1n) break;
      j += 1n;
    }
    
    if (j === r) return false;
  }
  
  return true;
};

/**
 * Modular exponentiation: computes (base^exponent) % modulus efficiently
 */
const powerMod = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
  if (modulus === 1n) return 0n;
  
  let result = 1n;
  base = base % modulus;
  
  while (exponent > 0n) {
    // If exponent is odd, multiply result with base
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    
    // Exponent must be even now
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  
  return result;
};

/**
 * Generate a random prime of the specified bit length
 */
const generateRandomPrime = (bits: number): bigint => {
  const min = 1n << BigInt(bits - 1); // 2^(bits-1)
  const max = (1n << BigInt(bits)) - 1n; // 2^bits - 1
  
  while (true) {
    // Generate a random odd number in the range
    const range = Number(max - min + 1n);
    let rand = min + BigInt(Math.floor(Math.random() * range));
    rand |= 1n; // Make odd
    
    if (isPrime(rand)) {
      return rand;
    }
  }
};

/**
 * Generate RSA key pair
 */
export const generateKeyPair = (bits: number = 256): { n: bigint, e: bigint, d: bigint, p: bigint, q: bigint } => {
  // For demo purposes, we'll use smaller bit lengths for p and q
  const halfBits = Math.floor(bits / 2);
  let p = generateRandomPrime(halfBits);
  let q = generateRandomPrime(halfBits);
  
  // Ensure p and q are different
  while (p === q) {
    q = generateRandomPrime(halfBits);
  }
  
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  
  // Common value for e
  let e = 65537n;
  
  // Ensure e is coprime to phi
  while (gcd(e, phi) !== 1n) {
    e += 2n;
  }
  
  // Calculate d as the modular multiplicative inverse of e modulo phi
  const d = modInverse(e, phi);
  
  return {
    n,
    e,
    d,
    p,
    q
  };
};

/**
 * Convert text to an array of numbers for RSA encryption
 * Using a more robust encoding approach with Base64
 */
const textToNumber = (text: string): bigint[] => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const chunkSize = 2; // Process 2 bytes at a time for better efficiency
  const numbers: bigint[] = [];
  
  for (let i = 0; i < bytes.length; i += chunkSize) {
    let value = 0;
    // Combine bytes into a single number (little-endian)
    for (let j = 0; j < chunkSize && i + j < bytes.length; j++) {
      value |= bytes[i + j] << (j * 8);
    }
    numbers.push(BigInt(value));
  }
  
  return numbers;
};

/**
 * Convert numbers back to text using the same encoding approach
 */
const numberToText = (numbers: bigint[]): string => {
  const bytes = new Uint8Array(numbers.length * 2); // Allocate space for all possible bytes
  let byteIndex = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    const value = Number(numbers[i]);
    // Extract original bytes (little-endian)
    bytes[byteIndex++] = value & 0xFF;
    if (byteIndex < bytes.length) {
      bytes[byteIndex++] = (value >> 8) & 0xFF;
    }
  }
  
  // Trim any trailing zeros
  let actualLength = byteIndex;
  while (actualLength > 0 && bytes[actualLength - 1] === 0) {
    actualLength--;
  }
  
  const decoder = new TextDecoder();
  return decoder.decode(bytes.slice(0, actualLength));
};

/**
 * Encrypt a message using RSA public key
 * Returns a numeric representation that can be safely stored as a string
 */
export const encrypt = (message: string, n: bigint, e: bigint): string => {
  try {
    const numbers = textToNumber(message);
    const encryptedNumbers = numbers.map(m => powerMod(m, e, n));
    
    // Convert encrypted numbers to a comma-separated string for display
    return encryptedNumbers.map(num => num.toString()).join(',');
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
};

/**
 * Decrypt a message using RSA private key
 * Expects a comma-separated string of numeric values
 */
export const decrypt = (encryptedMessage: string, n: bigint, d: bigint): string => {
  try {
    // Split by commas and ensure we're only processing valid numbers
    const encryptedNumbers = encryptedMessage.split(',')
      .filter(str => /^\d+$/.test(str.trim()))
      .map(num => BigInt(num.trim()));
    
    if (encryptedNumbers.length === 0) {
      throw new Error("No valid encrypted numbers found in input");
    }
    
    const decryptedNumbers = encryptedNumbers.map(c => powerMod(c, d, n));
    
    return numberToText(decryptedNumbers);
  } catch (error) {
    console.error('Decryption error:', error);
    return 'Error: Invalid encrypted message format. Please make sure to use the exact encrypted output.';
  }
};

export const formatBigInt = (value: bigint): string => {
  const valueStr = value.toString();
  if (valueStr.length <= 12) {
    return valueStr;
  }
  return `${valueStr.substring(0, 8)}...${valueStr.substring(valueStr.length - 8)}`;
};
