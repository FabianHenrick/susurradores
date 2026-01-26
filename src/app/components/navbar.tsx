"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Twitter, Facebook } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Sobre" },
    { href: "/shop", label: "Shop" },
    { href: "/championships", label: "Campeonatos" },
    { href: "/teams", label: "Times" },
    { href: "/partner", label: "Sócio Sofredor", highlight: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Redes Sociais - Barra Superior Sólida no Mobile */}
      <div className="bg-black border-b border-green-500/20 py-1.5">
        <div className="container max-w-7xl mx-auto px-6 flex justify-center md:justify-end">
          <div className="flex gap-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-green-500 transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              <Twitter size={14} />
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              <Facebook size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Faixa Principal - Fundo sólido no Mobile para garantir contraste */}
      <div className="bg-black/95 md:bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="relative z-[110]">
            <Image
              src="/logo-susurradores.png"
              alt="Logo"
              width={110}
              height={110}
              className="md:w-[140px]"
            />
          </Link>

          {/* Nav Desktop */}
          <div className="hidden md:block bg-white rounded-full px-2 shadow-xl">
            <NavigationMenu>
              <NavigationMenuList className="h-10">
                {navLinks.map((link) => (
                  <NavItem key={link.label} {...link} />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Toggle Mobile - Botão com contraste alto */}
          <button
            className="md:hidden z-[110] p-2 bg-green-500 text-black rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Lateral (Drawer) */}
      <div
        className={cn(
          "fixed inset-0 bg-black z-[105] transition-transform duration-300 md:hidden flex flex-col pt-32 px-10",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-8 text-left border-l border-green-500/30 pl-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-3xl font-black uppercase italic tracking-tighter transition-all",
                link.highlight
                  ? "text-green-500"
                  : "text-white hover:text-green-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-20 text-gray-500 text-xs font-bold uppercase tracking-widest">
          Sussurradores E-Sports © 2026
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  label,
  highlight = false,
}: {
  href: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <NavigationMenuItem>
      <Link href={href} passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent text-black hover:text-green-600 font-bold px-4 text-xs uppercase transition-colors",
            highlight &&
              "bg-green-500 text-black hover:bg-black hover:text-white transition-all rounded-none h-full",
          )}
        >
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}
