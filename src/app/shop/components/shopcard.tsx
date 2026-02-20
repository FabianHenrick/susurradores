"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Importação essencial
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopCardProps {
  id: string; // Adicionamos o ID para a rota dinâmica
  name: string;
  price: string;
  category: string;
  image: string;
  tag?: string | null;
  isOutStock?: boolean;
}

export default function ShopCard({
  id,
  name,
  price,
  category,
  image,
  tag,
  isOutStock,
}: ShopCardProps) {
  return (
    /* O Link deve envolver o Card inteiro para que qualquer clique redirecione */
    <Link
      href={`/shop/${id}`}
      className={cn("block", isOutStock && "pointer-events-none")}
    >
      <Card className="group relative bg-zinc-900/50 border-white/5 overflow-hidden transition-all duration-500 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        {/* Imagem e Badge */}
        <CardHeader className="p-0 relative h-[320px] overflow-hidden">
          {tag && (
            <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black font-black uppercase text-[10px] tracking-widest border-none">
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

          {/* Overlay de Hover para dar feedback visual de clique */}
          <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
            <div className="bg-white text-black p-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform">
              <ShoppingCart size={20} />
            </div>
          </div>

          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-110",
              isOutStock ? "grayscale opacity-50" : "opacity-90",
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
            asChild // Importante: permite que o botão herde o comportamento do link
            disabled={isOutStock}
            className={cn(
              "w-full font-bold uppercase tracking-tighter transition-all duration-300",
              isOutStock
                ? "bg-zinc-800 text-zinc-500"
                : "bg-white text-black group-hover:bg-green-500",
            )}
          >
            <div>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isOutStock ? "Indisponível" : "Ver Detalhes"}
            </div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
