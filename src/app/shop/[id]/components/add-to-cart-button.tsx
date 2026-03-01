"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCart, CartItem } from "@/context/cart-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; // ESTE É O IMPORT QUE ESTAVA FALTANDO

interface AddToCartButtonProps {
  product: CartItem;
  isOutStock: boolean;
}

export function AddToCartButton({ product, isOutStock }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setIsLoading(true);
    
    // Simula um pequeno delay para feedback visual de carregamento
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
      
      toast.success(`${product.name} adicionado!`, {
        description: "O item já está disponível no seu arsenal.",
        action: {
          label: "Ver Arsenal",
          onClick: () => {
            // Aqui você pode adicionar uma lógica para abrir o Sheet do carrinho se desejar
            console.log("Abrir carrinho");
          },
        },
      });
    }, 600);
  };

  return (
    <Button 
      onClick={handleAdd}
      disabled={isOutStock || isLoading}
      className={cn(
        "w-full h-20 rounded-full font-black uppercase text-xl transition-all shadow-xl",
        isOutStock 
          ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed" 
          : "bg-white text-black hover:bg-green-500 active:scale-95"
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" size={24} />
          <span>Preparando...</span>
        </div>
      ) : isOutStock ? (
        "Esgotado"
      ) : (
        <>
          <ShoppingCart className="mr-3" size={24} />
          Adicionar ao Arsenal
        </>
      )}
    </Button>
  );
}