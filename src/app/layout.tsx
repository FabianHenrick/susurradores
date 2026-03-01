import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cart-context"; // Importando o contexto que criamos

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sussurradores | Loja Oficial",
  description: "Equipe-se com a armadura oficial da elite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* O Provider deve envolver tudo que precisará de dados do carrinho */}
        <CartProvider>
          <Navbar />
          
          <main className="pt-24 md:pt-24 min-h-screen">
            {children}
          </main>
          
          <Footer />
          
          <Toaster 
            theme="dark" 
            position="top-right" 
            richColors 
            closeButton
          />
        </CartProvider>
      </body>
    </html>
  );
}