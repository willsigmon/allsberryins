"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { ReviewRequest } from "@/components/sections/review-request";
import { SmsConsentFields } from "@/components/forms/sms-consent-fields";
import { fireLeadConversion } from "@/lib/conversions";
import {
  helpTopicLabelKey,
  resolveFormValidationCopy,
} from "@/lib/form-copy";
import { agentContactSchema, helpTopics, type AgentContactValues } from "@/lib/lead-schemas";
import {
  LeadSubmitError,
  leadFormErrorMessage,
  readLeadSubmitError,
} from "@/lib/lead-submit-error";
import { agency } from "@/lib/site-data";
import { formPhoneEmailFollowUpDisclosure } from "@/lib/sms-consent";
import { readStoredMarketingAttribution } from "@/lib/tracking";

type AgentContactFormProps = {
  entryPoint?: string;
  agentName: string;
  agentSlug: string;
};

export function AgentContactForm({
  agentName,
  agentSlug,
  entryPoint,
}: AgentContactFormProps) {
  const formId = useId();
  const t = useTranslations("forms");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fieldError = (message?: string) =>
    resolveFormValidationCopy(message, (key) => t(key as never));
  const agentFirstName = agentName.split(" ")[0] ?? agentName;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AgentContactValues>({
    resolver: zodResolver(agentContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      helpTopic: undefined,
      message: "",
      honeypot: "",
      marketingTextOptIn: false,
      nonMarketingTextOptIn: false,
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
          type: "agent-contact",
          entryPoint,
          agentSlug,
          agentName,
          ...readStoredMarketingAttribution(),
          ...values,
        }),
      });

      if (!response.ok) {
        throw new LeadSubmitError(
          await readLeadSubmitError(
            response,
            `We couldn't send that request just now. Please call the office at ${agency.phone}.`,
          ),
        );
      }

      reset();
      setSuccessMessage(t("agentSuccess", { name: agentName }));
      fireLeadConversion("agent-contact", { agent: agentSlug });
    } catch (error) {
      console.error("Agent contact form submission failed", error);
      setErrorMessage(
        leadFormErrorMessage(
          error,
          t("submitError", { phone: agency.phone }),
        ),
      );
    }
  });

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <Field
        label={t("fullName")}
        error={fieldError(errors.name?.message)}
        inputId={`${formId}-name`}
      >
        <input
          {...register("name")}
          id={`${formId}-name`}
          autoComplete="name"
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          aria-invalid={Boolean(errors.name)}
          className={inputClassName}
          placeholder={t("fullNamePlaceholder")}
        />
      </Field>
      <Field
        label={t("phone")}
        error={fieldError(errors.phone?.message)}
        inputId={`${formId}-phone`}
      >
        <input
          {...register("phone")}
          id={`${formId}-phone`}
          autoComplete="tel"
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          aria-invalid={Boolean(errors.phone)}
          className={inputClassName}
          inputMode="tel"
          placeholder={t("phonePlaceholder")}
          type="tel"
        />
      </Field>
      <Field
        label={t("email")}
        error={fieldError(errors.email?.message)}
        inputId={`${formId}-email`}
      >
        <input
          {...register("email")}
          id={`${formId}-email`}
          autoComplete="email"
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          placeholder={t("emailPlaceholder")}
          type="email"
        />
      </Field>
      <Field
        label={t("helpTopic")}
        error={fieldError(errors.helpTopic?.message)}
        inputId={`${formId}-help-topic`}
      >
        <select
          {...register("helpTopic")}
          id={`${formId}-help-topic`}
          aria-describedby={errors.helpTopic ? `${formId}-help-topic-error` : undefined}
          aria-invalid={Boolean(errors.helpTopic)}
          className={inputClassName}
          defaultValue=""
        >
          <option value="" disabled>
            {t("selectOne")}
          </option>
          {helpTopics.map((topic) => (
            <option key={topic} value={topic}>
              {t(helpTopicLabelKey(topic) as never)}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label={t("messageOptional")}
        error={fieldError(errors.message?.message)}
        inputId={`${formId}-message`}
      >
        <textarea
          {...register("message")}
          rows={4}
          id={`${formId}-message`}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          aria-invalid={Boolean(errors.message)}
          className={`${inputClassName} min-h-28 py-3`}
          placeholder={t("agentMessagePlaceholder", { firstName: agentFirstName })}
        />
      </Field>
      <input
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <SmsConsentFields formId={formId} register={register} errors={errors} />
      <p className="text-sm leading-7 text-gray-600">{formPhoneEmailFollowUpDisclosure}</p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-red px-6 text-base font-bold text-white transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
        {t("sendRequest")}
      </button>
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
        <span id={`${inputId}-error`} role="alert" className="text-sm font-medium text-red-hover">
          {error}
        </span>
      ) : null}
    </div>
  );
}

const inputClassName =
  "h-13 rounded-2xl border border-gray-200 bg-white px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
