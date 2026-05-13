import { prisma } from "@/lib/prisma";
import type { ExpertInput } from "@/schemas/expert.schema";

export const expertRepository = {
  async findAll(search?: string, page = 1, pageSize = 10) {
    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { niche: { contains: search } },
            { email: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.expert.findMany({
        where,
        include: { products: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.expert.count({ where }),
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
    return prisma.expert.findUnique({
      where: { id },
      include: { products: true },
    });
  },

  async findAllSimple() {
    return prisma.expert.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, niche: true },
    });
  },

  async create(data: ExpertInput) {
    return prisma.expert.create({ data });
  },

  async update(id: string, data: ExpertInput) {
    return prisma.expert.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.expert.delete({ where: { id } });
  },
};
