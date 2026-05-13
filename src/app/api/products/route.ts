import { type NextRequest } from "next/server";
import { productRepository } from "@/repositories/product.repository";
import { productSchema } from "@/schemas/product.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") || undefined;
    const page = Number(searchParams.get("page")) || 1;
    const result = await productRepository.findAll(search, page);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const product = await productRepository.create(parsed.data);
    return Response.json(product, { status: 201 });
  } catch {
    return Response.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
