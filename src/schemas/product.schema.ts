import { z } from "zod/v4";

export const productSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  type: z.enum(["COURSE", "EBOOK", "MENTORSHIP", "CONSULTING", "COMMUNITY"]),
  price: z.number().min(0, "Preço deve ser maior ou igual a zero"),
  targetAudience: z.string().min(2, "Público-alvo é obrigatório"),
  mainPain: z.string().min(2, "Dor principal é obrigatória"),
  promisedTransformation: z.string().min(2, "Transformação é obrigatória"),
  notes: z.string(),
  expertId: z.string().min(1, "Expert é obrigatório"),
});

export type ProductInput = z.infer<typeof productSchema>;
