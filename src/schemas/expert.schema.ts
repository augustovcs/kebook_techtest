import { z } from "zod/v4";

export const expertSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  niche: z.string().min(2, "Nicho deve ter pelo menos 2 caracteres"),
  instagram: z.string(),
  youtube: z.string(),
  email: z.union([z.string().email("E-mail inválido"), z.literal("")]),
  notes: z.string(),
});

export type ExpertInput = z.infer<typeof expertSchema>;
