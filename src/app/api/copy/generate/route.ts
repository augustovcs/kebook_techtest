import { type NextRequest } from "next/server";
import { productRepository } from "@/repositories/product.repository";
import { copyRepository } from "@/repositories/copy.repository";
import { generateCopyWithAI } from "@/services/openai";
import { PRODUCT_TYPES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return Response.json(
        { error: "productId é obrigatório" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Chave da OpenAI não configurada. Configure OPENAI_API_KEY no .env" },
        { status: 500 }
      );
    }

    const product = await productRepository.findById(productId);
    if (!product) {
      return Response.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const typeLabel =
      PRODUCT_TYPES[product.type as keyof typeof PRODUCT_TYPES] || product.type;

    const generated = await generateCopyWithAI({
      productName: product.name,
      expertNiche: product.expert.niche,
      targetAudience: product.targetAudience,
      mainPain: product.mainPain,
      promisedTransformation: product.promisedTransformation,
      productType: typeLabel,
      price: product.price,
    });

    const copy = await copyRepository.upsert({
      ...generated,
      productId,
    });

    return Response.json({ data: copy });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao gerar copy com IA";
    return Response.json({ error: message }, { status: 500 });
  }
}
