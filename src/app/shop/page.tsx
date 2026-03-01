import React from "react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import ShopCard from "./components/shopcard";
import Link from "next/link";

interface ShopProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Shop({ searchParams }: ShopProps) {
  const { category } = await searchParams;

  // 1. Busca os produtos filtrando por categoria se existir na URL
  const products = await prisma.product.findMany({
    where: {
      category: category && category !== "Todos" ? category : undefined,
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = ["Todos", "Uniformes", "Casual", "Acessórios"];

  return (
    <div className="min-h-screen bg-black pb-20 text-white">
      {/* Hero da Loja */}
      <section className="bg-black py-16 border-b border-green-500/20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="bg-green-500 text-black mb-4 hover:bg-green-400">
            Official Merch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
            Armadura <span className="text-green-500">Sussurradores</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto uppercase text-xs md:text-sm font-bold tracking-[0.3em]">
            Vista o manto da equipe que transforma o cenário.
          </p>
        </div>
      </section>

      <main className="container max-w-7xl mx-auto px-6 mt-12">
        {/* Filtros rápidos via URL */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const isActive = (category || "Todos") === cat;
            return (
              <Button
                key={cat}
                variant="outline"
                asChild
                className={`rounded-full border-green-500/30 transition-all whitespace-nowrap ${
                  isActive 
                    ? "bg-green-500 text-black border-green-500" 
                    : "hover:bg-green-500/10 hover:text-green-500"
                }`}
              >
                <Link href={cat === "Todos" ? "/shop" : `/shop?category=${cat}`}>
                  {cat}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ShopCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={`R$ ${product.price.toFixed(2)}`}
              category={product.category}
              image={product.image}
              tag={product.tag}
              isOutStock={product.stock <= 0}
            />
          ))}
        </div>

        {/* Estado Vazio */}
        {products.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 uppercase tracking-widest font-bold">
              O estoque está vazio para esta categoria, recruta.
            </p>
          </div>
        )}
      </main>

      {/* Banner Sócio Sofredor */}
      <section className="container max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-green-500 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-10 translate-y-[-20%]">
            <ShoppingCart size={200} className="text-black rotate-12" />
          </div>

          <div className="text-black z-10 text-center md:text-left">
            <h2 className="text-4xl font-black italic uppercase leading-tight tracking-tighter">
              Desconto de Sócio?
            </h2>
            <p className="font-bold uppercase text-sm mt-2 opacity-80">
              Sócios Sofredores garantem 10% OFF em toda a loja oficial.
            </p>
          </div>
          <Button className="bg-black text-white hover:bg-zinc-900 rounded-full px-10 py-7 font-black uppercase text-sm z-10 transition-transform hover:scale-105 active:scale-95 shadow-2xl">
            Quero Me Tornar Sócio
          </Button>
        </div>
      </section>
    </div>
  );
}