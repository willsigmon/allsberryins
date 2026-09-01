export class LeadSubmitError extends Error {
  override readonly name = "LeadSubmitError";
}

export function leadFormErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof LeadSubmitError) {
    const message = error.message.trim();
    if (message) {
      return message;
    }
  }

  return fallback;
}

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
