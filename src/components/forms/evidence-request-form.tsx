"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { ReviewRequest } from "@/components/sections/review-request";
import { fireLeadConversion } from "@/lib/conversions";
import {
  evidenceRequestSchema,
  type EvidenceRequestValues,
} from "@/lib/lead-schemas";
import { evidenceRequestTypes } from "@/lib/site-data";
import { readStoredMarketingAttribution } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type EvidenceRequestFormProps = {
  assignedAgentSlug?: string;
  entryPoint?: string;
  initialAudience?: string;
};

export function EvidenceRequestForm({
  assignedAgentSlug,
  entryPoint,
  initialAudience,
}: EvidenceRequestFormProps) {
  const formId = useId();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const defaultValues = useMemo(
    () => ({
      name: "",
      companyOrAgency: "",
      phone: "",
      email: "",
      zipCode: "",
      requestType: "Proof of Insurance" as const,
      requestedFor: initialAudience ? `${initialAudience} request` : "",
      dueDate: "",
      message: "",
      honeypot: "",
    }),
    [initialAudience],
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EvidenceRequestValues>({
    resolver: zodResolver(evidenceRequestSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "evidence-request",
          assignedAgentSlug,
          audience: initialAudience,
          entryPoint,
          ...readStoredMarketingAttribution(),
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send the evidence request.");
      }

      reset(defaultValues);
      setSuccessMessage(
        "Thanks. We received your request and the team will follow up with the right documentation as quickly as possible.",
      );
      fireLeadConversion("evidence-request", { requestType: values.requestType });
    } catch (error) {
      console.error("Evidence request submission failed", error);
      setErrorMessage(
        "We couldn't send that request just now. Please call the office at (951) 739-5959.",
      );
    }
  });

  return (
    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_28px_70px_-50px_rgba(0,32,92,0.5)] sm:p-8">
      <form className="grid gap-6" onSubmit={onSubmit} noValidate>
        {initialAudience ? (
          <div className="rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-gray-900">
            Request context: {initialAudience}
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message} inputId={`${formId}-name`}>
            <input
              {...register("name")}
              id={`${formId}-name`}
              autoComplete="name"
              aria-describedby={errors.name ? `${formId}-name-error` : undefined}
              aria-invalid={Boolean(errors.name)}
              className={inputClassName}
              placeholder="Your full name"
            />
          </Field>
          <Field
            label="Company / lender / agency"
            error={errors.companyOrAgency?.message}
            inputId={`${formId}-company`}
          >
            <input
              {...register("companyOrAgency")}
              id={`${formId}-company`}
              autoComplete="organization"
              aria-describedby={errors.companyOrAgency ? `${formId}-company-error` : undefined}
              aria-invalid={Boolean(errors.companyOrAgency)}
              className={inputClassName}
              placeholder="Who needs the proof?"
            />
          </Field>
          <Field label="Phone" error={errors.phone?.message} inputId={`${formId}-phone`}>
            <input
              {...register("phone")}
              id={`${formId}-phone`}
              autoComplete="tel"
              aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              aria-invalid={Boolean(errors.phone)}
              className={inputClassName}
              inputMode="tel"
              placeholder="(555) 555-5555"
              type="tel"
            />
          </Field>
          <Field label="Email" error={errors.email?.message} inputId={`${formId}-email`}>
            <input
              {...register("email")}
              id={`${formId}-email`}
              autoComplete="email"
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              aria-invalid={Boolean(errors.email)}
              className={inputClassName}
              placeholder="you@example.com"
              type="email"
            />
          </Field>
          <Field label="ZIP Code" error={errors.zipCode?.message} inputId={`${formId}-zip`}>
            <input
              {...register("zipCode")}
              id={`${formId}-zip`}
              autoComplete="postal-code"
              aria-describedby={errors.zipCode ? `${formId}-zip-error` : undefined}
              aria-invalid={Boolean(errors.zipCode)}
              inputMode="numeric"
              className={inputClassName}
              placeholder="92878"
            />
          </Field>
          <Field
            label="Request type"
            error={errors.requestType?.message}
            inputId={`${formId}-request-type`}
          >
            <select
              {...register("requestType")}
              id={`${formId}-request-type`}
              aria-describedby={
                errors.requestType ? `${formId}-request-type-error` : undefined
              }
              aria-invalid={Boolean(errors.requestType)}
              className={inputClassName}
            >
              {evidenceRequestTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr]">
          <Field
            label="Requested for"
            error={errors.requestedFor?.message}
            inputId={`${formId}-requested-for`}
          >
            <input
              {...register("requestedFor")}
              id={`${formId}-requested-for`}
              aria-describedby={
                errors.requestedFor ? `${formId}-requested-for-error` : undefined
              }
              aria-invalid={Boolean(errors.requestedFor)}
              className={inputClassName}
              placeholder="Escrow, lender, landlord, vendor, HOA, or client"
            />
          </Field>
          <Field
            label="Need-by date (optional)"
            error={errors.dueDate?.message}
            inputId={`${formId}-due-date`}
          >
            <input
              {...register("dueDate")}
              id={`${formId}-due-date`}
              aria-describedby={errors.dueDate ? `${formId}-due-date-error` : undefined}
              aria-invalid={Boolean(errors.dueDate)}
              className={inputClassName}
              type="date"
            />
          </Field>
        </div>

        <Field
          label="Notes (optional)"
          error={errors.message?.message}
          inputId={`${formId}-message`}
        >
          <textarea
            {...register("message")}
            rows={5}
            id={`${formId}-message`}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClassName, "min-h-32 py-3")}
            placeholder="Share any loan number, escrow context, property details, or instructions that will help us move faster."
          />
        </Field>

        <input
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-sm leading-7 text-gray-400">
            This request is built for certificates, proof of coverage, and time-sensitive lender or escrow follow-up.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-bold text-white transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
            Send Request
          </button>
        </div>

        {successMessage ? (
          <div className="grid gap-4">
            <p
              aria-live="polite"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              role="status"
            >
              {successMessage}
            </p>
            <ReviewRequest variant="post-submit" />
          </div>
        ) : null}
        {errorMessage ? (
          <p
            aria-live="assertive"
            className="rounded-2xl border border-red/15 bg-red/6 px-4 py-3 text-sm font-semibold text-red"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  inputId,
  children,
}: {
  label: string;
  error?: string;
  inputId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-gray-900">
      <label htmlFor={inputId}>{label}</label>
      {children}
      {error ? (
        <span id={`${inputId}-error`} role="alert" className="text-sm font-medium text-red">
          {error}
        </span>
      ) : null}
    </div>
  );
}

const inputClassName =
  "h-13 rounded-2xl border border-gray-200 bg-white px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
