/**
 * obfuscate.ts
 * --------------------------------------------------------------
 * Not real encryption — a determined user with devtools can still
 * reverse this, same as any client-evaluated cipher. The goal is
 * narrower: stop the JSON datasets from being readable by casually
 * opening the Network tab or viewing response payloads as plain
 * text, and keep them out of the client JS bundle entirely (they
 * never leave the server except through this route).
 *
 * Algorithm: per-request random salt + rotating XOR keystream
 * derived from the salt, then base64. The salt travels with the
 * payload so the client can derive the same keystream — this is
 * obfuscation, not confidentiality.
 */

const SALT_LENGTH = 8;

const toBytes = (input: string): Uint8Array => new TextEncoder().encode(input);
const fromBytes = (bytes: Uint8Array): string =>
  new TextDecoder().decode(bytes);

const randomSalt = (): Uint8Array => {
  const salt = new Uint8Array(SALT_LENGTH);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(salt);
  } else {
    for (let i = 0; i < SALT_LENGTH; i++)
      salt[i] = Math.floor(Math.random() * 256);
  }
  return salt;
};

/** Derives a repeating keystream byte for position `i` from the salt. */
const keyAt = (salt: Uint8Array, i: number): number => {
  const s = salt[i % salt.length] ?? 0;
  // Simple non-linear mix so identical salts don't produce an obviously
  // repeating single-byte XOR pattern across the payload.
  return (s ^ ((i * 31 + 7) & 0xff)) & 0xff;
};

const bytesToBase64 = (bytes: Uint8Array): string => {
  if (typeof Buffer !== "undefined")
    return Buffer.from(bytes).toString("base64");
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};

const base64ToBytes = (b64: string): Uint8Array => {
  if (typeof Buffer !== "undefined")
    return new Uint8Array(Buffer.from(b64, "base64"));
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

export interface ObfuscatedPayload {
  /** base64 salt */
  s: string;
  /** base64 ciphertext */
  d: string;
}

/** Server-side: JSON-stringify + XOR + base64. */
export const obfuscate = (value: unknown): ObfuscatedPayload => {
  const salt = randomSalt();
  const plain = toBytes(JSON.stringify(value));
  const cipher = new Uint8Array(plain.length);
  for (let i = 0; i < plain.length; i++) {
    cipher[i] = (plain[i] ?? 0) ^ keyAt(salt, i);
  }
  return { s: bytesToBase64(salt), d: bytesToBase64(cipher) };
};

/** Client-side: reverse of obfuscate(), returns the parsed JSON value. */
export const deobfuscate = <T>(payload: ObfuscatedPayload): T => {
  const salt = base64ToBytes(payload.s);
  const cipher = base64ToBytes(payload.d);
  const plain = new Uint8Array(cipher.length);
  for (let i = 0; i < cipher.length; i++) {
    plain[i] = (cipher[i] ?? 0) ^ keyAt(salt, i);
  }
  return JSON.parse(fromBytes(plain)) as T;
};
