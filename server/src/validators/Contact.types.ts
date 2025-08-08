import { z } from "zod";

export const ContactInputSchema = z.object({
    name: z.string().min(1, "Name required").max(100, "Name too long").trim(),
    email: z.email("Invalid email address").trim(),
    phone: z
        .string()
        .regex(/^\+?\d{8,15}$/, "Invalid phone number (must be 8-15 digits, can start with '+')")
        .trim(),
});

export const ContactSchema = ContactInputSchema.extend({
    id: z.uuid(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
});

export type ContactInput = z.infer<typeof ContactInputSchema>;
export type Contact = z.infer<typeof ContactSchema>;