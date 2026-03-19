import {
  defaultTextScale,
  defaultThemeMode,
  solarCacheStorageKey,
  textScaleStorageKey,
  themeStorageKey,
} from "@/lib/theme";

const themeBootstrapScript = `
(() => {
  const THEME_KEY = ${JSON.stringify(themeStorageKey)};
  const SOLAR_KEY = ${JSON.stringify(solarCacheStorageKey)};
  const DEFAULT_MODE = ${JSON.stringify(defaultThemeMode)};
  const TEXT_SCALE_KEY = ${JSON.stringify(textScaleStorageKey)};
  const DEFAULT_TEXT_SCALE = ${JSON.stringify(defaultTextScale)};
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const readCache = () => {
    try {
      const raw = localStorage.getItem(SOLAR_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.dateKey !== new Date().toDateString()) return null;
      if (typeof parsed.sunrise !== "number" || typeof parsed.sunset !== "number") return null;
      return parsed;
    } catch {
      return null;
    }
  };

  const storedMode = localStorage.getItem(THEME_KEY);
  const mode = storedMode === "light" || storedMode === "dark" || storedMode === "auto"
    ? storedMode
    : DEFAULT_MODE;

  let resolved = mode;

  if (mode === "auto") {
    const solar = readCache();
    const now = Date.now();
    resolved = solar ? (now >= solar.sunset || now < solar.sunrise ? "dark" : "light") : systemTheme;
  }

  root.dataset.themeMode = mode;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  const storedTextScale = localStorage.getItem(TEXT_SCALE_KEY);
  const textScale = storedTextScale === "sm" || storedTextScale === "md" || storedTextScale === "lg"
    ? storedTextScale
    : DEFAULT_TEXT_SCALE;
  root.dataset.textScale = textScale;
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />;
}
