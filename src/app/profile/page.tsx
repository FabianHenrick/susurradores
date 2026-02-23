// src/app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Camera, Loader2, Save, User as UserIcon, 
  Shield, ArrowLeft, MapPin, CreditCard, IdCard, Mail, Phone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Estados para os campos do perfil
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [discord, setDiscord] = useState("");

  // Estados específicos para Endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");

  // --- FUNÇÕES DE MÁSCARA (Reutilizáveis) ---
  const formatCPF = (value: string) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const formatCEP = (value: string) => {
    if (!value) return "";
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  };

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const meta = user.user_metadata;
        
        // Aplicando as máscaras ao carregar os dados do banco
        setNickname(meta.nickname || "");
        setFullName(meta.full_name || "");
        setCpf(formatCPF(meta.cpf || ""));
        setPhone(formatPhone(meta.phone || ""));
        setDiscord(meta.discord || "");
        
        setCep(formatCEP(meta.cep || ""));
        setLogradouro(meta.logradouro || "");
        setBairro(meta.bairro || "");
        setCidade(meta.cidade || "");
        setUf(meta.uf || "");
        setNumero(meta.numero || "");
      }
    }
    loadUser();
  }, [supabase]);

  const handleCepBlur = async () => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    try {
      setSearchingCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setUf(data.uf);
        toast.success("Localização identificada!");
      } else {
        toast.error("CEP não encontrado.");
      }
    } catch (error) {
      toast.error("Erro ao buscar endereço.");
    } finally {
      setSearchingCep(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { 
          nickname,
          full_name: fullName,
          cpf, // Salva com a máscara para manter o padrão
          phone,
          discord,
          cep,
          logradouro,
          bairro,
          cidade,
          uf,
          numero,
          address: `${logradouro}, ${numero} - ${bairro}, ${cidade}/${uf}`
        }
      });
      if (error) throw error;
      toast.success("Perfil sincronizado!", {
        description: "As alterações foram gravadas no banco de dados."
      });
    } catch (error: any) {
      toast.error("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });

      toast.success("Foto atualizada!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      toast.error("Erro no upload: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-green-500" size={40} /></div>;

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/" className="text-zinc-500 hover:text-green-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Voltar para o QG
          </Link>
          <div className="bg-zinc-900 border border-white/10 px-4 py-2 flex items-center gap-3">
            <Shield size={16} className="text-green-500" />
            <div>
              <p className="text-[8px] text-zinc-500 font-bold uppercase leading-none">Status da Conta</p>
              <p className="text-sm font-black text-white italic uppercase tracking-tighter">{user.user_metadata.plan || "Nenhum Plano"}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Avatar Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-950 border border-white/5 p-8 flex flex-col items-center text-center">
              <div className="relative h-48 w-48 mb-6 group">
                <div className="h-full w-full rounded-full border-2 border-green-500 overflow-hidden bg-zinc-900 relative shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                  {user.user_metadata.avatar_url ? (
                    <Image src={user.user_metadata.avatar_url} alt="Avatar" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-zinc-800"><UserIcon size={80} /></div>
                  )}
                  <label className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <Camera className="text-green-500 mb-2" size={30} />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Mudar Foto</span>
                    <input type="file" className="hidden" onChange={handleUploadAvatar} accept="image/*" />
                  </label>
                </div>
              </div>
              <div className="space-y-1 w-full">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Codinome Operacional</label>
                <Input value={nickname} onChange={(e) => setNickname(e.target.value)} className="bg-black border-zinc-800 text-green-500 text-center text-xl font-black italic uppercase h-14" />
              </div>
            </div>
          </div>

          {/* Form Col */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-950 border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <IdCard className="text-green-500" />
                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Ficha de Identificação</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><UserIcon size={12} /> Nome Completo</label>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-black/50 border-zinc-800 text-white h-12" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><CreditCard size={12} /> CPF</label>
                  <Input 
                    value={cpf} 
                    onChange={(e) => setCpf(formatCPF(e.target.value))} 
                    placeholder="000.000.000-00" 
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Phone size={12} /> Telefone / WhatsApp</label>
                  <Input 
                    value={phone} 
                    onChange={(e) => setPhone(formatPhone(e.target.value))} 
                    placeholder="(00) 00000-0000" 
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">Discord Tag</label>
                  <Input value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="usuario#0000" className="bg-black/50 border-zinc-800 text-white h-12" />
                </div>
              </div>

              <div className="mt-10 flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <MapPin className="text-green-500" />
                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Endereço de Logística</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">CEP</label>
                  <div className="relative">
                    <Input 
                      value={cep} 
                      onChange={(e) => setCep(formatCEP(e.target.value))} 
                      onBlur={handleCepBlur}
                      placeholder="00000-000" 
                      className="bg-black/50 border-zinc-800 text-white h-12" 
                    />
                    {searchingCep && <Loader2 className="absolute right-3 top-3 animate-spin text-green-500" size={18} />}
                  </div>
                </div>

                <div className="md:col-span-3 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Rua/Logradouro</label>
                  <Input value={logradouro} readOnly className="bg-zinc-900 border-transparent text-zinc-400 h-12 italic" />
                </div>

                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nº</label>
                  <Input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Nº" className="bg-black/50 border-green-500/50 text-white h-12 font-bold" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bairro</label>
                  <Input value={bairro} readOnly className="bg-zinc-900 border-transparent text-zinc-400 h-12 italic" />
                </div>

                <div className="md:col-span-3 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Cidade</label>
                  <Input value={cidade} readOnly className="bg-zinc-900 border-transparent text-zinc-400 h-12 italic" />
                </div>

                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">UF</label>
                  <Input value={uf} readOnly className="bg-zinc-900 border-transparent text-zinc-400 h-12 italic" />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={loading}
                  className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-8 text-lg rounded-none shadow-[0_10px_30px_rgba(34,197,94,0.1)] transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-3"><Save size={20} /> Salvar Ficha de Operador</span>}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}