/**
 * Robust UUID generator helper.
 * Uses globalThis.crypto.randomUUID() where supported (browsers and Node).
 * Falls back to a resilient mathematical pseudo-random number generator
 * if running in legacy, HTTP (non-secure), or older mobile environments.
 */
export function safeUUID(): string {
  const randomUUID = globalThis.crypto?.randomUUID?.bind(globalThis.crypto);

  if (randomUUID) {
    return randomUUID();
  }

  // Resilient RFC4122 version 4 compliant fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const randomVal = (Math.random() * 16) | 0;
    const resolvedVal = char === "x" ? randomVal : (randomVal & 0x3) | 0x8;
    return resolvedVal.toString(16);
  });
}
