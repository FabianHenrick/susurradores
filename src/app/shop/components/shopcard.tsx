// src/app/shop/components/shopcard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  tag?: string | null;
  isOutStock?: boolean;
}

export default function ShopCard({ id, name, price, category, image, tag, isOutStock }: ShopCardProps) {
  // CORREÇÃO: Fallback caso a URL da imagem esteja vazia no banco
  const validImage = image && image.trim() !== "" ? image : "/placeholder-product.png";

  return (
    <Link 
      href={`/shop/${id}`} 
      className={cn("block group cursor-pointer", isOutStock && "pointer-events-none opacity-80")}
    >
      <Card className="group relative bg-zinc-900/50 border-white/5 overflow-hidden transition-all duration-500 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <CardHeader className="p-0 relative h-[320px] overflow-hidden bg-black">
          {tag && (
            <Badge className="absolute top-4 left-4 z-10 bg-green-500 text-black font-black uppercase text-[10px] tracking-widest border-none">
              {tag}
            </Badge>
          )}

          <Image
            src={validImage}
            alt={name}
            fill
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-110",
              isOutStock ? "grayscale opacity-50" : "opacity-90",
            )}
          />
        </CardHeader>

        <CardContent className="pt-5 space-y-1">
          <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {category}
          </p>
          <CardTitle className="text-white text-lg font-bold tracking-tight line-clamp-1 group-hover:text-green-400 transition-colors">
            {name}
          </CardTitle>
          <div className="pt-2 text-2xl font-black text-white italic tracking-tighter">
            {price}
          </div>
        </CardContent>

        <CardFooter className="pb-6">
          {/* CORREÇÃO: Adicionamos pointer-events-none para o botão não "roubar" o clique do Link pai */}
          <Button
            asChild
            disabled={isOutStock}
            className={cn(
              "w-full font-bold uppercase tracking-tighter transition-all duration-300 pointer-events-none",
              isOutStock ? "bg-zinc-800 text-zinc-500" : "bg-white text-black group-hover:bg-green-500",
            )}
          >
            <div className="flex items-center justify-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isOutStock ? "Indisponível" : "Ver Detalhes"}
            </div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}