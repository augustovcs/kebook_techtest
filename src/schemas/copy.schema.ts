import { z } from "zod/v4";

export const copySchema = z.object({
  headline: z.string().min(1, "Headline é obrigatória"),
  subheadline: z.string().min(1, "Subheadline é obrigatória"),
  benefits: z.string().min(1, "Benefícios são obrigatórios"),
  audience: z.string().min(1, "Audiência é obrigatória"),
  cta: z.string().min(1, "CTA é obrigatório"),
  faq: z.string().min(1, "FAQ é obrigatório"),
  productId: z.string().min(1, "Produto é obrigatório"),
});

export type CopyInput = z.infer<typeof copySchema>;
