"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, User as UserIcon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entraria a lógica do NextAuth
    console.log("Login tentado:", { email, password });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
          alt="Background"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-black to-black" />
      </div>

      <Card className="w-full max-w-md bg-zinc-950/80 border-green-500/30 backdrop-blur-xl z-10 relative">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-500 rounded-full">
              <ShieldCheck size={32} className="text-black" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">
            ACESSO <span className="text-green-500">RESTRITO</span>
          </CardTitle>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            Identifique-se, soldado.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-2">
                <UserIcon size={12} /> E-mail
              </label>
              <Input
                type="email"
                placeholder="exemplo@sussurradores.com"
                className="bg-black/50 border-white/10 rounded-none h-12 focus:border-green-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-2">
                <Lock size={12} /> Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-black/50 border-white/10 rounded-none h-12 focus:border-green-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-7 text-lg rounded-none">
              ENTRAR NO SISTEMA
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              Esqueceu as credenciais?{" "}
              <span className="text-green-500 cursor-pointer hover:underline">
                Falar com o Coach
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
