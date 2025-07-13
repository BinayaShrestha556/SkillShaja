import CryptoJS from "crypto-js";

export function generateEsewaSignature(message: string): string {
  const secretKey = process.env.ESEWA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing ESEWA_SECRET_KEY in environment variables.");
  }
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const signature = CryptoJS.enc.Base64.stringify(hash);
  console.log("signature is: " + signature);
  return signature;
}
