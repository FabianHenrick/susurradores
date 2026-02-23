// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Mail, Lock, User as UserIcon, Loader2, ArrowLeft, Ghost } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            nickname: nickname,
            avatar_url: "", 
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (err) {
      setError("Falha no recrutamento. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="https://images.unsplash.com/photo-1511512578047-dfb367046420" alt="BG" fill className="object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 via-black to-black" />
      </div>

      <Card className="w-full max-w-md bg-zinc-950/80 border-green-500/30 backdrop-blur-xl z-10 relative">
        <CardHeader className="space-y-1 text-center">
          <Link href="/login" className="text-zinc-500 hover:text-green-500 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors mb-4 w-fit">
            <ArrowLeft size={12} /> Voltar ao Login
          </Link>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-500 rounded-full text-black"><UserPlus size={32} /></div>
          </div>
          <CardTitle className="text-3xl font-black italic uppercase tracking-tighter text-white">
            NOVO <span className="text-green-500">RECRUTA</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {success ? (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-xs font-bold uppercase p-6 text-center tracking-widest">
              Alistamento concluído! Redirecionando...
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase p-3 text-center">{error}</div>}
              
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2"><UserIcon size={12} /> Nome Real</label>
                <Input type="text" className="bg-black/50 border-white/10 text-white" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-green-500 flex items-center gap-2"><Ghost size={12} /> Apelido (Nickname)</label>
                <Input type="text" className="bg-black/50 border-green-500/20 text-white focus:border-green-500" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2"><Mail size={12} /> E-mail</label>
                <Input type="email" className="bg-black/50 border-white/10 text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 flex items-center gap-2"><Lock size={12} /> Senha</label>
                <Input type="password" className="bg-black/50 border-white/10 text-white" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-6 rounded-none mt-4">
                {isLoading ? <Loader2 className="animate-spin" /> : "FINALIZAR ALISTAMENTO"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}