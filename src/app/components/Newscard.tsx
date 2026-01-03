import React from 'react'
import Image from 'next/image'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card'


interface NewsProps {
  title: string;
  description: string;
  image: string;
}

export default function Newscard({ title, description, image}:NewsProps) {


  
  return (
    <Card className="overflow-hidden max-w-sm hover:shadow-lg transition-shadow">
      {/* Área da Imagem */}
      <div className="relative h-48 w-full">
        <Image 
          src={image} 
          alt="Capa da notícia"
          fill
          className="object-cover"
        />
      </div>

      {/* Conteúdo do Texto */}
      <CardHeader>
        <CardTitle className="line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription>
          Publicado em 03 de Janeiro, 2026
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
         {description}
        </p>
      </CardContent>
    </Card>
  )
}