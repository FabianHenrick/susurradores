// src/app/shop/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProductGallery } from "./components/product-gallery";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // CORREÇÃO: await params obrigatório no Next.js 15
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-10">
      <div className="container max-w-7xl mx-auto px-6">
        <Link href="/shop" className="inline-flex items-center text-zinc-500 hover:text-green-500 mb-8 group transition-colors uppercase font-bold text-xs">
          <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Voltar ao Arsenal
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGallery mainImage={product.image} allImages={product.images} />

          <div className="flex flex-col space-y-8">
            <div>
              <Badge className="bg-green-500 text-black mb-4 uppercase font-black">
                {product.category}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
                {product.name}
              </h1>
              <p className="text-4xl font-black text-green-500 mt-6 italic">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl leading-relaxed text-zinc-400">
              {product.description}
            </div>

            <Button className="w-full bg-white text-black hover:bg-green-500 h-20 rounded-full font-black uppercase text-xl transition-all">
              <ShoppingCart className="mr-3" size={24} />
              {product.stock > 0 ? "Adicionar ao Arsenal" : "Esgotado"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}