// src/app/profile/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Camera, Loader2, Save, User as UserIcon, 
  Shield, ArrowLeft, MapPin, CreditCard, IdCard, Mail
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Estados para os campos do perfil
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [discord, setDiscord] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Preenche os campos com os metadados existentes
        setNickname(user.user_metadata.nickname || "");
        setFullName(user.user_metadata.full_name || "");
        setCpf(user.user_metadata.cpf || "");
        setAddress(user.user_metadata.address || "");
        setDiscord(user.user_metadata.discord || "");
      }
    }
    loadUser();
  }, [supabase]);

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl }
      });

      window.location.reload();
    } catch (error: any) {
      alert("Erro no upload: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { 
          nickname,
          full_name: fullName,
          cpf,
          address,
          discord
        }
      });
      if (error) throw error;
      alert("Ficha de operador atualizada com sucesso!");
    } catch (error: any) {
      alert("Erro ao salvar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-green-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Topo / Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/" className="text-zinc-500 hover:text-green-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors">
            <ArrowLeft size={14} /> Voltar para o QG
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 border border-white/10 px-4 py-2 flex items-center gap-3">
              <Shield size={16} className="text-green-500" />
              <div>
                <p className="text-[8px] text-zinc-500 font-bold uppercase leading-none">Plano Atual</p>
                <p className="text-sm font-black text-white italic uppercase tracking-tighter">
                  {user.user_metadata.plan || "Nenhum Plano"}
                </p>
              </div>
            </div>
            {!user.user_metadata.plan && (
              <Link href="/partner">
                <Button className="bg-green-500 text-black hover:bg-green-400 font-black text-[10px] h-10 px-6 rounded-none uppercase italic">
                  Fazer Upgrade
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna Esquerda: Avatar e Nickname */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-950 border border-white/5 p-8 flex flex-col items-center text-center">
              <div className="relative h-48 w-48 mb-6 group">
                <div className="h-full w-full rounded-full border-2 border-green-500 overflow-hidden bg-zinc-900 relative shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                  {user.user_metadata.avatar_url ? (
                    <Image src={user.user_metadata.avatar_url} alt="Avatar" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-zinc-800">
                      <UserIcon size={80} />
                    </div>
                  )}
                  <label className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    <Camera className="text-green-500 mb-2" size={30} />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Enviar Foto</span>
                    <input type="file" className="hidden" onChange={handleUploadAvatar} accept="image/*" />
                  </label>
                </div>
              </div>
              
              <div className="space-y-1 w-full">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Apelido no Servidor</label>
                <Input 
                  value={nickname} 
                  onChange={(e) => setNickname(e.target.value)}
                  className="bg-black border-zinc-800 text-green-500 text-center text-xl font-black italic uppercase focus:border-green-500 h-14"
                />
              </div>
            </div>
          </div>

          {/* Coluna Direita: Dados de Cadastro e Endereço */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-950 border border-white/5 p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <IdCard className="text-green-500" />
                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Informações Confidenciais</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Real */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <UserIcon size={12} /> Nome Completo
                  </label>
                  <Input 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>

                {/* CPF */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <CreditCard size={12} /> CPF
                  </label>
                  <Input 
                    value={cpf} 
                    onChange={(e) => setCpf(e.target.value)} 
                    placeholder="000.000.000-00"
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>

                {/* Email (Fixo) */}
                <div className="space-y-2 opacity-50">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} /> E-mail de Registro
                  </label>
                  <Input value={user.email} disabled className="bg-zinc-900 border-transparent text-zinc-400 h-12 italic cursor-not-allowed" />
                </div>

                {/* Discord */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    Discord Tag
                  </label>
                  <Input 
                    value={discord} 
                    onChange={(e) => setDiscord(e.target.value)} 
                    placeholder="usuario#0000"
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>

                {/* Endereço Completo */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} /> Endereço de Entrega (Para Kits/Prêmios)
                  </label>
                  <Input 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Rua, Número, Bairro, Cidade, Estado e CEP"
                    className="bg-black/50 border-zinc-800 text-white h-12" 
                  />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={loading}
                  className="w-full bg-green-500 text-black hover:bg-green-400 font-black uppercase italic py-8 text-lg rounded-none shadow-[0_10px_30px_rgba(34,197,94,0.1)] transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="flex items-center gap-3">
                      <Save size={20} /> Salvar Ficha de Operador
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}