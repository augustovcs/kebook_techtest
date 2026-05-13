import { type NextRequest } from "next/server";
import { expertRepository } from "@/repositories/expert.repository";
import { expertSchema } from "@/schemas/expert.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const all = searchParams.get("all");

    if (all === "true") {
      const experts = await expertRepository.findAllSimple();
      return Response.json(experts);
    }

    const search = searchParams.get("search") || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const result = await expertRepository.findAll(search, page);
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: "Erro ao buscar experts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = expertSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const expert = await expertRepository.create(parsed.data);
    return Response.json(expert, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Erro ao criar expert" },
      { status: 500 }
    );
  }
}
