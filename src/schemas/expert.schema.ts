import { z } from "zod/v4";

export const expertSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  niche: z.string().min(2, "Nicho deve ter pelo menos 2 caracteres"),
  instagram: z.string().optional().default(""),
  youtube: z.string().optional().default(""),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  notes: z.string().optional().default(""),
});

export type ExpertInput = z.infer<typeof expertSchema>;
