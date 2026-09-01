export type AddressLookupStatus = "idle" | "results" | "empty" | "unavailable";

export function nextAddressLookupStatus(input: {
  ok: boolean;
  predictionCount: number;
}): AddressLookupStatus {
  if (!input.ok) {
    return "unavailable";
  }

  return input.predictionCount > 0 ? "results" : "empty";
}
