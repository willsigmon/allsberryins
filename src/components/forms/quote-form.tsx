"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { type DefaultValues, useForm, useWatch } from "react-hook-form";

import { AddressAutocomplete } from "@/components/forms/address-autocomplete";
import { SmsConsentFields } from "@/components/forms/sms-consent-fields";
import {
  agency,
  employeeOptions,
  productSelectionOptions,
  products,
  referralSources,
} from "@/lib/site-data";
import { ReviewRequest } from "@/components/sections/review-request";
import { fireLeadConversion } from "@/lib/conversions";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/lead-schemas";
import {
  defaultQuoteProductByInsuranceType,
  getQuoteInsuranceTypeForProduct,
  isQuoteProductForInsuranceType,
  quoteInsuranceTypeOptions,
  quoteProductOptionsByInsuranceType,
  type QuoteInsuranceType,
  type QuoteProductSlug,
} from "@/lib/quote-routing";
import { formPhoneEmailFollowUpDisclosure } from "@/lib/sms-consent";
import { readStoredMarketingAttribution } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type QuoteFormProps = {
  assignedAgentSlug?: string;
  entryPoint?: string;
  initialProduct?: string;
  initialZip?: string;
};

export function QuoteForm({
  assignedAgentSlug,
  entryPoint,
  initialProduct,
  initialZip,
}: QuoteFormProps) {
  const formId = useId();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedInitialProduct = useMemo(() => {
    return productSelectionOptions.includes(initialProduct as QuoteProductSlug)
      ? (initialProduct as QuoteProductSlug)
      : undefined;
  }, [initialProduct]);

  const initialInsuranceType = useMemo<QuoteInsuranceType>(() => {
    return normalizedInitialProduct
      ? getQuoteInsuranceTypeForProduct(normalizedInitialProduct)
      : "personal";
  }, [normalizedInitialProduct]);

  const defaultValues = useMemo<DefaultValues<QuoteFormValues>>(
    () => ({
      insuranceType: initialInsuranceType,
      products: normalizedInitialProduct
        ? [normalizedInitialProduct]
        : ([defaultQuoteProductByInsuranceType[initialInsuranceType]] as QuoteProductSlug[]),
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      zipCode: initialZip && /^\d{5}$/.test(initialZip) ? initialZip : "",
      referralSource: undefined,
      businessName: "",
      employees: undefined,
      message: "",
      honeypot: "",
      marketingTextOptIn: false,
      nonMarketingTextOptIn: false,
    }),
    [initialInsuranceType, initialZip, normalizedInitialProduct],
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues,
  });

  const selectedProducts = useWatch({
    control,
    name: "products",
  });
  const selectedInsuranceType =
    useWatch({
      control,
      name: "insuranceType",
    }) ?? initialInsuranceType;
  const availableProductOptions = quoteProductOptionsByInsuranceType[selectedInsuranceType];
  const needsEmployees = selectedProducts?.some(
    (product) => product === "business" || product === "workers-comp",
  );
  const needsBusinessName = selectedInsuranceType === "commercial";

  const onSubmit = handleSubmit(async (values) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const { businessName, ...quoteFields } = values;
      const payload = {
        type: "quote-request",
        assignedAgentSlug,
        entryPoint,
        ...readStoredMarketingAttribution(),
        ...quoteFields,
        ...(values.insuranceType === "commercial"
          ? { businessName: businessName?.trim() }
          : {}),
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to submit quote request.");
      }

      reset(defaultValues);
      setSuccessMessage("Thank you! We'll be in touch within one business day.");
      fireLeadConversion("quote-request", {
        insuranceType: values.insuranceType,
        products: values.products,
        zip: values.zipCode,
      });
    } catch (error) {
      console.error("Quote form submission failed", error);
      setErrorMessage(`Something went wrong sending your request. Please call us at ${agency.phone}.`);
    }
  });

  const toggleProduct = (product: QuoteProductSlug) => {
    if (!isQuoteProductForInsuranceType(product, selectedInsuranceType)) return;

    const nextSelection = selectedProducts?.includes(product)
      ? selectedProducts.filter((item) => item !== product)
      : [...(selectedProducts ?? []), product];

    setValue("products", nextSelection as QuoteProductSlug[], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const selectInsuranceType = (insuranceType: QuoteInsuranceType) => {
    const compatibleProducts = (selectedProducts ?? []).filter((product) =>
      isQuoteProductForInsuranceType(product, insuranceType),
    );
    const nextProducts = compatibleProducts.length
      ? compatibleProducts
      : [defaultQuoteProductByInsuranceType[insuranceType]];

    setValue("insuranceType", insuranceType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("products", nextProducts as QuoteProductSlug[], {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (insuranceType !== "commercial") {
      setValue("employees", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("businessName", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-[0_28px_70px_-50px_rgba(0,32,92,0.5)] sm:p-8">
      <form className="grid gap-6" onSubmit={onSubmit} noValidate>
        <fieldset
          aria-describedby={
            errors.insuranceType ? `${formId}-insurance-type-error` : undefined
          }
          aria-required="true"
          className="min-w-0"
        >
          <legend className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-600">
            What kind of insurance are you looking for? <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {quoteInsuranceTypeOptions.map((option) => {
              const selected = selectedInsuranceType === option.value;

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex min-h-24 cursor-pointer flex-col justify-center rounded-2xl border px-4 py-3 transition focus-within:outline-none focus-within:ring-2 focus-within:ring-blue focus-within:ring-offset-2",
                    selected
                      ? "border-blue bg-blue-light text-gray-900"
                      : "border-gray-200 text-gray-600 hover:border-blue/45 hover:text-gray-900",
                  )}
                >
                  <input
                    {...register("insuranceType")}
                    type="radio"
                    value={option.value}
                    checked={selected}
                    onChange={() => selectInsuranceType(option.value)}
                    required
                    className="sr-only"
                  />
                  <span className="text-base font-bold">{option.label}</span>
                  <span className="mt-1 text-xs font-medium leading-5 text-gray-500">
                    {option.description}
                  </span>
                </label>
              );
            })}
          </div>
          {errors.insuranceType ? (
            <p
              id={`${formId}-insurance-type-error`}
              role="alert"
              className="mt-2 text-sm text-red-hover"
            >
              {errors.insuranceType.message}
            </p>
          ) : null}
        </fieldset>

        <fieldset
          aria-describedby={errors.products ? `${formId}-products-error` : undefined}
          aria-required="true"
          className="min-w-0"
        >
          <legend className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-600">
            Coverage needs <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {availableProductOptions.map((productSlug) => {
              const product = products.find((item) => item.slug === productSlug);
              const selected = selectedProducts?.includes(productSlug);

              if (!product) {
                return null;
              }

              return (
                <button
                  key={product.slug}
                  type="button"
                  role="checkbox"
                  aria-checked={Boolean(selected)}
                  onClick={() => toggleProduct(productSlug)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
                      selected
                        ? "border-blue bg-blue-light text-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-blue/45 hover:text-gray-900",
                    )}
                  >
                  {product.shortName}
                </button>
              );
            })}
          </div>
          {errors.products ? (
            <p
              id={`${formId}-products-error`}
              role="alert"
              className="mt-2 text-sm text-red-hover"
            >
              {errors.products.message}
            </p>
          ) : null}
        </fieldset>

        {needsBusinessName ? (
          <Field
            label="Business Name"
            error={errors.businessName?.message}
            inputId={`${formId}-business-name`}
            required
          >
            <input
              {...register("businessName")}
              id={`${formId}-business-name`}
              autoComplete="organization"
              required
              aria-describedby={
                errors.businessName ? `${formId}-business-name-error` : undefined
              }
              aria-invalid={Boolean(errors.businessName)}
              className={inputClassName}
              placeholder="Acme Plumbing LLC"
            />
          </Field>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="First Name"
            error={errors.firstName?.message}
            inputId={`${formId}-first-name`}
            required
          >
            <input
              {...register("firstName")}
              id={`${formId}-first-name`}
              autoComplete="given-name"
              required
              aria-describedby={errors.firstName ? `${formId}-first-name-error` : undefined}
              aria-invalid={Boolean(errors.firstName)}
              className={inputClassName}
              placeholder="First name"
            />
          </Field>
          <Field
            label="Last Name"
            error={errors.lastName?.message}
            inputId={`${formId}-last-name`}
            required
          >
            <input
              {...register("lastName")}
              id={`${formId}-last-name`}
              autoComplete="family-name"
              required
              aria-describedby={errors.lastName ? `${formId}-last-name-error` : undefined}
              aria-invalid={Boolean(errors.lastName)}
              className={inputClassName}
              placeholder="Last name"
            />
          </Field>
          <Field label="Phone" error={errors.phone?.message} inputId={`${formId}-phone`} required>
            <input
              {...register("phone")}
              id={`${formId}-phone`}
              autoComplete="tel"
              required
              aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
              aria-invalid={Boolean(errors.phone)}
              className={inputClassName}
              inputMode="tel"
              placeholder="(555) 555-5555"
              type="tel"
            />
          </Field>
          <Field label="Email" error={errors.email?.message} inputId={`${formId}-email`} required>
            <input
              {...register("email")}
              id={`${formId}-email`}
              autoComplete="email"
              required
              aria-describedby={errors.email ? `${formId}-email-error` : undefined}
              aria-invalid={Boolean(errors.email)}
              className={inputClassName}
              placeholder="you@example.com"
              type="email"
            />
          </Field>
          <Field label="Address" error={errors.address?.message} inputId={`${formId}-address`}>
            <AddressAutocomplete
              id={`${formId}-address`}
              value={watch("address") ?? ""}
              onChange={(val) => setValue("address", val, { shouldValidate: true })}
              onSelect={(suggestion) => {
                if (suggestion.postalCode) {
                  setValue("zipCode", suggestion.postalCode, { shouldValidate: true });
                }
              }}
              placeholder="123 Main St, Corona, CA"
              className={inputClassName}
              aria-describedby={errors.address ? `${formId}-address-error` : undefined}
              aria-invalid={Boolean(errors.address)}
            />
          </Field>
          <Field label="ZIP Code" error={errors.zipCode?.message} inputId={`${formId}-zip`} required>
            <input
              {...register("zipCode")}
              id={`${formId}-zip`}
              autoComplete="postal-code"
              required
              aria-describedby={errors.zipCode ? `${formId}-zip-error` : undefined}
              aria-invalid={Boolean(errors.zipCode)}
              inputMode="numeric"
              className={inputClassName}
              placeholder="92878"
            />
          </Field>
          <Field
            label="How did you hear about us?"
            error={errors.referralSource?.message}
            inputId={`${formId}-referral-source`}
            required
          >
            <select
              {...register("referralSource")}
              id={`${formId}-referral-source`}
              aria-describedby={
                errors.referralSource ? `${formId}-referral-source-error` : undefined
              }
              aria-invalid={Boolean(errors.referralSource)}
              required
              className={inputClassName}
              defaultValue=""
            >
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
          <Field
            label="Number of Employees"
            error={errors.employees?.message}
            inputId={`${formId}-employees`}
            required
          >
            <select
              {...register("employees")}
              id={`${formId}-employees`}
              aria-describedby={errors.employees ? `${formId}-employees-error` : undefined}
              aria-invalid={Boolean(errors.employees)}
              required
              className={inputClassName}
              defaultValue=""
            >
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

        <Field
          label="Message (optional)"
          error={errors.message?.message}
          inputId={`${formId}-message`}
        >
          <textarea
            {...register("message")}
            id={`${formId}-message`}
            rows={5}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClassName, "min-h-32 py-3")}
            placeholder="Tell us anything helpful about your coverage needs."
          />
        </Field>

        <SmsConsentFields formId={formId} register={register} errors={errors} />

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-sm leading-7 text-gray-600">
            {formPhoneEmailFollowUpDisclosure}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-bold text-white transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
            Request a Quote
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
            className="rounded-2xl border border-red/15 bg-red/6 px-4 py-3 text-sm font-semibold text-red-hover"
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
  required = false,
  children,
}: {
  label: string;
  error?: string;
  inputId: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-gray-900">
      <label htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <span id={`${inputId}-error`} role="alert" className="text-sm font-medium text-red-hover">
          {error}
        </span>
      ) : null}
    </div>
  );
}

const inputClassName =
  "h-13 rounded-2xl border border-gray-200 bg-white px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
