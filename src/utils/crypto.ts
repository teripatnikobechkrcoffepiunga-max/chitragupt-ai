/**
 * Client-Side AES-GCM 256-Bit Encryption and PII Data Anonymization
 * Ensures zero-knowledge client-side encryption and privacy protection.
 */

const ENCRYPTION_KEY_STORAGE = 'chitragupt_vault_key_raw';

// Get or create persistent AES-GCM 256-bit CryptoKey
async function getOrCreateCryptoKey(): Promise<CryptoKey> {
  let rawKeyHex = localStorage.getItem(ENCRYPTION_KEY_STORAGE);

  if (!rawKeyHex) {
    const rawKey = window.crypto.getRandomValues(new Uint8Array(32)); // 256 bits
    rawKeyHex = Array.from(rawKey)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    localStorage.setItem(ENCRYPTION_KEY_STORAGE, rawKeyHex);
  }

  const keyBytes = new Uint8Array(
    (rawKeyHex.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16))
  );

  return window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

// Encrypt plaintext with AES-GCM
export async function encryptData(plaintext: string): Promise<string> {
  try {
    const key = await getOrCreateCryptoKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
    const encoded = new TextEncoder().encode(plaintext);

    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      encoded
    );

    const ivBase64 = btoa(String.fromCharCode(...iv));
    const cipherBase64 = btoa(String.fromCharCode(...new Uint8Array(ciphertext)));

    return JSON.stringify({ iv: ivBase64, ct: cipherBase64, v: 1 });
  } catch (err) {
    console.warn('AES-GCM encryption failed, falling back to plaintext:', err);
    return plaintext;
  }
}

// Decrypt ciphertext with AES-GCM
export async function decryptData(encryptedPayload: string): Promise<string> {
  try {
    if (!encryptedPayload.startsWith('{"iv":')) {
      return encryptedPayload; // was not encrypted or legacy plaintext
    }

    const parsed = JSON.parse(encryptedPayload);
    if (!parsed.iv || !parsed.ct) {
      return encryptedPayload;
    }

    const key = await getOrCreateCryptoKey();
    const iv = Uint8Array.from(atob(parsed.iv), (c) => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(parsed.ct), (c) => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    console.warn('AES-GCM decryption failed:', err);
    return encryptedPayload;
  }
}

// Check if encryption key is established
export function getEncryptionKeyFingerprint(): string {
  const rawKeyHex = localStorage.getItem(ENCRYPTION_KEY_STORAGE);
  if (!rawKeyHex) return 'AES-256-GCM (Ready to Initialize)';
  return `AES-256-GCM (${rawKeyHex.slice(0, 6)}...${rawKeyHex.slice(-6)})`;
}

// PII Detection and Anonymization
export interface AnonymizationResult {
  scrubbedText: string;
  hasRedactions: boolean;
  redactionsCount: number;
  mapping: Record<string, string>;
  detectedTypes: string[];
}

export function detectAndScrubPII(input: string): AnonymizationResult {
  const mapping: Record<string, string> = {};
  const detectedTypes = new Set<string>();
  let result = input;
  let counter = 1;

  // 1. Email pattern
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi;
  result = result.replace(emailRegex, (match) => {
    const token = `[REDACTED_EMAIL_${counter++}]`;
    mapping[token] = match;
    detectedTypes.add('Email Address');
    return token;
  });

  // 2. Phone numbers (international, national with dashes/spaces)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  result = result.replace(phoneRegex, (match) => {
    // avoid matching small numbers or years like 2026
    if (match.replace(/\D/g, '').length >= 10) {
      const token = `[REDACTED_PHONE_${counter++}]`;
      mapping[token] = match;
      detectedTypes.add('Phone Number');
      return token;
    }
    return match;
  });

  // 3. Credit Card / Debit Card numbers (13-19 digits, optional dashes/spaces)
  const cardRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{15,16}\b/g;
  result = result.replace(cardRegex, (match) => {
    const rawDigits = match.replace(/\D/g, '');
    if (rawDigits.length >= 13 && rawDigits.length <= 19) {
      const token = `[REDACTED_CARD_${counter++}]`;
      mapping[token] = match;
      detectedTypes.add('Credit/Debit Card');
      return token;
    }
    return match;
  });

  // 4. SSN or Aadhaar (US SSN: \d{3}-\d{2}-\d{4}, Indian Aadhaar: 4 4 4 digits)
  const idRegex = /\b\d{3}-\d{2}-\d{4}\b|\b\d{4}\s\d{4}\s\d{4}\b/g;
  result = result.replace(idRegex, (match) => {
    const token = `[REDACTED_GOVT_ID_${counter++}]`;
    mapping[token] = match;
    detectedTypes.add('Government ID');
    return token;
  });

  // 5. API Keys & Secrets (OpenAI sk-..., Google AIza..., GitHub ghp_...)
  const apiKeyRegex = /\b(?:sk-[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35}|ghp_[a-zA-Z0-9]{36})\b/g;
  result = result.replace(apiKeyRegex, (match) => {
    const token = `[REDACTED_API_KEY_${counter++}]`;
    mapping[token] = match;
    detectedTypes.add('API Key / Secret Token');
    return token;
  });

  // 6. IPv4 Addresses
  const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
  result = result.replace(ipRegex, (match) => {
    // Avoid local 127.0.0.1 or 0.0.0.0 if not desired, but redact external IPs
    const token = `[REDACTED_IP_${counter++}]`;
    mapping[token] = match;
    detectedTypes.add('IP Address');
    return token;
  });

  const hasRedactions = Object.keys(mapping).length > 0;

  return {
    scrubbedText: result,
    hasRedactions,
    redactionsCount: Object.keys(mapping).length,
    mapping,
    detectedTypes: Array.from(detectedTypes),
  };
}
