"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
};

const localeLabelKey: Record<AppLocale, "englishLabel" | "spanishLabel"> = {
  en: "englishLabel",
  es: "spanishLabel",
};

const localeHelperKey: Record<AppLocale, "englishHelper" | "spanishHelper"> = {
  en: "englishHelper",
  es: "spanishHelper",
};

const shortCode: Record<AppLocale, string> = {
  en: "EN",
  es: "ES",
};

const OVERLAY_LIFETIME_MS = 1280;

function spawnLocaleOverlay({
  label,
  shortCode,
}: {
  label: string;
  shortCode: string;
}) {
  if (typeof document === "undefined") return;

  // Purge any existing overlay so back-to-back clicks don't stack.
  document.querySelectorAll("[data-locale-overlay]").forEach((el) => el.remove());

  const overlay = document.createElement("div");
  overlay.setAttribute("data-locale-overlay", "");
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");

  const pill = document.createElement("div");
  pill.className = "locale-overlay-pill";

  const chip = document.createElement("span");
  chip.className = "locale-overlay-chip";
  chip.textContent = shortCode;
  chip.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.textContent = label;

  const bar = document.createElement("span");
  bar.className = "locale-overlay-bar";
  bar.setAttribute("aria-hidden", "true");

  pill.append(chip, text, bar);
  overlay.append(pill);
  document.body.appendChild(overlay);
  document.documentElement.classList.add("locale-switching");

  window.setTimeout(() => {
    overlay.remove();
    document.documentElement.classList.remove("locale-switching");
  }, OVERLAY_LIFETIME_MS);
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const helperId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelInnerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [mobilePos, setMobilePos] = useState<{ top: number } | null>(null);

  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

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
    if (!open) {
      setMobilePos(null);
      return;
    }
    const update = () => {
      const btn = buttonRef.current;
      const panel = panelInnerRef.current;
      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile || !btn) {
        setMobilePos(null);
        return;
      }
      const btnRect = btn.getBoundingClientRect();
      const panelHeight = panel?.offsetHeight ?? 202;
      const margin = 16;
      const belowTop = btnRect.bottom + 12;
      const fitsBelow = belowTop + panelHeight + margin <= window.innerHeight;
      const top = fitsBelow
        ? belowTop
        : Math.max(margin, btnRect.top - panelHeight - 12);
      setMobilePos({ top });
    };
    update();
    // Rerun once after the panel mounts so we know its real height.
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const changeLocale = (next: AppLocale) => {
    setOpen(false);
    if (next === locale) {
      return;
    }

    spawnLocaleOverlay({
      label: t("switchingTo", { name: t(localeLabelKey[next]) }),
      shortCode: shortCode[next],
    });

    router.replace(pathname, { locale: next });
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/28 bg-white/8 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:border-white/45 hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
          className,
        )}
        title={t("label")}
        aria-label={t("label")}
        aria-describedby={helperId}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Globe className="h-3.5 w-3.5" />
        <span aria-hidden="true" className="text-[11px] font-bold">
          {shortCode[locale]}
        </span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
        />
      </button>

      <span id={helperId} className="sr-only" aria-live="polite">
        {t(localeLabelKey[locale])}
      </span>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label={t("label")}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            ref={panelInnerRef}
            style={mobilePos !== null ? { top: mobilePos.top } : undefined}
            className={cn(
              "z-50 origin-top rounded-[1.6rem] border border-white/12 bg-navy p-4 text-white shadow-[0_30px_70px_-34px_rgba(0,0,0,0.55)] backdrop-blur",
              "max-md:fixed max-md:left-4 max-md:right-4",
              "md:absolute md:top-[calc(100%+0.75rem)] md:right-0 md:w-[17rem] md:origin-top-right",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              {t("sectionTitle")}
            </p>
            <div className="mt-3 grid gap-2">
              {routing.locales.map((option) => {
                const active = option === locale;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => changeLocale(option)}
                    className={cn(
                      "flex items-start justify-between rounded-2xl border px-3.5 py-3 text-left transition",
                      active
                        ? "border-white/28 bg-white/12 text-white"
                        : "border-white/10 bg-white/5 text-white/82 hover:border-white/22 hover:bg-white/9",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold">
                        {t(localeLabelKey[option])}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-white/62">
                        {t(localeHelperKey[option])}
                      </span>
                    </span>
                    {active ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
