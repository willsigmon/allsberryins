/**
 * Robust UUID generator helper.
 * Uses window.crypto.randomUUID() where supported.
 * Falls back to a resilient mathematical pseudo-random number generator
 * if running in legacy, HTTP (non-secure), or older mobile environments.
 */
export function safeUUID(): string {
  if (
    typeof window !== "undefined" &&
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  // Resilient RFC4122 version 4 compliant fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const randomVal = (Math.random() * 16) | 0;
    const resolvedVal = char === "x" ? randomVal : (randomVal & 0x3) | 0x8;
    return resolvedVal.toString(16);
  });
}
