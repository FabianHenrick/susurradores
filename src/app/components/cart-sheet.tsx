"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 group outline-none">
          <ShoppingBag size={20} className="text-white group-hover:text-green-500 transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent className="bg-black border-l border-white/10 text-white w-full sm:max-w-md flex flex-col p-0">
        <div className="p-6 border-b border-white/5 bg-zinc-900/20">
          <SheetHeader>
            <SheetTitle className="text-white font-black italic uppercase tracking-tighter text-2xl flex items-center gap-2">
              Meu <span className="text-green-500">Arsenal</span>
              <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 not-italic tracking-normal">
                {cartCount} itens
              </span>
            </SheetTitle>
          </SheetHeader>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-30">
            <ShoppingCart size={64} strokeWidth={1} />
            <p className="uppercase font-bold text-xs tracking-[0.3em]">O arsenal está vazio</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-zinc-900/40 p-3 rounded-xl border border-white/5 hover:border-green-500/20 transition-all group">
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                      <Image src={item.image || "/placeholder-product.png"} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm line-clamp-1 italic uppercase tracking-tighter">{item.name}</h4>
                      <p className="text-green-500 font-black text-sm mt-0.5">R$ {item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-black border border-white/5 rounded-md px-1 py-0.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-green-500">
                            <Minus size={12} />
                          </button>
                          <span className="mx-2 text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-green-500">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-500 p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="p-6 bg-zinc-950 border-t border-white/10 mt-auto">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 uppercase font-bold text-[10px] tracking-widest">Total do Pedido</span>
                  <span className="text-2xl font-black italic text-green-500">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-white text-black hover:bg-green-500 font-black uppercase italic py-7 text-lg rounded-full transition-all active:scale-95">
                  Concluir Arsenal
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}