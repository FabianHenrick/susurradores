const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Jersey Oficial 2026 - Black Ops",
      description: "A armadura oficial usada pelos jogadores em competições internacionais. Tecido ultra-respirável com tecnologia de absorção de suor.",
      price: 249.90,
      category: "Uniformes",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=800", // Link de exemplo
      images: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800"],
      tag: "LANÇAMENTO",
      stock: 50,
    },
    {
      name: "Moletom Stealth Hoodie",
      description: "Conforto absoluto para os dias de treino intenso ou para o lifestyle. Estampa minimalista em low-profile.",
      price: 320.00,
      category: "Casual",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800",
      images: [],
      tag: "POPULAR",
      stock: 15,
    },
    {
      name: "Mousepad Speed Edition XXL",
      description: "Superfície de micro-fibra para deslize perfeito e base emborrachada antiderrapante.",
      price: 129.00,
      category: "Acessórios",
      image: "https://images.unsplash.com/photo-1616533758368-809893962630?q=80&w=800",
      images: [],
      tag: null,
      stock: 100,
    },
    {
      name: "Boné Snapback Whisper",
      description: "Estilo clássico com bordado em 3D de alta definição.",
      price: 89.90,
      category: "Acessórios",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800",
      images: [],
      tag: "LIMITED",
      stock: 0,
    },
  ];

  console.log("Limpando banco...");
  await prisma.product.deleteMany();

  console.log("Populando produtos...");
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });