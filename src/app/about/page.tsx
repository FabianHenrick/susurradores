

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Mail, Instagram, Phone } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
            SUSSURRADORES <span className="text-green-500">E-SPORTS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Transformando talentos em oportunidades reais.
          </p>
        </div>
      </section>

      <main className="container max-w-5xl py-16 px-6 space-y-20">
        
        {/* Quem Somos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-4">Quem Somos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Sussurradores E-Sports é uma organização gamer que transforma talentos em oportunidades reais. 
              Oferecemos espaço e estrutura para jogadores que, por limitações financeiras ou falta de oportunidades, 
              não conseguem se dedicar totalmente ao cenário competitivo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Mais que um time, somos uma plataforma de crescimento que apoia jogadores e suas famílias, 
              construindo histórias inspiradoras dentro e fora do universo dos games.
            </p>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden border border-green-500/30">
             <Image 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e" 
                alt="Gaming Setup" 
                fill 
                className="object-cover opacity-80"
             />
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary/50 border-none">
            <CardHeader>
              <CardTitle className="text-green-500">Missão</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
             Abrir portas para talentos do cenário gamer, promovendo inclusão, diversidade e suporte profissional.
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border-none">
            <CardHeader>
              <CardTitle className="text-green-500">Visão</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Consolidar-se nacionalmente em três anos, ampliando a base de atletas e projetos sociais.
            </CardContent>
          </Card>
          <Card className="bg-secondary/50 border-none">
            <CardHeader>
              <CardTitle className="text-green-500">Diferencial</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Investimos em projetos que transformam vidas, alcançando não só jogadores, mas famílias e comunidades.
            </CardContent>
          </Card>
        </div>

        {/* Projetos Sociais */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Projetos Sociais</h2>
            <p className="text-muted-foreground mt-2">Nossa marca vai além do universo gamer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-4 border rounded-lg">
              <div className="h-12 w-12 bg-green-500 flex items-center justify-center rounded-full shrink-0 font-bold text-black">+</div>
              <div>
                <h3 className="font-bold">Sangue Verde e Preto</h3>
                <p className="text-sm text-muted-foreground">Incentivo à doação de sangue por jogadores, staff e comunidade.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border rounded-lg">
              <div className="h-12 w-12 bg-green-500 flex items-center justify-center rounded-full shrink-0 font-bold text-black">+</div>
              <div>
                <h3 className="font-bold">Jogue por Nós</h3>
                <p className="text-sm text-muted-foreground">Arrecadação e distribuição de cestas básicas para famílias em vulnerabilidade.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Contato */}
        <section className="flex flex-col items-center text-center pb-20">
          <h2 className="text-3xl font-bold mb-8">Seja Nosso Parceiro</h2>
          <p className="max-w-2xl text-muted-foreground mb-10">
            Buscamos marcas que acreditam no poder transformador dos eSports para construir um futuro mais inclusivo e inspirador.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center gap-2">
              <Phone className="text-green-500" />
              <span className="font-medium text-sm">(11) 9 5114-7525 </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="text-green-500" />
              <span className="font-medium text-sm">everton.sussurradores@gmail.com </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Instagram className="text-green-500" />
              <span className="font-medium text-sm">@sussurradores </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}