"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { agentContactSchema, helpTopics, type AgentContactValues } from "@/lib/lead-schemas";

type AgentContactFormProps = {
  agentName: string;
  agentSlug: string;
};

export function AgentContactForm({ agentName, agentSlug }: AgentContactFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
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
          agentSlug,
          agentName,
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send your request.");
      }

      setSuccessMessage(`Thanks for reaching out. ${agentName} or someone from the team will be in touch shortly.`);
    } catch (error) {
      console.error("Agent contact form submission failed", error);
      setErrorMessage("We couldn't send that request just now. Please call the office at (951) 739-5959.");
    }
  });

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <Field label="Name" error={errors.name?.message}>
        <input {...register("name")} className={inputClassName} placeholder="Your full name" />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} className={inputClassName} placeholder="(555) 555-5555" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input {...register("email")} className={inputClassName} placeholder="you@example.com" />
      </Field>
      <Field label="How can I help?" error={errors.helpTopic?.message}>
        <select {...register("helpTopic")} className={inputClassName} defaultValue="">
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
      <Field label="Message (optional)" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
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
