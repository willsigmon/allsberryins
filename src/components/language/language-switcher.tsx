"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState, useTransition } from "react";

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
  const [, startTransition] = useTransition();

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

    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
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

      {open ? (
        <div
          role="dialog"
          aria-label={t("label")}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[17rem] rounded-[1.6rem] border border-white/12 bg-navy p-4 text-white shadow-[0_30px_70px_-34px_rgba(0,0,0,0.55)] backdrop-blur"
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
        </div>
      ) : null}
    </div>
  );
}
