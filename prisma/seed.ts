// Carrega o .env antes de inicializar o Prisma
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

// --- FORÇA A LEITURA DA URL DO ENV ---
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const products = [
    {
      name: "Jersey Pro 2026 - Home",
      description: "A armadura oficial dos Sussurradores. Tecido tecnológico com detalhes em verde neon.",
      price: 189.90,
      category: "Uniformes",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?q=80&w=1000&auto=format&fit=crop",
      stock: 50,
      tag: "LANÇAMENTO"
    },
    {
      name: "Moletom Stealth Black",
      description: "Conforto total para os dias de treino frio.",
      price: 249.00,
      category: "Casual",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
      stock: 30,
      tag: "MAIS VENDIDO"
    },
    {
      name: "Mousepad Speed Edition XL",
      description: "Superfície de baixa fricção para movimentos rápidos.",
      price: 120.00,
      category: "Acessórios",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
      stock: 100,
      tag: null
    },
    {
      name: "Boné Snapback 'Whisper'",
      description: "Aba reta clássica com bordado 3D frontal.",
      price: 89.90,
      category: "Acessórios",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      stock: 45,
      tag: "NOVO"
    }
  ];

  console.log("--- Limpando o Arsenal ---");
  await prisma.product.deleteMany();

  console.log("--- Forjando Novos Equipamentos ---");
  
  for (const product of products) {
    const item = await prisma.product.create({
      data: product,
    });
    console.log(`[+] Criado: ${item.name}`);
  }

  console.log("--- Arsenal Populado! ---");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });