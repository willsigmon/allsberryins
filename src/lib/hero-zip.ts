export type HeroZipResult =
  | { kind: "empty" }
  | { kind: "valid"; zip: string }
  | { kind: "invalid" };

export function parseHeroZip(value: string): HeroZipResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { kind: "empty" };
  }

  if (/^\d{5}$/.test(trimmed)) {
    return { kind: "valid", zip: trimmed };
  }

  return { kind: "invalid" };
}

export function heroZipForQuote(result: HeroZipResult): string | undefined {
  switch (result.kind) {
    case "valid":
      return result.zip;
    case "empty":
    case "invalid":
      return undefined;
    default: {
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}
