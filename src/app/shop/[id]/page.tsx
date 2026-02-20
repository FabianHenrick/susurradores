import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ShopPage() {
  // 1. Busca os produtos direto do banco de dados
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Loja Sussurradores</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-green-500 transition-all"
          >
            <div className="relative h-64 w-full bg-black">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <span className="text-xs text-green-500 font-mono uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-xl font-semibold text-white mt-1">
                {product.name}
              </h2>
              <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-green-400 font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
                <Link
                  href={`/shop/${product.id}`}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500">
            Nenhum produto encontrado no banco de dados.
          </p>
        </div>
      )}
    </div>
  );
}
