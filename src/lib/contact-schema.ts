import * as z from "zod/mini";

export const projectTypes = [
  "Construction",
  "Fit-Out",
  "Interiors",
  "Maintenance",
  "Hospitality",
  "Cleaning",
  "Other / not sure yet",
] as const;

/** zod/mini keeps the client bundle small — the same schema validates on the server */
export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name"), z.maxLength(120, "Name is too long")),
  company: z.string().check(z.trim(), z.maxLength(160, "Company name is too long")),
  email: z.email("Please enter a valid email address").check(z.maxLength(200, "Email is too long")),
  phone: z
    .string()
    .check(
      z.trim(),
      z.maxLength(40, "Phone number is too long"),
      z.regex(/^[+()\d\s-]*$/, "Use digits, spaces and + only"),
    ),
  projectType: z.enum(projectTypes, { error: () => "Please choose a project type" }),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Tell us a little more about your project"),
      z.maxLength(4000, "Please keep your message under 4,000 characters"),
    ),
  /** Honeypot — real visitors never see or fill this */
  website: z.string().check(z.maxLength(0)),
});

export type ContactInput = z.infer<typeof contactSchema>;
