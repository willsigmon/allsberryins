import { agency } from "@/lib/site-data";

export const themeStorageKey = "allsberry-theme-mode";
export const solarCacheStorageKey = "allsberry-solar-cache";

export const themeModes = ["auto", "light", "dark"] as const;

export type ThemeMode = (typeof themeModes)[number];

export type SolarCache = {
  dateKey: string;
  sunrise: number;
  sunset: number;
};

export const defaultThemeMode: ThemeMode = "auto";

export const themeModeCycle: ThemeMode[] = ["auto", "dark", "light"];

export const themeModeLabel: Record<ThemeMode, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
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

export function resolveThemeFromSolarTimes(now: number, sunrise: number, sunset: number) {
  return now >= sunset || now < sunrise ? "dark" : "light";
}

export function getTodayKey() {
  return new Date().toDateString();
}
