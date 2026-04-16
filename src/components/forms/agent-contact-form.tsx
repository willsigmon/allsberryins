"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { fireLeadConversion } from "@/lib/conversions";
import { agentContactSchema, helpTopics, type AgentContactValues } from "@/lib/lead-schemas";
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        throw new Error("Unable to send your request.");
      }

      reset();
      setSuccessMessage(`Thanks for reaching out. ${agentName} or someone from the team will be in touch shortly.`);
      fireLeadConversion("agent-contact", { agent: agentSlug });
    } catch (error) {
      console.error("Agent contact form submission failed", error);
      setErrorMessage("We couldn't send that request just now. Please call the office at (951) 739-5959.");
    }
  });

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
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
      <Field
        label="How can I help?"
        error={errors.helpTopic?.message}
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
            Select one
          </option>
          {helpTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>
      <Field
        label="Message (optional)"
        error={errors.message?.message}
        inputId={`${formId}-message`}
      >
        <textarea
          {...register("message")}
          rows={4}
          id={`${formId}-message`}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          aria-invalid={Boolean(errors.message)}
          className={`${inputClassName} min-h-28 py-3`}
          placeholder={`Tell ${agentName.split(" ")[0]} a little bit about what you need.`}
        />
      </Field>
      <input
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-red px-6 text-base font-bold text-white transition hover:bg-red-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
        Send Request
      </button>
      {successMessage ? (
        <p
          aria-live="polite"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
          role="status"
        >
          {successMessage}
        </p>
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
  "h-13 rounded-2xl border border-gray-200 px-4 text-base font-medium text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue focus:ring-4 focus:ring-blue/10";
