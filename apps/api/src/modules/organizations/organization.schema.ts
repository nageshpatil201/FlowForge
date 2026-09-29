import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(255, "Organization name must be at most 255 characters")
    .trim(),
});

export type CreateOrganizationInput = z.infer<
  typeof createOrganizationSchema
>;