import { agency } from "@/lib/site-data";

export const themeStorageKey = "allsberry-theme-mode";
export const solarCacheStorageKey = "allsberry-solar-cache";
export const textScaleStorageKey = "allsberry-text-scale";

export const themeModes = ["auto", "light", "dark"] as const;
export const textScales = ["sm", "md", "lg"] as const;

export type ThemeMode = (typeof themeModes)[number];
export type TextScale = (typeof textScales)[number];

export type SolarCache = {
  dateKey: string;
  sunrise: number;
  sunset: number;
};

export const defaultThemeMode: ThemeMode = "auto";
export const defaultTextScale: TextScale = "md";

export const themeModeCycle: ThemeMode[] = ["auto", "dark", "light"];

export const themeModeLabel: Record<ThemeMode, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
};

export const textScaleLabel: Record<TextScale, string> = {
  sm: "Compact",
  md: "Standard",
  lg: "Large",
};

export const agencyThemeFallbackCoordinates = {
  latitude: agency.geo.latitude,
  longitude: agency.geo.longitude,
} as const;

export function sanitizeThemeMode(value: string | null | undefined): ThemeMode {
  if (value === "light" || value === "dark" || value === "auto") {
    return value;
  }

  return defaultThemeMode;
}

export function sanitizeTextScale(value: string | null | undefined): TextScale {
  if (value === "sm" || value === "md" || value === "lg") {
    return value;
  }

  return defaultTextScale;
}

export function resolveThemeFromSolarTimes(now: number, sunrise: number, sunset: number) {
  return now >= sunset || now < sunrise ? "dark" : "light";
}

export function getTodayKey() {
  return new Date().toDateString();
}
