"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";

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

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const helperId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [targetLocale, setTargetLocale] = useState<AppLocale | null>(null);

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

  const changeLocale = (next: AppLocale) => {
    setOpen(false);
    if (next === locale) {
      return;
    }

    setTargetLocale(next);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const overlayActive = isPending && targetLocale !== null;
  const targetName = targetLocale ? t(localeLabelKey[targetLocale]) : "";

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
          isPending && "opacity-80",
          className,
        )}
        title={t("label")}
        aria-label={t("label")}
        aria-describedby={helperId}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Globe className={cn("h-3.5 w-3.5", isPending && "animate-spin")} />
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
            className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[17rem] origin-top-right rounded-[1.6rem] border border-white/12 bg-navy p-4 text-white shadow-[0_30px_70px_-34px_rgba(0,0,0,0.55)] backdrop-blur"
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

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {overlayActive ? (
                <LocaleSwitchOverlay
                  key="locale-overlay"
                  label={t("switchingTo", { name: targetName })}
                  shortCode={shortCode[targetLocale!]}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

type LocaleSwitchOverlayProps = {
  label: string;
  shortCode: string;
};

function LocaleSwitchOverlay({ label, shortCode }: LocaleSwitchOverlayProps) {
  return (
    <motion.div
      aria-live="polite"
      role="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24 sm:pt-28"
      style={{
        background:
          "radial-gradient(circle at top, rgba(0,32,92,0.28) 0%, rgba(0,32,92,0) 55%)",
      }}
    >
      <motion.div
        initial={{ y: -24, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -16, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3 rounded-full border border-white/18 bg-navy/96 px-5 py-3 text-sm font-semibold text-white shadow-[0_24px_60px_-24px_rgba(0,32,92,0.85)] backdrop-blur-xl"
      >
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue to-red text-[10px] font-extrabold tracking-[0.08em] text-white"
        >
          {shortCode}
        </motion.span>
        <span>{label}</span>
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-[2px] w-12 origin-left rounded-full bg-gradient-to-r from-blue via-white to-red"
        />
      </motion.div>
    </motion.div>
  );
}
