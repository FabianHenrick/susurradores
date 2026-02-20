import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o recrutamento de produtos...");

  // Limpa o banco para evitar duplicatas ao testar
  await prisma.product.deleteMany();

  const products = [
    {
      name: "Camisa Home 2026 - Sussurradores",
      description:
        "A armadura oficial da elite. Tecido ultra-leve com tecnologia Dry-Fit para alta performance nos servidores.",
      price: 189.9,
      category: "Vestuário",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      ],
      stock: 50,
      tag: "Lançamento",
    },
    {
      name: 'Moletom "Echo" Pro',
      description:
        "Conforto térmico para longas sessões de treino. Design minimalista com o logo bordado em alta definição.",
      price: 249.0,
      category: "Vestuário",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
      ],
      stock: 30,
      tag: "Mais Vendido",
    },
    {
      name: "Mousepad Control XXL",
      description:
        "Superfície de microfibra tratada para precisão absoluta. Base emborrachada que não desliza nem nos momentos de clutch.",
      price: 120.0,
      category: "Acessórios",
      image:
        "https://images.unsplash.com/photo-1615667121586-745bb973f6b6?q=80&w=1000&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1615667121586-745bb973f6b6?q=80&w=1000&auto=format&fit=crop",
      ],
      stock: 100,
      tag: "Essencial",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("✅ Missão cumprida! Produtos recrutados com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
