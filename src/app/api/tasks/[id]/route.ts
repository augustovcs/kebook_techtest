import { type NextRequest } from "next/server";
import { taskRepository } from "@/repositories/task.repository";
import { taskSchema } from "@/schemas/task.schema";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const task = await taskRepository.update(id, parsed.data);
    return Response.json(task);
  } catch {
    return Response.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { stage } = await request.json();
    const task = await taskRepository.updateStage(id, stage);
    return Response.json(task);
  } catch {
    return Response.json(
      { error: "Erro ao mover tarefa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await taskRepository.delete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Erro ao excluir tarefa" },
      { status: 500 }
    );
  }
}
