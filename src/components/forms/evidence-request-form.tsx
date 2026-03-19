"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  evidenceRequestSchema,
  type EvidenceRequestValues,
} from "@/lib/lead-schemas";
import { evidenceRequestTypes } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type EvidenceRequestFormProps = {
  initialAudience?: string;
};

export function EvidenceRequestForm({ initialAudience }: EvidenceRequestFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EvidenceRequestValues>({
    resolver: zodResolver(evidenceRequestSchema),
    defaultValues: {
      name: "",
      companyOrAgency: "",
      phone: "",
      email: "",
      zipCode: "",
      requestType: "Evidence of Insurance",
      requestedFor: initialAudience ? `${initialAudience} request` : "",
      dueDate: "",
      message: "",
      honeypot: "",
    },
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
          audience: initialAudience,
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send the evidence request.");
      }

      setSuccessMessage(
        "Thanks. We received your request and the team will follow up with the right documentation as quickly as possible.",
      );
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
          <div className="rounded-2xl border border-blue/12 bg-blue-light px-4 py-3 text-sm font-semibold text-navy">
            Request context: {initialAudience}
          </div>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <input {...register("name")} className={inputClassName} placeholder="Your full name" />
          </Field>
          <Field label="Company / lender / agency" error={errors.companyOrAgency?.message}>
            <input
              {...register("companyOrAgency")}
              className={inputClassName}
              placeholder="Who needs the proof?"
            />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register("phone")} className={inputClassName} placeholder="(555) 555-5555" />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input {...register("email")} className={inputClassName} placeholder="you@example.com" />
          </Field>
          <Field label="ZIP Code" error={errors.zipCode?.message}>
            <input
              {...register("zipCode")}
              inputMode="numeric"
              className={inputClassName}
              placeholder="92878"
            />
          </Field>
          <Field label="Request type" error={errors.requestType?.message}>
            <select {...register("requestType")} className={inputClassName}>
              {evidenceRequestTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-[1.4fr_0.6fr]">
          <Field label="Requested for" error={errors.requestedFor?.message}>
            <input
              {...register("requestedFor")}
              className={inputClassName}
              placeholder="Escrow, lender, landlord, vendor, HOA, or client"
            />
          </Field>
          <Field label="Need-by date (optional)" error={errors.dueDate?.message}>
            <input
              {...register("dueDate")}
              className={inputClassName}
              placeholder="MM/DD/YYYY"
            />
          </Field>
        </div>

        <Field label="Notes (optional)" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
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
          <p className="text-sm leading-7 text-gray-500">
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
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {successMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="rounded-2xl border border-red/15 bg-red/6 px-4 py-3 text-sm font-semibold text-red">
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
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-900">
      {label}
      {children}
      {error ? <span className="text-sm font-medium text-red">{error}</span> : null}
    </label>
  );
}

const inputClassName =
  "h-13 rounded-2xl border border-gray-200 bg-white px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
