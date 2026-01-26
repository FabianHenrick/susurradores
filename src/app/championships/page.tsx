"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Trophy,
  Swords,
  AlertCircle,
  Calendar,
  Crown,
  MonitorPlay,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos de status para controlar o visual
type StatusType = "champion" | "ongoing" | "eliminated" | "upcoming";

interface Championship {
  id: string;
  name: string;
  game: string;
  image: string;
  phase: string; // Ex: "Fase de Grupos", "Playoffs", "Final"
  status: StatusType;
  date: string;
  placement?: string; // Ex: "1º Lugar", "Top 8"
}

const championships: Championship[] = [
  {
    id: "1",
    name: "Copa Nobru Season 10",
    game: "Free Fire",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    phase: "Grande Final",
    status: "champion",
    date: "Jan 2026",
    placement: "1º LUGAR",
  },
  {
    id: "2",
    name: "VCT Americas Kickoff",
    game: "Valorant",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop",
    phase: "Playoffs - Semifinal",
    status: "ongoing",
    date: "Fev 2026",
  },
  {
    id: "3",
    name: "LBFF Série A",
    game: "Free Fire",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    phase: "Fase de Grupos",
    status: "ongoing",
    date: "Mar 2026",
  },
  {
    id: "4",
    name: "Major Copenhagen",
    game: "CS2",
    image:
      "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
    phase: "Eliminados na Fase Suíça",
    status: "eliminated",
    date: "Jan 2026",
    placement: "Top 16",
  },
  {
    id: "5",
    name: "ESL Pro League",
    game: "CS2",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    phase: "Aguardando Sorteio",
    status: "upcoming",
    date: "Abr 2026",
  },
];

export default function Championships() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-black py-16 border-b border-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Trophy
            size={400}
            className="text-white -rotate-12 translate-x-20 -translate-y-10"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Badge className="bg-green-500 text-black mb-4 hover:bg-green-400 font-bold uppercase">
            Temporada 2026
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase">
            Campo de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">
              Batalha
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-sm font-bold tracking-widest uppercase">
            Acompanhe nossa trajetória rumo à glória eterna.
          </p>
        </div>
      </section>

      {/* Grid de Campeonatos */}
      <main className="container max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {championships.map((champ) => (
            <ChampionshipCard key={champ.id} data={champ} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Componente do Card Isolado
function ChampionshipCard({ data }: { data: Championship }) {
  const isChampion = data.status === "champion";
  const isEliminated = data.status === "eliminated";
  const isOngoing = data.status === "ongoing";

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 group border h-full flex flex-col",
        // Estilos Condicionais Baseados no Status
        isChampion
          ? "bg-black border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_50px_rgba(234,179,8,0.4)]"
          : isEliminated
            ? "bg-zinc-950 border-white/5 opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
            : "bg-zinc-900/50 border-green-500/20 hover:border-green-500",
      )}
    >
      {/* Faixa de Campeão (Se for o caso) */}
      {isChampion && (
        <div className="absolute top-0 right-0 z-20">
          <div className="bg-yellow-500 text-black text-[10px] font-black uppercase py-1 px-8 rotate-45 translate-x-8 translate-y-4 shadow-lg">
            Campeão
          </div>
        </div>
      )}

      <CardHeader className="p-0 relative h-48 overflow-hidden">
        {/* Overlay colorido na imagem */}
        <div
          className={cn(
            "absolute inset-0 z-10 transition-colors duration-500 mix-blend-multiply",
            isChampion
              ? "bg-yellow-500/20"
              : isEliminated
                ? "bg-black/60"
                : "bg-green-500/10",
          )}
        />

        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badge do Jogo */}
        <div className="absolute bottom-3 left-3 z-20">
          <Badge
            className={cn(
              "font-bold uppercase tracking-wider text-[10px] border-none",
              isChampion
                ? "bg-yellow-500 text-black"
                : "bg-black/80 text-white backdrop-blur-sm",
            )}
          >
            {data.game}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase">
            <Calendar size={12} /> {data.date}
          </span>
          {/* Status Icon */}
          {isChampion && (
            <Crown size={20} className="text-yellow-500 animate-pulse" />
          )}
          {isOngoing && (
            <MonitorPlay size={20} className="text-green-500 animate-pulse" />
          )}
          {isEliminated && <AlertCircle size={20} className="text-red-900" />}
        </div>

        <h3
          className={cn(
            "text-xl font-black italic uppercase leading-none mb-2",
            isChampion ? "text-yellow-500" : "text-white",
          )}
        >
          {data.name}
        </h3>

        <div className="flex items-center gap-2 mt-4">
          <Swords
            size={16}
            className={cn(isChampion ? "text-yellow-600" : "text-green-500")}
          />
          <p
            className={cn(
              "text-sm font-bold uppercase",
              isEliminated ? "text-red-900/70" : "text-gray-300",
            )}
          >
            {data.phase}
          </p>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "py-4 border-t",
          isChampion
            ? "border-yellow-500/20 bg-yellow-500/5"
            : "border-white/5 bg-black/20",
        )}
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            Status
          </span>
          <span
            className={cn(
              "text-xs font-black uppercase italic tracking-wider",
              isChampion
                ? "text-yellow-500"
                : isEliminated
                  ? "text-red-800 line-through decoration-2"
                  : "text-green-500",
            )}
          >
            {data.placement ||
              (isOngoing
                ? "Em Disputa"
                : isEliminated
                  ? "Eliminado"
                  : "Em breve")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
