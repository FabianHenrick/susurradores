"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopCardProps {
  name: string;
  price: string;
  category: string;
  image: string;
  tag?: string | null;
  isOutStock?: boolean;
}

export default function ShopCard({
  name,
  price,
  category,
  image,
  tag,
  isOutStock,
}: ShopCardProps) {
  return (
    <Card className="group relative bg-zinc-900/50 border-white/5 overflow-hidden transition-all duration-300 hover:border-green-500/40">
      {/* Imagem e Badge */}
      <CardHeader className="p-0 relative h-[320px] overflow-hidden">
        {tag && (
          <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black font-bold uppercase text-[10px] tracking-widest border-none">
            {tag}
          </Badge>
        )}

        {isOutStock && (
          <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
            <span className="text-white font-black uppercase italic border-2 border-white px-4 py-2 -rotate-12">
              Esgotado
            </span>
          </div>
        )}

        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            isOutStock
              ? "grayscale opacity-50"
              : "opacity-90 group-hover:opacity-100",
          )}
        />
      </CardHeader>

      {/* Detalhes do Produto */}
      <CardContent className="pt-5 space-y-1">
        <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">
          {category}
        </p>
        <CardTitle className="text-white text-lg font-bold tracking-tight line-clamp-1 group-hover:text-green-400 transition-colors">
          {name}
        </CardTitle>
        <div className="pt-2">
          <span className="text-2xl font-black text-white tracking-tighter italic">
            {price}
          </span>
        </div>
      </CardContent>

      {/* Ação de Compra */}
      <CardFooter className="pb-6">
        <Button
          disabled={isOutStock}
          className={cn(
            "w-full font-bold uppercase tracking-tighter transition-all duration-300",
            isOutStock
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-green-500 hover:scale-[1.02] active:scale-95",
          )}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutStock ? "Indisponível" : "Adicionar ao Carrinho"}
        </Button>
      </CardFooter>
    </Card>
  );
}
