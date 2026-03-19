"use client";

import { MoonStar, Sun, SunMoon } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  agencyThemeFallbackCoordinates,
  defaultThemeMode,
  getTodayKey,
  resolveThemeFromSolarTimes,
  sanitizeThemeMode,
  solarCacheStorageKey,
  themeModeCycle,
  themeModeLabel,
  themeStorageKey,
  type SolarCache,
  type ThemeMode,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

type ResolvedTheme = "light" | "dark";

type GeolocationPermissionState = "granted" | "prompt" | "denied" | "unsupported";

function readThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return defaultThemeMode;
  }

  return sanitizeThemeMode(window.localStorage.getItem(themeStorageKey));
}

function readSolarCache(): SolarCache | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(solarCacheStorageKey);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as SolarCache;

    if (
      parsed.dateKey !== getTodayKey() ||
      typeof parsed.sunrise !== "number" ||
      typeof parsed.sunset !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function storeSolarCache(cache: SolarCache) {
  window.localStorage.setItem(solarCacheStorageKey, JSON.stringify(cache));
}

function dispatchThemeChange(mode: ThemeMode, resolved: ResolvedTheme) {
  window.dispatchEvent(
    new CustomEvent("themechange", {
      detail: { mode, resolved },
    }),
  );
}

function applyTheme(mode: ThemeMode, resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.themeMode = mode;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  window.localStorage.setItem(themeStorageKey, mode);
  dispatchThemeChange(mode, resolved);
}

async function getGeolocationPermissionState(): Promise<GeolocationPermissionState> {
  if (typeof navigator === "undefined" || !("permissions" in navigator)) {
    return "unsupported";
  }

  try {
    const result = await navigator.permissions.query({
      name: "geolocation",
    } as PermissionDescriptor);

    if (result.state === "granted" || result.state === "prompt" || result.state === "denied") {
      return result.state;
    }

    return "unsupported";
  } catch {
    return "unsupported";
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 1000 * 60 * 30,
      timeout: 6000,
    });
  });
}

async function fetchSolarTimes(latitude: number, longitude: number) {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0&date=today`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Unable to load solar times.");
  }

  const payload = (await response.json()) as {
    results?: {
      sunrise?: string;
      sunset?: string;
    };
  };

  const sunrise = payload.results?.sunrise ? new Date(payload.results.sunrise).getTime() : NaN;
  const sunset = payload.results?.sunset ? new Date(payload.results.sunset).getTime() : NaN;

  if (!Number.isFinite(sunrise) || !Number.isFinite(sunset)) {
    throw new Error("Solar times were invalid.");
  }

  return { sunrise, sunset };
}

const themeMeta: Record<
  ThemeMode,
  {
    icon: typeof SunMoon;
    helper: string;
  }
> = {
  auto: {
    icon: SunMoon,
    helper: "Auto: follows sunset when location is available.",
  },
  light: {
    icon: Sun,
    helper: "Light mode stays bright all day.",
  },
  dark: {
    icon: MoonStar,
    helper: "Dark mode stays on until you switch back.",
  },
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const helperId = useId();
  const [mode, setMode] = useState<ThemeMode>(defaultThemeMode);
  const shouldPromptOnAutoRef = useRef(false);

  useEffect(() => {
    const syncFromDom = () => {
      setMode(readThemeMode());
    };

    syncFromDom();
    window.addEventListener("themechange", syncFromDom as EventListener);

    return () => window.removeEventListener("themechange", syncFromDom as EventListener);
  }, []);

  useEffect(() => {
    let active = true;
    let intervalId: number | undefined;

    const applyAutoTheme = async ({ requestLocation }: { requestLocation: boolean }) => {
      const cache = readSolarCache();
      const now = Date.now();

      if (cache) {
        const resolved = resolveThemeFromSolarTimes(now, cache.sunrise, cache.sunset);
        if (active) {
          applyTheme("auto", resolved);
        }
        return;
      }

      const systemResolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      try {
        const permissionState = await getGeolocationPermissionState();
        const shouldUseLocation = requestLocation || permissionState === "granted";

        if (shouldUseLocation && "geolocation" in navigator) {
          const position = await getCurrentPosition();
          const solar = await fetchSolarTimes(
            position.coords.latitude,
            position.coords.longitude,
          );
          const nextResolved = resolveThemeFromSolarTimes(now, solar.sunrise, solar.sunset);

          if (!active) {
            return;
          }

          storeSolarCache({
            dateKey: getTodayKey(),
            sunrise: solar.sunrise,
            sunset: solar.sunset,
          });
          applyTheme("auto", nextResolved);
          return;
        }

        if (!active) {
          return;
        }

        if (requestLocation) {
          const solar = await fetchSolarTimes(
            agencyThemeFallbackCoordinates.latitude,
            agencyThemeFallbackCoordinates.longitude,
          );
          const nextResolved = resolveThemeFromSolarTimes(now, solar.sunrise, solar.sunset);
          storeSolarCache({
            dateKey: getTodayKey(),
            sunrise: solar.sunrise,
            sunset: solar.sunset,
          });
          applyTheme("auto", nextResolved);
          return;
        }
      } catch {
        if (requestLocation) {
          try {
            const solar = await fetchSolarTimes(
              agencyThemeFallbackCoordinates.latitude,
              agencyThemeFallbackCoordinates.longitude,
            );
            const nextResolved = resolveThemeFromSolarTimes(now, solar.sunrise, solar.sunset);

            if (!active) {
              return;
            }

            storeSolarCache({
              dateKey: getTodayKey(),
              sunrise: solar.sunrise,
              sunset: solar.sunset,
            });
            applyTheme("auto", nextResolved);
            return;
          } catch {
            // Fall through to system preference.
          }
        }
      }

      if (active) {
        applyTheme("auto", systemResolved);
      }
    };

    if (mode === "auto") {
      const requestLocation = shouldPromptOnAutoRef.current;
      shouldPromptOnAutoRef.current = false;
      void applyAutoTheme({ requestLocation });
      intervalId = window.setInterval(() => {
        void applyAutoTheme({ requestLocation: false });
      }, 1000 * 60);
    } else {
      applyTheme(mode, mode);
    }

    return () => {
      active = false;

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [mode]);

  const { icon: Icon, helper } = themeMeta[mode];
  const nextMode = useMemo(() => {
    const index = themeModeCycle.indexOf(mode);
    return themeModeCycle[(index + 1) % themeModeCycle.length];
  }, [mode]);

  const cycleTheme = async () => {
    const next = nextMode;
    setMode(next);

    if (next === "auto") {
      window.localStorage.setItem(themeStorageKey, next);
      window.localStorage.removeItem(solarCacheStorageKey);
      shouldPromptOnAutoRef.current = true;
      return;
    }

    applyTheme(next, next);
  };

  return (
    <button
      type="button"
      onClick={() => void cycleTheme()}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
        className,
      )}
      title={`${helper} Click to switch to ${themeModeLabel[nextMode]}.`}
      aria-label={`${themeModeLabel[mode]} theme. Click to switch to ${themeModeLabel[nextMode]}.`}
      aria-describedby={helperId}
      data-theme-mode={mode}
    >
      <Icon className="h-4 w-4" />
      <span aria-hidden="true" className="hidden lg:inline">
        {themeModeLabel[mode]}
      </span>
      <span id={helperId} className="sr-only" aria-live="polite">
        {helper}
      </span>
    </button>
  );
}
