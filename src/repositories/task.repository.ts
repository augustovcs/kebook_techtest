import { prisma } from "@/lib/prisma";
import { type TaskStage } from "@/generated/prisma/enums";
import type { TaskInput } from "@/schemas/task.schema";

export const taskRepository = {
  async findAll(productId?: string) {
    const where = productId ? { productId } : {};
    return prisma.task.findMany({
      where,
      include: { product: true },
      orderBy: { createdAt: "asc" },
    });
  },

  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: { product: true },
    });
  },

  async create(data: TaskInput) {
    return prisma.task.create({
      data,
      include: { product: true },
    });
  },

  async update(id: string, data: Partial<TaskInput>) {
    return prisma.task.update({
      where: { id },
      data,
      include: { product: true },
    });
  },

  async updateStage(id: string, stage: TaskStage) {
    return prisma.task.update({
      where: { id },
      data: { stage },
      include: { product: true },
    });
  },

  async delete(id: string) {
    return prisma.task.delete({ where: { id } });
  },
};
