import { type NextRequest } from "next/server";
import { taskRepository } from "@/repositories/task.repository";
import { taskSchema } from "@/schemas/task.schema";

export async function GET(request: NextRequest) {
  try {
    const productId =
      request.nextUrl.searchParams.get("productId") || undefined;
    const tasks = await taskRepository.findAll(productId);
    return Response.json(tasks);
  } catch {
    return Response.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = taskSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const task = await taskRepository.create(parsed.data);
    return Response.json(task, { status: 201 });
  } catch {
    return Response.json({ error: "Erro ao criar tarefa" }, { status: 500 });
  }
}
