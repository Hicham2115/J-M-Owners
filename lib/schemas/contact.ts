import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Enter your name").max(100),
  email: z.email("Enter a valid email"),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a bit more about your property").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
