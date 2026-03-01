"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Twitter, User as UserIcon, Shield } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { CartSheet } from "@/app/components/cart-sheet";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Sobre" },
    { href: "/shop", label: "Shop" },
    { href: "/teams", label: "Times" },
    { href: "/partner", label: "Sócio Sofredor", highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Barra Superior */}
      <div className="bg-black border-b border-green-500/20 py-1.5">
        <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="hidden md:flex gap-4 text-gray-400">
             <Instagram size={14} className="hover:text-green-500 cursor-pointer" />
             <Twitter size={14} className="hover:text-green-500 cursor-pointer" />
          </div>

          <div className="flex items-center gap-6 ml-auto">
            {/* CARRINHO NO DESKTOP */}
            <div className="hidden md:block">
               <CartSheet />
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-green-500 font-black italic uppercase leading-none">
                    {user.user_metadata.nickname || "REC-001"}
                  </p>
                  <button onClick={handleLogout} className="text-[8px] text-zinc-500 hover:text-red-500 font-bold uppercase tracking-tighter">
                    Encerrar Sessão
                  </button>
                </div>
                <Link href="/profile" className="h-9 w-9 rounded-full border border-green-500/50 p-0.5 hover:border-green-500 transition-all overflow-hidden bg-zinc-900 relative">
                  {user.user_metadata.avatar_url ? (
                    <Image src={user.user_metadata.avatar_url} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-green-500"><UserIcon size={18} /></div>
                  )}
                </Link>
              </div>
            ) : (
              <Link href="/login" className="text-[10px] font-black text-white hover:text-green-500 uppercase tracking-widest flex items-center gap-2">
                <Shield size={12} className="text-green-500" /> Acesso ao QG
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Faixa Principal */}
      <div className="bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center h-16 md:h-20">
          <Link href="/"><Image src="/logo-susurradores.png" alt="Logo" width={120} height={120} /></Link>

          <div className="hidden md:block bg-white rounded-full px-2">
            <NavigationMenu>
              <NavigationMenuList className="h-10">
                {navLinks.map((link) => (
                  <NavItem key={link.label} {...link} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {/* CARRINHO NO MOBILE */}
            <CartSheet />
            <button className="p-2 bg-green-500 text-black rounded-sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, label, highlight = false }: { href: string; label: string; highlight?: boolean; }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href} className={cn(navigationMenuTriggerStyle(), "bg-transparent text-black font-bold px-4 text-xs uppercase", highlight && "bg-green-500 rounded-none h-full hover:bg-green-400")}>
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}