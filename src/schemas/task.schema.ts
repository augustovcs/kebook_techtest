import { z } from "zod/v4";

export const taskSchema = z.object({
  title: z.string().min(2, "Título deve ter pelo menos 2 caracteres"),
  description: z.string(),
  stage: z.enum(["MARKET_ANALYSIS", "COPY", "DESIGN", "DEVELOPMENT", "REVIEW", "PUBLISHED"]),
  responsible: z.string(),
  productId: z.string().min(1, "Produto é obrigatório"),
});

export type TaskInput = z.infer<typeof taskSchema>;
