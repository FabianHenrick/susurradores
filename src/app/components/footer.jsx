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

export default function Footer() {
  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <h2 className="text-3xl text-white font-black italic tracking-tighter uppercase mb-4">
              SUSSURRADORES <span className="text-green-500">E-SPORTS</span>
            </h2>
            <p className="text-zinc-500 text-sm font-medium">
              Mais que um time, um movimento. Onde o silêncio precede a vitória.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-green-500 font-black uppercase italic text-sm">
                Organização
              </h4>
              <Link
                href="/about"
                className="text-zinc-400 hover:text-white text-xs font-bold uppercase"
              >
                Sobre Nós
              </Link>
              <Link
                href="/teams"
                className="text-zinc-400 hover:text-white text-xs font-bold uppercase"
              >
                Times
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-green-500 font-black uppercase italic text-sm">
                Suporte
              </h4>
              <Link
                href="/contato"
                className="text-zinc-400 hover:text-white text-xs font-bold uppercase"
              >
                Contato
              </Link>
              <Link
                href="/shop"
                className="text-zinc-400 hover:text-white text-xs font-bold uppercase"
              >
                FAQ Loja
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            © 2026 SUSSURRADORES. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">
            Created by Hendriko
          </p>
        </div>
      </div>
    </footer>
  );
}
