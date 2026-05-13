import { type NextRequest } from "next/server";
import { copyRepository } from "@/repositories/copy.repository";

export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get("productId");
    if (!productId) {
      return Response.json(
        { error: "productId é obrigatório" },
        { status: 400 }
      );
    }

    const copy = await copyRepository.findByProductId(productId);
    if (!copy) {
      return Response.json({ error: "Copy não encontrada" }, { status: 404 });
    }
    return Response.json(copy);
  } catch {
    return Response.json({ error: "Erro ao buscar copy" }, { status: 500 });
  }
}
