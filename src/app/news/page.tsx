// src/app/news/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ArrowRight, Newspaper } from "lucide-react";

// Este array pode ser movido para um arquivo separado para ser importado na Home
export const NEWS_DATA = [
  {
    id: "1",
    title: "Incursão em Tarkov: Novos protocolos de segurança",
    excerpt: "A central de comando emitiu novos protocolos para operadores que atuam nas zonas de conflito urbano.",
    date: "22 Fev, 2026",
    author: "Comando Geral",
    category: "Operacional",
    image: "https://images.unsplash.com/photo-1595593502237-974176936d6e?q=80&w=800&auto=format&fit=crop",
    content: "..."
  },
  {
    id: "2",
    title: "Atualização de Equipamento: Sensores Térmicos",
    excerpt: "Novos sensores térmicos de alta precisão chegaram ao estoque para membros do plano Elite.",
    date: "20 Fev, 2026",
    author: "Logística",
    category: "Equipamento",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    content: "..."
  },
  {
    id: "3",
    title: "Relatório de Inteligência: Zonas de Extração",
    excerpt: "Mapeamento completo das zonas de extração mais seguras para o próximo final de semana.",
    date: "18 Fev, 2026",
    author: "Inteligência",
    category: "Estratégia",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    content: "..."
  },
  {
    id: "4",
    title: "Expansão da Rede Susurradores",
    excerpt: "Nossa rede de comunicações agora cobre novas áreas remotas no leste europeu.",
    date: "15 Fev, 2026",
    author: "Comunicações",
    category: "Rede",
    image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?q=80&w=800&auto=format&fit=crop",
    content: "..."
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-green-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <Link href="/" className="text-zinc-500 hover:text-green-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all">
              <ArrowLeft size={14} /> Voltar ao Início
            </Link>
            <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">
              Central de <span className="text-green-500 underline decoration-green-500/30">Notícias</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 bg-zinc-900/50 border border-white/5 p-4 backdrop-blur-sm">
            <Newspaper className="text-green-500" size={32} />
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase leading-none">Status da Rede</p>
              <p className="text-sm font-black text-green-500 uppercase tracking-tighter">Sinal Criptografado</p>
            </div>
          </div>
        </div>

        {/* Notícia em Destaque (Primeira do array) */}
        <div className="mb-16 group cursor-pointer">
          <Link href={`/news/${NEWS_DATA[0].id}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 bg-zinc-950 border border-white/5 overflow-hidden hover:border-green-500/30 transition-all">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <Image 
                  src={NEWS_DATA[0].image} 
                  alt={NEWS_DATA[0].title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Destaque
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={12}/> {NEWS_DATA[0].date}</span>
                  <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                  <span className="flex items-center gap-1 text-green-500">{NEWS_DATA[0].category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase leading-none group-hover:text-green-500 transition-colors">
                  {NEWS_DATA[0].title}
                </h2>
                <p className="text-zinc-400 font-medium leading-relaxed">
                  {NEWS_DATA[0].excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-white font-black uppercase text-xs italic tracking-widest group-hover:gap-4 transition-all">
                  Ler relatório completo <ArrowRight size={16} className="text-green-500" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid de Notícias Secundárias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_DATA.slice(1).map((item) => (
            <Link href={`/news/${item.id}`} key={item.id} className="group">
              <div className="bg-zinc-950/50 border border-white/5 h-full flex flex-col hover:border-green-500/20 transition-all">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-md px-4 py-2 text-[9px] font-black text-white uppercase">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-bold text-zinc-600 uppercase">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                    <span className="flex items-center gap-1"><User size={12}/> {item.author}</span>
                  </div>
                  <h3 className="text-xl font-black italic text-white uppercase leading-tight group-hover:text-green-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-medium leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-white uppercase italic group-hover:text-green-500 transition-colors">
                    Acessar <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}