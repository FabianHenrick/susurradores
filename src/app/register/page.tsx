// src/app/register/page.tsx
"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  UserPlus, Loader2, Shield, ArrowLeft, MapPin, 
  CreditCard, IdCard, Phone, Mail, Lock, CheckCircle2,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);

  // Estados de Credenciais (Obrigatórios)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados de Perfil (Obrigatórios: Nickname e FullName)
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Estados Opcionais
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [discord, setDiscord] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  // --- MÁSCARAS ---
  const formatCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
  const formatPhone = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15);
  const formatCEP = (v: string) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

  const handleCepBlur = async () => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;
    try {
      setSearchingCep(true);
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setUf(data.uf);
        toast.success("Localização identificada!");
      }
    } finally {
      setSearchingCep(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de Senha
    if (password !== confirmPassword) {
      toast.error("Erro nas senhas", {
        description: "A confirmação de senha não coincide."
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            full_name: fullName,
            cpf: cpf || null,
            phone: phone || null,
            discord: discord || null,
            cep: cep || null,
            logradouro: logradouro || null,
            bairro: bairro || null,
            cidade: cidade || null,
            uf: uf || null,
            numero: numero || null,
            plan: "Recruta"
          }
        }
      });

      if (error) throw error;

      toast.success("Alistamento concluído!", {
        description: "Verifique sua caixa de entrada para validar o acesso."
      });
      router.push("/login");

    } catch (error: any) {
      toast.error("Erro no sistema", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <div className="min-h-screen bg-black pt-20 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full" />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/login" className="text-zinc-500 hover:text-green-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all">
            <ArrowLeft size={14} /> Retornar ao Login
          </Link>
          <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter mt-4">
            Novo <span className="text-green-500">Alistamento</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Campos marcados com <span className="text-green-500">*</span> são obrigatórios.</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Coluna 1: Obrigatórios */}
          <div className="space-y-6">
            <div className="bg-zinc-950/80 border border-green-500/20 p-6 rounded-sm shadow-[0_0_20px_rgba(34,197,94,0.05)]">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                <Shield size={18} className="text-green-500" />
                <h2 className="text-sm font-black text-white uppercase italic">Credenciais Obrigatórias</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">E-mail *</label>
                  <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black border-zinc-800" placeholder="exemplo@missao.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Senha *</label>
                    <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black border-zinc-800" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex justify-between">
                      Confirmar *
                      {passwordsMatch && <CheckCircle2 size={12} className="text-green-500 animate-pulse" />}
                    </label>
                    <Input 
                      type="password" 
                      required 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      className={`bg-black transition-colors ${passwordsMatch ? "border-green-500/50" : "border-zinc-800"}`} 
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nome Completo *</label>
                  <Input required value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-black border-zinc-800" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Codinome / Nickname *</label>
                  <Input required value={nickname} onChange={(e) => setNickname(e.target.value)} className="bg-black border-zinc-800" placeholder="Como quer ser chamado" />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-8 text-xl rounded-none transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-3"><UserPlus size={22} /> Criar Conta</span>}
            </Button>
          </div>

          {/* Coluna 2: Opcionais */}
          <div className="space-y-6">
            <div className="bg-zinc-950/40 border border-white/5 p-6 rounded-sm">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                <IdCard size={18} className="text-zinc-500" />
                <h2 className="text-sm font-black text-zinc-500 uppercase italic">Dados Opcionais</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CPF</label>
                  <Input value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder="000.000.000-00" className="bg-black border-zinc-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Telefone</label>
                  <Input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(00) 00000-0000" className="bg-black border-zinc-800" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Discord Tag</label>
                  <Input value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="usuario#0000" className="bg-black border-zinc-800" />
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mt-8 mb-6">
                <MapPin size={18} className="text-zinc-500" />
                <h2 className="text-sm font-black text-zinc-500 uppercase italic">Endereço Opcional</h2>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CEP</label>
                  <div className="relative">
                    <Input value={cep} onChange={(e) => setCep(formatCEP(e.target.value))} onBlur={handleCepBlur} className="bg-black border-zinc-800" />
                    {searchingCep && <Loader2 className="absolute right-2 top-2 animate-spin text-green-500" size={16} />}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Rua</label>
                  <Input value={logradouro} readOnly className="bg-zinc-900 border-transparent text-zinc-600" />
                </div>
                <div className="col-span-1 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nº</label>
                  <Input value={numero} onChange={(e) => setNumero(e.target.value)} className="bg-black border-zinc-800" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bairro</label>
                  <Input value={bairro} readOnly className="bg-zinc-900 border-transparent text-zinc-600" />
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}