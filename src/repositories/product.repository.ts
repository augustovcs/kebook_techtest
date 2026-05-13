import { prisma } from "@/lib/prisma";
import type { ProductInput } from "@/schemas/product.schema";

export const productRepository = {
  async findAll(search?: string, page = 1, pageSize = 10) {
    const where = search
      ? {
          name: { contains: search },
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { expert: true, tasks: true, copy: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        expert: true,
        tasks: { orderBy: { createdAt: "desc" } },
        copy: true,
      },
    });
  },

  async create(data: ProductInput) {
    return prisma.product.create({
      data,
      include: { expert: true },
    });
  },

  async update(id: string, data: ProductInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: { expert: true },
    });
  },

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};
