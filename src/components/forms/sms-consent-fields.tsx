"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Link } from "@/i18n/navigation";
import {
  legalPagePaths,
  smsConsentCheckboxLabels,
  smsConsentDisclosureIntro,
  smsConsentFieldNames,
} from "@/lib/sms-consent";
import { cn } from "@/lib/utils";

export type SmsConsentFormValues = {
  marketingTextOptIn?: boolean;
  nonMarketingTextOptIn?: boolean;
};

type SmsConsentFieldsProps<T extends SmsConsentFormValues> = {
  formId: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  className?: string;
};

export function SmsConsentFields<T extends SmsConsentFormValues>({
  formId,
  register,
  errors,
  className,
}: SmsConsentFieldsProps<T>) {
  const marketingId = `${formId}-marketing-text-opt-in`;
  const nonMarketingId = `${formId}-non-marketing-text-opt-in`;

  return (
    <div className={cn("grid gap-4", className)}>
      <p className="text-xs leading-relaxed text-gray-500">
        {smsConsentDisclosureIntro}{" "}
        <Link href={legalPagePaths.privacy} className="font-medium text-blue underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href={legalPagePaths.terms} className="font-medium text-blue underline">
          Terms &amp; Conditions
        </Link>
        .
      </p>

      <label
        htmlFor={marketingId}
        className="flex items-start gap-3 text-sm font-medium text-gray-700"
      >
        <input
          {...register(smsConsentFieldNames.marketingTextOptIn as Parameters<typeof register>[0])}
          id={marketingId}
          type="checkbox"
          aria-describedby={
            errors?.marketingTextOptIn ? `${marketingId}-error` : undefined
          }
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue focus:ring-blue/30"
        />
        <span>{smsConsentCheckboxLabels.marketing}</span>
      </label>
      {errors?.marketingTextOptIn ? (
        <p id={`${marketingId}-error`} role="alert" className="text-sm text-red">
          {String(errors.marketingTextOptIn.message)}
        </p>
      ) : null}

      <label
        htmlFor={nonMarketingId}
        className="flex items-start gap-3 text-sm font-medium text-gray-700"
      >
        <input
          {...register(smsConsentFieldNames.nonMarketingTextOptIn as Parameters<typeof register>[0])}
          id={nonMarketingId}
          type="checkbox"
          aria-describedby={
            errors?.nonMarketingTextOptIn ? `${nonMarketingId}-error` : undefined
          }
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue focus:ring-blue/30"
        />
        <span>{smsConsentCheckboxLabels.nonMarketing}</span>
      </label>
      {errors?.nonMarketingTextOptIn ? (
        <p id={`${nonMarketingId}-error`} role="alert" className="text-sm text-red">
          {String(errors.nonMarketingTextOptIn.message)}
        </p>
      ) : null}
    </div>
  );
}
