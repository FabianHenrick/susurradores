"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HomeCarousel() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      alt: "Arena de E-sports Profissional",
      label: "A NOVA ERA COMEÇOU",
    },
    {
      url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop",
      alt: "Setup Gamer de Alta Performance",
      label: "EQUIPE-SE COM A ELITE",
    },
    {
      url: "https://images.unsplash.com/photo-1560233023-5e5e9cf8f310?q=80&w=2070&auto=format&fit=crop",
      alt: "Competição Intensa",
      label: "DOMINE OS SERVIDORES",
    },
  ];

  return (
    <Carousel
      className="relative -mt-[80px] w-screen left-1/2 -translate-x-1/2 overflow-hidden"
      plugins={[
        Autoplay({
          delay: 8000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            {/* Definindo uma altura fixa de 600px para o banner ficar imponente */}
            <div className="relative h-[600px] md:h-[800px] w-full flex items-center justify-center overflow-hidden">
              {/* Overlay para dar contraste aos textos futuros e escurecer a imagem levemente */}
              <div className="absolute inset-0 bg-black/40 z-10" />
              
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                priority={index === 0} // Carrega a primeira imagem imediatamente
                className="object-cover transition-transform duration-[8000ms] ease-linear scale-100 group-hover:scale-110"
                sizes="100vw"
              />

              {/* Texto de Impacto opcional no centro do slide */}
              <div className="relative z-20 text-center px-4">
                <h2 className="text-white text-5xl md:text-8xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
                  {slide.label}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Setas de navegação customizadas para o tema dark */}
      <CarouselPrevious className="left-8 z-30 bg-white/10 border-white/20 text-white hover:bg-green-500 hover:text-black transition-all" />
      <CarouselNext className="right-8 z-30 bg-white/10 border-white/20 text-white hover:bg-green-500 hover:text-black transition-all" />
    </Carousel>
  );
}