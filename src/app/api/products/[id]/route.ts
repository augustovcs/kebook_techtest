import { type NextRequest } from "next/server";
import { productRepository } from "@/repositories/product.repository";
import { productSchema } from "@/schemas/product.schema";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productRepository.findById(id);
    if (!product) {
      return Response.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }
    return Response.json(product);
  } catch {
    return Response.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const product = await productRepository.update(id, parsed.data);
    return Response.json(product);
  } catch {
    return Response.json(
      { error: "Erro ao atualizar produto" },
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
    await productRepository.delete(id);
    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Erro ao excluir produto" },
      { status: 500 }
    );
  }
}
