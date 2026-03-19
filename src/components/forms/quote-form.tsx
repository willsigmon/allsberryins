"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  employeeOptions,
  productSelectionOptions,
  products,
  referralSources,
} from "@/lib/site-data";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/lead-schemas";
import { cn } from "@/lib/utils";

type QuoteProductSlug = (typeof productSelectionOptions)[number];

type QuoteFormProps = {
  initialProduct?: string;
  initialZip?: string;
};

export function QuoteForm({ initialProduct, initialZip }: QuoteFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedInitialProduct = useMemo(() => {
    return productSelectionOptions.includes(initialProduct as QuoteProductSlug)
      ? (initialProduct as QuoteProductSlug)
      : undefined;
  }, [initialProduct]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      products: normalizedInitialProduct ? [normalizedInitialProduct] : ["home"],
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      zipCode: initialZip && /^\d{5}$/.test(initialZip) ? initialZip : "",
      referralSource: undefined,
      employees: undefined,
      message: "",
      honeypot: "",
    },
  });

  const selectedProducts = useWatch({
    control,
    name: "products",
  });
  const needsEmployees = selectedProducts?.some(
    (product) => product === "business" || product === "workers-comp",
  );

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
          type: "quote-request",
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit quote request.");
      }

      setSuccessMessage("Thank you! We'll be in touch within 24 hours.");
    } catch (error) {
      console.error("Quote form submission failed", error);
      setErrorMessage("Something went wrong sending your request. Please call us at (951) 739-5959.");
    }
  });

  const toggleProduct = (product: QuoteProductSlug) => {
    const nextSelection = selectedProducts?.includes(product)
      ? selectedProducts.filter((item) => item !== product)
      : [...(selectedProducts ?? []), product];

    setValue("products", nextSelection as QuoteProductSlug[], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_28px_70px_-50px_rgba(0,32,92,0.5)] sm:p-8">
      <form className="grid gap-6" onSubmit={onSubmit} noValidate>
        <div>
          <label className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
            Products
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {productSelectionOptions.map((productSlug) => {
              const product = products.find((item) => item.slug === productSlug);
              const selected = selectedProducts?.includes(productSlug);

              if (!product) {
                return null;
              }

              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => toggleProduct(productSlug)}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                    selected
                      ? "border-blue bg-blue-light text-navy"
                      : "border-gray-200 text-gray-600 hover:border-blue/45 hover:text-navy",
                  )}
                >
                  {product.shortName}
                </button>
              );
            })}
          </div>
          {errors.products ? <p className="mt-2 text-sm text-red">{errors.products.message}</p> : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="First Name" error={errors.firstName?.message}>
            <input {...register("firstName")} className={inputClassName} placeholder="First name" />
          </Field>
          <Field label="Last Name" error={errors.lastName?.message}>
            <input {...register("lastName")} className={inputClassName} placeholder="Last name" />
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
          <Field label="How did you hear about us?" error={errors.referralSource?.message}>
            <select {...register("referralSource")} className={inputClassName} defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {referralSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {needsEmployees ? (
          <Field label="Number of Employees" error={errors.employees?.message}>
            <select {...register("employees")} className={inputClassName} defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {employeeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

        <input
          {...register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <Field label="Message (optional)" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
            className={cn(inputClassName, "min-h-32 py-3")}
            placeholder="Tell us anything helpful about your coverage needs."
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-sm leading-7 text-gray-500">
            We only ask for the basics up front so we can follow up quickly without making the quote process feel heavy.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-bold text-white transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
            Get My Quote
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
  "h-13 rounded-2xl border border-gray-200 px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
