import { type NextRequest } from "next/server";
import { expertRepository } from "@/repositories/expert.repository";
import { expertSchema } from "@/schemas/expert.schema";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const expert = await expertRepository.findById(id);
    if (!expert) {
      return Response.json({ error: "Expert não encontrado" }, { status: 404 });
    }
    return Response.json(expert);
  } catch {
    return Response.json({ error: "Erro ao buscar expert" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = expertSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const expert = await expertRepository.update(id, parsed.data);
    return Response.json(expert);
  } catch {
    return Response.json({ error: "Erro ao atualizar expert" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await expertRepository.delete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Erro ao excluir expert" }, { status: 500 });
  }
}
