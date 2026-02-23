// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, User as UserIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message === "Invalid login credentials" 
          ? "Credenciais inválidas, soldado." 
          : authError.message);
      } else {
        // Login bem-sucedido
        router.push("/shop"); // Ou para o dashboard
        router.refresh();
      }
    } catch (err) {
      setError("Falha crítica na comunicação com a base.");
    } finally {
      setIsLoading(false);
    }
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
            Identifique-se para entrar na rede.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase p-3 text-center tracking-widest">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-2">
                <UserIcon size={12} /> E-mail de Recruta
              </label>
              <Input
                type="email"
                placeholder="exemplo@sussurradores.com"
                className="bg-black/50 border-white/10 rounded-none h-12 focus:border-green-500 transition-all text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest flex items-center gap-2">
                <Lock size={12} /> Chave de Segurança
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-black/50 border-white/10 rounded-none h-12 focus:border-green-500 transition-all text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-7 text-lg rounded-none transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "AUTENTICAR SOLDADO"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              Ainda não tem acesso?{" "}
              <span 
                className="text-green-500 cursor-pointer hover:underline"
                onClick={() => router.push('/register')}
              >
                Solicitar Recrutamento
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}