import { z } from "zod";

import {
  employeeOptions,
  evidenceRequestTypes,
  productSelectionOptions,
  referralSources,
} from "@/lib/site-data";

export const honeypotFieldName = "website";

export const quoteProductSelectionOptions = productSelectionOptions;
export const leadReferralSources = referralSources;
export const leadEmployeeOptions = employeeOptions;

export const helpTopics = [
  "Home Insurance",
  "Auto Insurance",
  "Business Insurance",
  "Workers Comp",
  "Life Insurance",
  "Other",
] as const;

const optionalMessageSchema = z
  .string()
  .trim()
  .max(1000, "Keep the message under 1000 characters.")
  .optional()
  .or(z.literal(""));

const honeypotSchema = z.string().max(200).optional().or(z.literal(""));
const optionalTrackingFieldSchema = z
  .string()
  .trim()
  .max(120, "Tracking context must stay under 120 characters.")
  .optional();

export const quoteFormSchema = z
  .object({
    products: z
      .array(z.enum(quoteProductSelectionOptions))
      .min(1, "Select at least one coverage type."),
    firstName: z.string().trim().min(2, "First name is required."),
    lastName: z.string().trim().min(2, "Last name is required."),
    phone: z
      .string()
      .trim()
      .min(10, "Phone number is required.")
      .regex(/^[0-9()+\-\s]{10,}$/, "Enter a valid phone number."),
    email: z.string().trim().email("Enter a valid email address."),
    zipCode: z.string().trim().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP code."),
    referralSource: z.enum(leadReferralSources, {
      error: "Please tell us how you heard about us.",
    }),
    employees: z.enum(leadEmployeeOptions).optional(),
    message: optionalMessageSchema,
    honeypot: honeypotSchema,
  })
  .superRefine((values, ctx) => {
    const needsEmployees = values.products.some(
      (product) => product === "business" || product === "workers-comp",
    );

    if (needsEmployees && !values.employees) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["employees"],
        message: "Please choose the number of employees.",
      });
    }
  });

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const agentContactSchema = z.object({
  name: z.string().trim().min(2, "Your name is required."),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is required.")
    .regex(/^[0-9()+\-\s]{10,}$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address."),
  helpTopic: z.enum(helpTopics, { error: "Select how the agent can help." }),
  message: optionalMessageSchema,
  honeypot: honeypotSchema,
});

export type AgentContactValues = z.infer<typeof agentContactSchema>;

export const evidenceRequestSchema = z.object({
  name: z.string().trim().min(2, "Your name is required."),
  companyOrAgency: z.string().trim().min(2, "Company, lender, or agency name is required."),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is required.")
    .regex(/^[0-9()+\-\s]{10,}$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address."),
  zipCode: z.string().trim().regex(/^\d{5}$/, "Enter a valid 5-digit ZIP code."),
  requestType: z.enum(evidenceRequestTypes, {
    error: "Select the type of request.",
  }),
  requestedFor: z.string().trim().min(2, "Tell us who the proof is for."),
  dueDate: z.string().trim().max(40).optional().or(z.literal("")),
  message: optionalMessageSchema,
  honeypot: honeypotSchema,
});

export type EvidenceRequestValues = z.infer<typeof evidenceRequestSchema>;

export const leadsApiSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("quote-request"),
    assignedAgentSlug: optionalTrackingFieldSchema,
    entryPoint: optionalTrackingFieldSchema,
    ...quoteFormSchema.shape,
  }),
  z.object({
    type: z.literal("agent-contact"),
    entryPoint: optionalTrackingFieldSchema,
    agentSlug: z.string().trim().min(1),
    agentName: z.string().trim().min(1),
    ...agentContactSchema.shape,
  }),
  z.object({
    type: z.literal("evidence-request"),
    assignedAgentSlug: optionalTrackingFieldSchema,
    audience: z.string().trim().optional(),
    entryPoint: optionalTrackingFieldSchema,
    ...evidenceRequestSchema.shape,
  }),
]);

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1, "Message is required.").max(1000),
  honeypot: honeypotSchema,
});
