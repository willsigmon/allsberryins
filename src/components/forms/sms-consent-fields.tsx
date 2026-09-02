"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Link } from "@/i18n/navigation";
import {
  legalPagePaths,
  smsConsentCheckboxLabels,
  smsConsentFieldNames,
} from "@/lib/sms-consent";
import { cn } from "@/lib/utils";

export type SmsConsentFormValues = {
  marketingTextOptIn?: boolean;
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
  const marketingPolicyId = `${marketingId}-policy`;
  const marketingErrorId = `${marketingId}-error`;

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex min-h-11 items-start gap-3 py-2 text-sm font-medium leading-6 text-gray-700">
        <input
          {...register(smsConsentFieldNames.marketingTextOptIn as Parameters<typeof register>[0])}
          id={marketingId}
          type="checkbox"
          aria-describedby={`${marketingPolicyId}${
            errors?.marketingTextOptIn ? ` ${marketingErrorId}` : ""
          }`}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue focus:ring-blue/30"
        />
        <p>
          <label htmlFor={marketingId}>{smsConsentCheckboxLabels.marketing}</label>{" "}
          <span id={marketingPolicyId}>
            For more information, please review our{" "}
            <Link href={legalPagePaths.privacy} className="font-medium text-blue underline">
              Privacy Policy
            </Link>{" "}
            &amp;{" "}
            <Link href={legalPagePaths.terms} className="font-medium text-blue underline">
              Terms &amp; Conditions
            </Link>
            .
          </span>
        </p>
      </div>
      {errors?.marketingTextOptIn ? (
        <p id={marketingErrorId} role="alert" className="text-sm text-red">
          {String(errors.marketingTextOptIn.message)}
        </p>
      ) : null}
    </div>
  );
}
