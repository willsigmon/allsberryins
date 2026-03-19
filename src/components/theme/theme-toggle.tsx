"use client";

import {
  Accessibility,
  Check,
  ChevronDown,
  MoonStar,
  Sun,
  SunMoon,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  agencyThemeFallbackCoordinates,
  defaultTextScale,
  defaultThemeMode,
  getTodayKey,
  resolveThemeFromSolarTimes,
  sanitizeTextScale,
  sanitizeThemeMode,
  solarCacheStorageKey,
  textScaleLabel,
  textScaleStorageKey,
  themeModeLabel,
  themeStorageKey,
  type SolarCache,
  type TextScale,
  type ThemeMode,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

type ResolvedTheme = "light" | "dark";
type GeolocationPermissionState = "granted" | "prompt" | "denied" | "unsupported";

const themeOptions: Array<{
  id: ThemeMode;
  icon: typeof SunMoon;
  helper: string;
}> = [
  {
    id: "auto",
    icon: SunMoon,
    helper: "Follows local sunset time when location is available.",
  },
  {
    id: "light",
    icon: Sun,
    helper: "Keeps the brighter palette active.",
  },
  {
    id: "dark",
    icon: MoonStar,
    helper: "Keeps the darker palette active.",
  },
];

const textScaleOptions: Array<{
  id: TextScale;
  preview: string;
}> = [
  { id: "sm", preview: "aA" },
  { id: "md", preview: "aA" },
  { id: "lg", preview: "aA" },
];

function readThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return defaultThemeMode;
  }

  return sanitizeThemeMode(window.localStorage.getItem(themeStorageKey));
}

function readTextScale(): TextScale {
  if (typeof window === "undefined") {
    return defaultTextScale;
  }

  return sanitizeTextScale(window.localStorage.getItem(textScaleStorageKey));
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

function dispatchTextScaleChange(scale: TextScale) {
  window.dispatchEvent(
    new CustomEvent("textscalechange", {
      detail: { scale },
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

function applyTextScale(scale: TextScale) {
  const root = document.documentElement;
  root.dataset.textScale = scale;
  window.localStorage.setItem(textScaleStorageKey, scale);
  dispatchTextScaleChange(scale);
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

export function ThemeToggle({ className }: ThemeToggleProps) {
  const helperId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const shouldPromptOnAutoRef = useRef(false);
  const [mode, setMode] = useState<ThemeMode>(defaultThemeMode);
  const [textScale, setTextScale] = useState<TextScale>(defaultTextScale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncFromDom = () => {
      setMode(readThemeMode());
      setTextScale(readTextScale());
    };

    syncFromDom();
    window.addEventListener("themechange", syncFromDom as EventListener);
    window.addEventListener("textscalechange", syncFromDom as EventListener);

    return () => {
      window.removeEventListener("themechange", syncFromDom as EventListener);
      window.removeEventListener("textscalechange", syncFromDom as EventListener);
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
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

  useEffect(() => {
    applyTextScale(textScale);
  }, [textScale]);

  const activeThemeOption = useMemo(
    () => themeOptions.find((option) => option.id === mode) ?? themeOptions[0],
    [mode],
  );
  const ActiveIcon = activeThemeOption.icon;

  const setThemeMode = (next: ThemeMode) => {
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
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
          className,
        )}
        title="Display settings"
        aria-label="Display settings"
        aria-describedby={helperId}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Accessibility className="h-4 w-4" />
        <span className="hidden lg:inline">Display</span>
        <span aria-hidden="true" className="text-[12px] font-bold">
          aA
        </span>
        <ActiveIcon className="h-4 w-4" />
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>

      <span id={helperId} className="sr-only" aria-live="polite">
        Theme {themeModeLabel[mode]}. Text size {textScaleLabel[textScale]}.
      </span>

      {open ? (
        <div
          role="dialog"
          aria-label="Display settings"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[19rem] rounded-[1.6rem] border border-white/12 bg-navy p-4 text-white shadow-[0_30px_70px_-34px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Theme
            </p>
            <div className="mt-3 grid gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = mode === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setThemeMode(option.id)}
                    className={cn(
                      "flex items-start justify-between rounded-2xl border px-3.5 py-3 text-left transition",
                      active
                        ? "border-white/28 bg-white/12 text-white"
                        : "border-white/10 bg-white/5 text-white/82 hover:border-white/22 hover:bg-white/9",
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        <span className="block text-sm font-semibold">{themeModeLabel[option.id]}</span>
                        <span className="mt-1 block text-[11px] leading-4 text-white/62">
                          {option.helper}
                        </span>
                      </span>
                    </span>
                    {active ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Text size
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {textScaleOptions.map((option) => {
                const active = textScale === option.id;
                const previewClassName =
                  option.id === "sm"
                    ? "text-sm"
                    : option.id === "lg"
                      ? "text-lg"
                      : "text-base";

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTextScale(option.id)}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-center transition",
                      active
                        ? "border-white/28 bg-white/12 text-white"
                        : "border-white/10 bg-white/5 text-white/82 hover:border-white/22 hover:bg-white/9",
                    )}
                    aria-pressed={active}
                    aria-label={`${textScaleLabel[option.id]} text size`}
                  >
                    <span className={cn("block font-bold", previewClassName)}>{option.preview}</span>
                    <span className="mt-1 block text-[11px] font-semibold text-white/62">
                      {textScaleLabel[option.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
