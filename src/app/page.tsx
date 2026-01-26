"use client";

import Image from "next/image"; // Certifique-se desta importação para evitar o erro ts(2786)
import Link from "next/link";
import HomeCarousel from "@/components/home-carousel";
import Newscard from "./components/newscard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, ShoppingBag, Users, ChevronRight, Star } from "lucide-react";

const latestNews = [
  {
    id: 1,
    title: "Sussurradores no EAFC",
    description:
      "Nossa modalidade principal conta com 3 atletas ativos participando de cerca de 2 campeonatos por mês.",
    image: "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png",
    category: "E-SPORTS",
  },
  {
    id: 2,
    title: "Projeto Sangue Verde e Preto",
    description:
      "Uma iniciativa de incentivo à doação de sangue por jogadores, staff e toda a nossa comunidade.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    category: "SOCIAL",
  },
  {
    id: 3,
    title: "Ação Social: Jogue por Nós",
    description:
      "Realizamos a arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    category: "SOCIAL",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* 1. HERO CAROUSEL */}
      <section className="w-full relative h-[70vh] md:h-[85vh]">
        <HomeCarousel />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
      </section>

      {/* 2. BARRA DE SOCIO (Estilo Premium) */}
      <section className="bg-green-500 py-6 z-20 border-y-2 border-white/10">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-black">
            <Star className="fill-black" />
            <p className="font-black italic uppercase tracking-tighter text-xl md:text-2xl">
              SÓCIO SOFREDOR: 20% OFF NA LOJA E CONTEÚDOS EXCLUSIVOS
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-black text-white border-none hover:bg-zinc-900 rounded-none font-black uppercase italic px-10"
          >
            SEJA MEMBRO
          </Button>
        </div>
      </section>

      {/* 3. SEÇÃO DE NOTÍCIAS */}
      <main className="container max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="border-l-8 border-green-500 pl-6">
            <Badge className="bg-green-500 text-black mb-2 font-bold uppercase tracking-widest">
              Newsfeed
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              ÚLTIMAS{" "}
              <span className="text-green-500 text-outline-green">
                NOTÍCIAS
              </span>
            </h2>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors uppercase font-black italic text-sm border-b border-transparent hover:border-green-500"
          >
            Ver tudo <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {latestNews.map((news) => (
            <div key={news.id} className="relative group overflow-hidden">
              <Newscard
                title={news.title}
                description={news.description}
                image={news.image}
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-black font-black italic border-none">
                  {news.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. CTA LOJA (Vesta o Manto) */}
      <section className="relative py-32 bg-zinc-950 overflow-hidden border-y border-white/5">
        <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8]">
              VESTA O <br />
              <span className="text-green-500">MANTO.</span>
            </h2>
            <p className="mt-8 text-zinc-400 text-lg max-w-md font-medium">
              A armadura oficial dos Sussurradores para a temporada 2026.
              Tecnologia Dry-Fit com a essência verde e preta.
            </p>
            <Button className="mt-10 bg-white text-black hover:bg-green-500 hover:text-black transition-all font-black uppercase italic px-12 py-8 text-xl rounded-none shadow-[10px_10px_0px_0px_rgba(34,197,94,1)]">
              <ShoppingBag className="mr-3" /> ACESSAR LOJA
            </Button>
          </div>
          <div className="order-1 md:order-2 relative h-[500px] border-2 border-green-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)]">
            <Image
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420"
              alt="Uniforme Oficial"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            {
              n: "12",
              label: "Títulos",
              icon: <Trophy className="text-green-500 w-8 h-8" />,
            },
            {
              n: "500K",
              label: "Fãs",
              icon: <Users className="text-green-500 w-8 h-8" />,
            },
            {
              n: "04",
              label: "Line-ups",
              icon: <Star className="text-green-500 w-8 h-8" />,
            },
            {
              n: "08",
              label: "Patrocínios",
              icon: <ShoppingBag className="text-green-500 w-8 h-8" />,
            },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="mb-4 flex justify-center group-hover:-translate-y-2 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-5xl font-black italic">{stat.n}</h3>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
