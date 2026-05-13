import { prisma } from "@/lib/prisma";
import type { CopyInput } from "@/schemas/copy.schema";

export const copyRepository = {
  async findByProductId(productId: string) {
    return prisma.copy.findUnique({ where: { productId } });
  },

  async upsert(data: CopyInput) {
    return prisma.copy.upsert({
      where: { productId: data.productId },
      create: data,
      update: {
        headline: data.headline,
        subheadline: data.subheadline,
        benefits: data.benefits,
        audience: data.audience,
        cta: data.cta,
        faq: data.faq,
      },
    });
  },

  async delete(productId: string) {
    return prisma.copy.delete({ where: { productId } });
  },
};
