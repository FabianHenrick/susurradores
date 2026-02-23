// src/app/shop/[id]/components/product-gallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ mainImage, allImages }: { mainImage: string; allImages: string[] }) {
  // Filtra apenas imagens válidas para compor a galeria
  const gallery = [mainImage, ...allImages].filter(img => img && img.trim() !== "");
  
  const [activeImage, setActiveImage] = useState(gallery[0] || "/placeholder-product.png");

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
        <Image
          src={activeImage}
          alt="Imagem do produto"
          fill
          className="object-cover transition-all duration-500"
          priority
        />
      </div>
      
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-zinc-900",
                activeImage === img ? "border-green-500" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}