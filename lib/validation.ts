import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^(?:\+254|254|0)(?:7|1)\d{8}$/, "Enter a Kenyan mobile number.");

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Tell us who to ask for."),
  phone,
  email: z
    .string()
    .trim()
    .email("That email does not look complete.")
    .optional()
    .or(z.literal("")),
  projectType: z.string().trim().min(2, "Choose a project type."),
  location: z.string().trim().min(2, "Where is the plot or site?"),
  budgetRange: z.string().trim().min(2, "A band is enough."),
  timeline: z.string().trim().min(2, "When would you like to start?"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1),
});

export const procurementSchema = z.object({
  name: z.string().trim().min(2, "Tell us who to ask for."),
  organisation: z.string().trim().min(2, "Which organisation is tendering?"),
  email: z.string().trim().email("That email does not look complete."),
  phone: phone.optional().or(z.literal("")),
  tenderReference: z.string().trim().min(2, "Add the tender reference."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  sourcePage: z.string().trim().min(1),
});

export const estimatorSchema = z.object({
  projectType: z.enum([
    "boundary-wall",
    "cabro-paving",
    "renovation",
    "fit-out",
  ]),
  quantity: z.coerce.number().int().positive().max(100000),
  name: z.string().trim().optional().or(z.literal("")),
  phone: phone.optional().or(z.literal("")),
});

export const mpesaSchema = z.object({
  phone,
  amount: z.coerce.number().int().positive().max(250000),
  accountReference: z.string().trim().max(12).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type ProcurementInput = z.infer<typeof procurementSchema>;
export type EstimatorInput = z.infer<typeof estimatorSchema>;

export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
