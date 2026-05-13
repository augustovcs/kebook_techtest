import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface CopyGenerationInput {
  productName: string;
  expertNiche: string;
  targetAudience: string;
  mainPain: string;
  promisedTransformation: string;
  productType: string;
  price: number;
}

interface GeneratedCopy {
  headline: string;
  subheadline: string;
  benefits: string;
  audience: string;
  cta: string;
  faq: string;
}

export async function generateCopyWithAI(
  input: CopyGenerationInput
): Promise<GeneratedCopy> {
  const prompt = `Você é um copywriter profissional especializado em infoprodutos digitais.
  
Com base nas informações abaixo, gere uma copy completa para uma landing page de vendas.

Produto: ${input.productName}
Tipo: ${input.productType}
Nicho: ${input.expertNiche}
Público-alvo: ${input.targetAudience}
Dor principal: ${input.mainPain}
Transformação prometida: ${input.promisedTransformation}
Preço: R$ ${input.price.toFixed(2)}

Retorne APENAS um JSON válido (sem markdown, sem code blocks) com a seguinte estrutura:
{
  "headline": "Uma headline impactante e persuasiva",
  "subheadline": "Uma subheadline que complementa e reforça a headline",
  "benefits": "Lista de 5-7 benefícios separados por |",
  "audience": "Descrição detalhada de para quem é este produto",
  "cta": "Texto para o botão de call-to-action",
  "faq": "5 perguntas e respostas no formato: P: pergunta? R: resposta | P: pergunta? R: resposta"
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um copywriter expert em marketing digital e infoprodutos. Responda sempre em JSON válido.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI não retornou conteúdo");
  }

  const cleaned = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned) as GeneratedCopy;
    if (!parsed.headline || !parsed.subheadline || !parsed.benefits) {
      throw new Error("Resposta incompleta da IA");
    }
    return parsed;
  } catch {
    throw new Error("Falha ao processar resposta da IA. Tente novamente.");
  }
}
