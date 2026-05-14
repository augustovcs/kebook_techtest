import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const [experts, products, tasks, copies] = await Promise.all([
      prisma.expert.count(),
      prisma.product.count(),
      prisma.task.count(),
      prisma.copy.count(),
    ]);

    return Response.json({ experts, products, tasks, copies });
  } catch (error) {
    return Response.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
