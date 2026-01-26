"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Medal,
  Swords,
  Target,
  Shield,
  MousePointer2,
  Instagram,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos de dados
interface Player {
  id: string;
  nickname: string;
  fullName: string;
  game: "Free Fire" | "Valorant" | "CS2" | "League of Legends";
  role: string; // Ex: Rusher, IGL, Sniper
  image: string;
  titles: string[]; // Lista de campeonatos vencidos
  socials?: {
    instagram?: string;
    twitter?: string;
  };
}

// Mock de Jogadores
const PLAYERS_DATA: Player[] = [
  {
    id: "1",
    nickname: "NOBRU_FAKE",
    fullName: "Bruno Silva",
    game: "Free Fire",
    role: "Capitão / Rusher",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop", // Foto ilustrativa
    titles: ["Copa Nobru Season 10", "LBFF 2025"],
  },
  {
    id: "2",
    nickname: "Viper",
    fullName: "Lucas Mendes",
    game: "Valorant",
    role: "Duelista",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop",
    titles: [],
  },
  {
    id: "3",
    nickname: "Coldzera_Jr",
    fullName: "Marcelo David",
    game: "CS2",
    role: "AWPer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    titles: ["Major Copenhagen"],
  },
  {
    id: "4",
    nickname: "Faker_BR",
    fullName: "Lee Sang",
    game: "League of Legends",
    role: "Mid Laner",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    titles: ["CBLOL 2025 Split 1"],
  },
  {
    id: "5",
    nickname: "Two9_Clone",
    fullName: "Diogo Santos",
    game: "Free Fire",
    role: "Suporte",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    titles: ["Copa Nobru Season 10"],
  },
];

// Ícones auxiliares para cada jogo
const GameIcons = {
  "Free Fire": <Target className="w-4 h-4" />,
  Valorant: <Swords className="w-4 h-4" />,
  CS2: <Shield className="w-4 h-4" />,
  "League of Legends": <MousePointer2 className="w-4 h-4" />,
};

export default function TeamsPage() {
  const [filter, setFilter] = useState<string>("Todos");

  // Lógica de filtro
  const filteredPlayers =
    filter === "Todos"
      ? PLAYERS_DATA
      : PLAYERS_DATA.filter((player) => player.game === filter);

  // Extrair categorias únicas para os botões
  const categories = [
    "Todos",
    ...Array.from(new Set(PLAYERS_DATA.map((p) => p.game))),
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-black py-20 border-b border-green-500/20 relative">
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <Badge className="bg-green-500 text-black mb-4 hover:bg-green-400 font-bold uppercase tracking-widest">
            Nossas Lendas
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase">
            Line-ups{" "}
            <span className="text-outline-green text-transparent stroke-white">
              Oficiais
            </span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl text-sm font-bold tracking-[0.2em] uppercase">
            Conheça os guerreiros que vestem o manto.
          </p>
        </div>
      </section>

      <main className="container max-w-7xl mx-auto px-6 mt-12">
        {/* Filtros de Jogos */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-none font-black uppercase italic tracking-wider px-8 py-6 transition-all transform hover:-translate-y-1",
                filter === cat
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "bg-zinc-900 text-gray-400 hover:text-white border border-white/5",
              )}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid de Jogadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Componente Card de Jogador Isolado
function PlayerCard({ player }: { player: Player }) {
  const hasTitles = player.titles.length > 0;

  return (
    <Card className="group relative bg-zinc-900/40 border-green-500/10 hover:border-green-500 transition-all duration-500 overflow-hidden h-[450px] flex flex-col">
      {/* Imagem do Jogador com Efeito */}
      <CardHeader className="p-0 relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 z-10 transition-colors duration-500" />

        <Image
          src={player.image}
          alt={player.nickname}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />

        {/* Badge do Jogo no Topo */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-black/80 backdrop-blur-md text-green-500 border border-green-500/30 font-bold uppercase flex gap-2 items-center">
            {GameIcons[player.game]} {player.game}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-20 -mt-12 px-6">
        {/* Nome e Nick */}
        <div className="mb-4">
          <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase drop-shadow-lg group-hover:text-green-500 transition-colors">
            {player.nickname}
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            {player.fullName}
          </p>
        </div>

        {/* Função / Role */}
        <div className="inline-block bg-white/5 px-3 py-1 rounded text-[10px] font-bold text-green-500 uppercase tracking-widest border border-white/5 mb-4">
          {player.role}
        </div>

        {/* MEDALHAS DOURADAS - A Lógica Pedida */}
        {hasTitles && (
          <div className="space-y-2 mt-2">
            {player.titles.map((title, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-900/40 to-transparent border-l-2 border-yellow-500 pl-2 py-1 animate-in slide-in-from-left duration-500"
              >
                <Medal className="w-4 h-4 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                <span className="text-yellow-500 text-[10px] font-black uppercase tracking-wider shadow-black drop-shadow-md">
                  {title}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Redes Sociais no Hover (Opcional, mas dá um toque pro) */}
      <CardFooter className="mt-auto border-t border-white/5 p-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
        <span className="text-[10px] text-gray-500 font-bold uppercase">
          Siga o Player
        </span>
        <div className="flex gap-3 text-gray-400">
          <Instagram className="w-4 h-4 hover:text-green-500 cursor-pointer" />
          <Twitter className="w-4 h-4 hover:text-green-500 cursor-pointer" />
        </div>
      </CardFooter>
    </Card>
  );
}
