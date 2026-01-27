"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import ShopCard from "./components/shopcard";

const products = [
  {
    id: 1,
    name: "Camisa Oficial 2026 - Home",
    price: "R$ 149,90",
    category: "Uniformes",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f",
    tag: "Lançamento",
  },
  {
    id: 2,
    name: "Moletom Sussurradores Black",
    price: "R$ 229,90",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    tag: "Mais Vendido",
  },
  {
    id: 3,
    name: "Mousepad Speed Sussurradores",
    price: "R$ 89,90",
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    tag: "Estoque Baixo",
  },
  {
    id: 4,
    name: "Boné Snapback Green",
    price: "R$ 79,90",
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    tag: null,
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero da Loja */}
      <section className="bg-black py-16 border-b border-green-500/20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="bg-green-500 text-black mb-4 hover:bg-green-400">
            Official Merch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
            Armadura <span className="text-green-500">Sussurradores</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto uppercase text-xs md:text-sm font-bold tracking-[0.3em]">
            Vista o manto da equipe que transforma o cenário.
          </p>
        </div>
      </section>

      <main className="container max-w-7xl mx-auto px-6 mt-12">
        {/* Filtros rápidos */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {["Todos", "Uniformes", "Casual", "Acessórios"].map((cat) => (
            <Button
              key={cat}
              variant="outline"
              className="rounded-full border-green-500/30 hover:bg-green-500 hover:text-black transition-all whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grade de Produtos - Responsividade Ajustada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ShopCard
              id={product.id}
              name={product.name}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </main>

      {/* Banner Sócio Sofredor */}
      <section className="container max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-green-500 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Detalhe estético de fundo */}
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
          <Button
            variant="default"
            className="bg-black text-white hover:bg-zinc-900 rounded-full px-10 py-7 font-black uppercase text-sm z-10 transition-transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            Quero Me Tornar Sócio
          </Button>
        </div>
      </section>
    </div>
  );
}
