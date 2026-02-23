// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeCarousel from "@/components/home-carousel";
import Newscard from "./components/newscard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Trophy, ShoppingBag, Users, ChevronRight, 
  Star, Plus, Trash2, Loader2, ShieldAlert 
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // Estado para nova notícia
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: "",
    category: "E-SPORTS"
  });

  useEffect(() => {
    checkAdmin();
    fetchNews();
  }, []);

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(user?.user_metadata?.is_admin === true);
  }

  async function fetchNews() {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3); 

    if (data) setNewsList(data);
    setLoading(false);
  }

  async function handleCreateNews(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("posts").insert([newPost]);
    
    if (error) {
      alert("Erro ao publicar: " + error.message);
    } else {
      setNewPost({ title: "", description: "", image: "", category: "E-SPORTS" });
      setIsAdding(false);
      fetchNews();
    }
  }

  async function handleDeleteNews(id: string) {
    if (!confirm("Deseja deletar esta notícia permanentemente?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (!error) fetchNews();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO CAROUSEL */}
      <section className="w-full relative h-[70vh] md:h-[85vh]">
        <HomeCarousel />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
      </section>

      {/* 2. BARRA DE SOCIO */}
      <section className="bg-green-500 py-6 z-20 border-y-2 border-white/10">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-black">
            <Star className="fill-black" />
            <p className="font-black italic uppercase tracking-tighter text-xl md:text-2xl">
              SÓCIO SOFREDOR: 20% OFF NA LOJA E CONTEÚDOS EXCLUSIVOS
            </p>
          </div>
          <Link href="/socio">
            <Button
              variant="outline"
              className="bg-black text-white border-none hover:bg-zinc-900 rounded-none font-black uppercase italic px-10"
            >
              SEJA MEMBRO
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. SEÇÃO DE NOTÍCIAS (DINÂMICA) */}
      <main className="container max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="border-l-8 border-green-500 pl-6">
            <Badge className="bg-green-500 text-black mb-2 font-bold uppercase tracking-widest">
              Newsfeed
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
              ÚLTIMAS <span className="text-green-500">NOTÍCIAS</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            {isAdmin && (
              <Button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-white text-black font-black uppercase italic rounded-none hover:bg-green-500"
              >
                {isAdding ? "CANCELAR" : <><Plus className="mr-2" size={18}/> NOVO POST</>}
              </Button>
            )}
            <Link
              href="/news"
              className="group flex items-center gap-2 text-zinc-500 hover:text-green-500 transition-colors uppercase font-black italic text-sm border-b border-transparent hover:border-green-500"
            >
              Ver tudo <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        {/* Formulário Admin para Nova Notícia */}
        {isAdmin && isAdding && (
          <div className="mb-12 p-8 bg-zinc-950 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
            <h3 className="text-2xl font-black italic mb-6 uppercase flex items-center gap-2">
              <ShieldAlert className="text-green-500" /> Painel de Transmissão
            </h3>
            <form onSubmit={handleCreateNews} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Título da Notícia" 
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                className="bg-black border-zinc-800" required
              />
              <Input 
                placeholder="Categoria (Ex: E-SPORTS, SOCIAL)" 
                value={newPost.category}
                onChange={e => setNewPost({...newPost, category: e.target.value.toUpperCase()})}
                className="bg-black border-zinc-800" required
              />
              <Input 
                placeholder="URL da Imagem" 
                value={newPost.image}
                onChange={e => setNewPost({...newPost, image: e.target.value})}
                className="bg-black border-zinc-800 md:col-span-2" required
              />
              <Textarea 
                placeholder="Breve descrição..." 
                value={newPost.description}
                onChange={e => setNewPost({...newPost, description: e.target.value})}
                className="bg-black border-zinc-800 md:col-span-2" required
              />
              <Button type="submit" className="bg-green-500 text-black font-black uppercase italic md:col-span-2 py-6">
                PUBLICAR NA HOME
              </Button>
            </form>
          </div>
        )}

        {/* Grid de Notícias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loading ? (
            <div className="col-span-3 flex justify-center py-20"><Loader2 className="animate-spin text-green-500" size={40}/></div>
          ) : newsList.map((news) => (
            <div key={news.id} className="relative group overflow-hidden">
              <Newscard
                title={news.title}
                description={news.description}
                image={news.image}
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-green-500 text-black font-black italic border-none">
                  {news.category}
                </Badge>
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteNews(news.id)}
                    className="bg-red-600 p-1 hover:bg-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. CTA LOJA */}
      <section className="relative py-32 bg-zinc-950 overflow-hidden border-y border-white/5">
        <div className="container max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8]">
              VISTA O <br />
              <span className="text-green-500">MANTO.</span>
            </h2>
            <p className="mt-8 text-zinc-400 text-lg max-w-md font-medium">
              A armadura oficial dos Sussurradores para a temporada 2026.
              Tecnologia Dry-Fit com a essência verde e preta.
            </p>
            <Link href="/shop">
              <Button className="mt-10 bg-white text-black hover:bg-green-500 hover:text-black transition-all font-black uppercase italic px-12 py-8 text-xl rounded-none shadow-[10px_10px_0px_0px_rgba(34,197,94,1)]">
                <ShoppingBag className="mr-3" /> ACESSAR LOJA
              </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2 relative h-[500px] border-2 border-green-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)]">
            <Image
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420"
              alt="Uniforme Oficial"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { n: "12", label: "Títulos", icon: <Trophy className="text-green-500 w-8 h-8" /> },
            { n: "500K", label: "Fãs", icon: <Users className="text-green-500 w-8 h-8" /> },
            { n: "04", label: "Line-ups", icon: <Star className="text-green-500 w-8 h-8" /> },
            { n: "08", label: "Patrocínios", icon: <ShoppingBag className="text-green-500 w-8 h-8" /> },
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