"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";

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

export default function ProductPage({ params }: { params: { id: number } }) {
  // Em um cenário real, você buscaria os dados do produto pelo ID aqui
  const product = {
    name: "Camiseta Oficial 2026 - Pro Kit",
    price: "R$ 189,90",
    category: "UNIFORMES",
    description:
      "A armadura oficial da Sussurradores para a temporada 2026. Desenvolvida com tecido tecnológico que favorece a transpiração e painéis laterais em mesh para máximo conforto durante as partidas mais intensas.",
    images: [
      "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container max-w-7xl mx-auto px-6 pt-32">
        {/* Voltar */}
        <Link
          href="/shop"
          className="flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors mb-12 uppercase font-black italic text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Voltar para a loja
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Coluna da Esquerda: Galeria */}
          <div className="space-y-4">
            <div className="relative h-[500px] md:h-[700px] w-full bg-zinc-950 border border-white/5 overflow-hidden rounded-3xl">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative h-24 border-2 transition-all rounded-xl overflow-hidden ${mainImage === img ? "border-green-500" : "border-transparent opacity-50"}`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Info */}
          <div className="flex flex-col">
            <Badge className="w-fit bg-green-500 text-black font-black mb-4 uppercase italic">
              Coleção 2026
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
              {product.name}
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-8 border-l-2 border-green-500/30 pl-6">
              {product.description}
            </p>

            <div className="mb-10">
              <span className="text-5xl font-black text-white italic">
                {product.price}
              </span>
              <p className="text-green-500 font-bold text-xs uppercase mt-2 tracking-widest">
                Disponível em estoque
              </p>
            </div>

            {/* Seletor de Tamanho (Exemplo) */}
            <div className="space-y-4 mb-10">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                Selecione o tamanho
              </p>
              <div className="flex gap-3">
                {["P", "M", "G", "GG", "XG"].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 border border-white/10 hover:border-green-500 hover:text-green-500 transition-all font-bold flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-10 text-2xl rounded-none shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
              <ShoppingCart className="mr-4" size={24} /> Adicionar ao Carrinho
            </Button>

            {/* Selos de Confiança */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/5">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                <Truck className="text-green-500" size={20} /> Entrega em todo
                Brasil
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                <ShieldCheck className="text-green-500" size={20} /> Compra
                Segura
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                <RefreshCcw className="text-green-500" size={20} /> 7 dias para
                troca
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
