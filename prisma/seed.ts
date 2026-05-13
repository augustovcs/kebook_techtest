import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando seed do banco de dados...");

  const expert1 = await prisma.expert.create({
    data: {
      name: "Bruno Oliveira",
      niche: "Marketing Digital",
      email: "bruno@example.com",
      instagram: "@brunoliveira",
      youtube: "https://youtube.com/@brunoliveira",
      notes: "Expert em redes sociais e copywriting",
      products: {
        create: [
          {
            name: "Curso de Funnel de Vendas",
            type: "COURSE",
            price: 297,
            targetAudience: "Empreendedores digitais",
            mainPain: "Dificuldade em vender online",
            promisedTransformation: "Vender mais e melhor com um funil automático",
            notes: "Curso completo com 12 módulos",
            tasks: {
              create: [
                {
                  title: "Pesquisa de mercado",
                  description: "Validar demanda do mercado",
                  stage: "MARKET_ANALYSIS",
                  responsible: "Bruno",
                },
                {
                  title: "Escrever copy da landing",
                  description: "Headlines e subheadlines",
                  stage: "COPY",
                  responsible: "Bruno",
                },
              ],
            },
          },
          {
            name: "E-book de Copywriting",
            type: "EBOOK",
            price: 97,
            targetAudience: "Copywriters iniciantes",
            mainPain: "Não sabe como escrever textos que vendem",
            promisedTransformation: "Dominar técnicas de copywriting profissional",
          },
        ],
      },
    },
  });

  const expert2 = await prisma.expert.create({
    data: {
      name: "Ana Martins",
      niche: "Design UX/UI",
      email: "ana@example.com",
      instagram: "@anamartinsdesign",
      notes: "Especialista em design de interfaces",
      products: {
        create: [
          {
            name: "Mentoria de Design",
            type: "MENTORSHIP",
            price: 1500,
            targetAudience: "Designers iniciantes",
            mainPain: "Não consegue pegar projetos bem pagos",
            promisedTransformation: "Aumentar ganhos e conseguir clientes premium",
          },
        ],
      },
    },
  });

  console.log("✓ Seed concluído com sucesso!");
  console.log(`✓ ${2} experts criados`);
  console.log(`✓ ${3} produtos criados`);
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
