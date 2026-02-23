
"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PLANS = [
  {
    name: "Recruta",
    price: "9,90",
    color: "zinc",
    benefits: [
      "Badge exclusivo no Discord",
      "10% de desconto na Loja",
      "Newsletter semanal",
    ],
    featured: false,
  },
  {
    name: "Sócio Sofredor",
    price: "29,90",
    color: "green",
    benefits: [
      "Tudo do Recruta",
      "20% de desconto na Loja",
      "Sorteios mensais de Skins",
      "Acesso ao TS da Staff",
    ],
    featured: true,
  },
  {
    name: "Lenda Verde",
    price: "59,90",
    color: "yellow",
    benefits: [
      "Tudo do Sócio",
      "Camiseta oficial anual grátis",
      "Encontro com jogadores (Digital)",
      "Voto em decisões do time",
    ],
    featured: false,
  },
];

export default function partner() {
  const supabase = createClient();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("Sócio Sofredor");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Estados do Formulário
  const [fullName, setFullName] = useState("");
  const [discord, setDiscord] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFullName(user.user_metadata.full_name || "");
        setDiscord(user.user_metadata.discord || "");
        setCpf(user.user_metadata.cpf || "");
      }
    }
    getUser();
  }, [supabase]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert("Soldado, você precisa estar logado para alistar-se em um plano!");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      // Aqui salvamos os dados da assinatura no metadata do usuário
      // Em um cenário real, aqui você chamaria a API do Stripe/Mercado Pago
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          discord: discord,
          cpf: cpf,
          plan: selectedPlan,
          subscription_status: "active",
          enlisted_at: new Date().toISOString()
        }
      });

      if (error) throw error;

      alert(`Alistamento confirmado! Bem-vindo ao plano ${selectedPlan}.`);
      router.push("/profile");

    } catch (error: any) {
      alert("Falha no alistamento: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <section className="relative py-32 border-b border-green-500/20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge className="bg-green-500 text-black mb-4 font-black">
            MEMBERSHIP 2026
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
            SÓCIO <span className="text-green-500">SOFREDOR</span>
          </h1>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto font-bold uppercase text-sm tracking-widest">
            Apoie a Sussurradora e ganhe vantagens exclusivas dentro e fora dos servidores.
          </p>
        </div>
      </section>

      <main className="container max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Seleção de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={cn(
                "bg-zinc-950 border-2 transition-all duration-500 cursor-pointer overflow-hidden relative",
                selectedPlan === plan.name
                  ? "border-green-500 scale-105 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                  : "border-white/10 hover:border-white/20",
              )}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-[10px] font-black px-4 py-1 uppercase italic tracking-tighter">
                  Mais Popular
                </div>
              )}

              <CardHeader className="text-center pt-10">
                <CardTitle
                  className={cn(
                    "text-3xl font-black italic uppercase tracking-tighter",
                    plan.color === "green"
                      ? "text-green-500"
                      : plan.color === "yellow"
                        ? "text-yellow-500"
                        : "text-white",
                  )}
                >
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-sm font-bold text-zinc-500 uppercase italic">R$</span>
                  <span className="text-5xl font-black italic tracking-tighter mx-1">{plan.price}</span>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">/ mês</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 py-8">
                {plan.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                    <CheckCircle2
                      className={cn(
                        "w-5 h-5",
                        selectedPlan === plan.name ? "text-green-500" : "text-zinc-700",
                      )}
                    />
                    {benefit}
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className={cn(
                    "w-full font-black uppercase italic py-6 rounded-none transition-all",
                    selectedPlan === plan.name
                      ? "bg-green-500 text-black"
                      : "bg-white/5 text-white hover:bg-white/10",
                  )}
                >
                  {selectedPlan === plan.name ? "PLANO SELECIONADO" : "ESCOLHER ESTE"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Formulário de Cadastro */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md">
            <div className="flex items-center gap-4 mb-10 border-l-4 border-green-500 pl-6">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                Finalizar Alistamento
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Nome Completo</label>
                <Input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome"
                  className="bg-black border-white/10 text-white rounded-none focus:border-green-500 h-12"
                />
              </div>
              <div className="space-y-2 opacity-60">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">E-mail de Login</label>
                <Input
                  disabled
                  value={user?.email || "Faca login primeiro"}
                  className="bg-zinc-900 border-white/5 text-zinc-400 rounded-none h-12 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Discord Tag</label>
                <Input
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="usuario#0000"
                  className="bg-black border-white/10 text-white rounded-none focus:border-green-500 h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">CPF</label>
                <Input
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                  className="bg-black border-white/10 text-white rounded-none focus:border-green-500 h-12"
                />
              </div>

              <div className="md:col-span-2 pt-6">
                <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-lg mb-8 flex items-start gap-4">
                  <ShieldCheck className="text-green-500 shrink-0" />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Ao clicar em "Finalizar Assinatura", você concorda com nossos termos de uso. 
                    O plano <strong>{selectedPlan}</strong> será vinculado à sua conta permanentemente.
                  </p>
                </div>

                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-8 text-xl rounded-none shadow-[10px_10px_0px_0px_rgba(34,197,94,0.1)] transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    `FINALIZAR ASSINATURA: ${selectedPlan.toUpperCase()}`
                  )}
                </Button>
                
                <Link href="/profile" className="block text-center mt-6 text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                   Acessar Perfil de Operador
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* FAQ */}
      <section className="container max-w-4xl mx-auto px-6 py-24 text-center">
        <h4 className="text-zinc-500 font-black uppercase italic tracking-widest mb-10">Dúvidas Frequentes</h4>
        <div className="grid gap-6 text-left text-sm text-zinc-400">
          <p><strong className="text-white">Posso cancelar quando quiser?</strong> Sim, sem multa ou fidelidade.</p>
          <p><strong className="text-white">Como recebo o desconto na loja?</strong> O desconto é vinculado ao seu e-mail de sócio automaticamente.</p>
          <p><strong className="text-white">A camiseta do plano Lenda é entregue quando?</strong> Após o 3º mês de assinatura ativa.</p>
        </div>
      </section>
    </div>
  );
}