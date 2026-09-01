export async function readLeadSubmitError(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      const message = data.message.trim();
      if (message) {
        return message;
      }
    }
  } catch {
    // Non-JSON error bodies keep the sourced fallback (phone / email).
  }

  return fallback;
}
