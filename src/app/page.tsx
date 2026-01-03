
import HomeCarousel from "../components/home-carousel";
import Newscard from "./components/newscard";




const latestNews = [
  {
    id: 1,
    title: "Sussurradores no EAFC",
    description: "Nossa modalidade principal conta com 3 atletas ativos participando de cerca de 2 campeonatos por mês[cite: 37, 39].",
    image: "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
  },
  {
    id: 2,
    title: "Projeto Sangue Verde e Preto",
    description: "Uma iniciativa de incentivo à doação de sangue por jogadores, staff e toda a nossa comunidade[cite: 43, 44].",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e"
  },
  {
    id: 3,
    title: "Ação Social: Jogue por Nós",
    description: "Realizamos a arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade[cite: 45, 46].",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      <main className="w-full flex flex-col items-center">
        {/* Seção do Carrossel com ajuste de profundidade */}
        <section className="w-full relative">
          <HomeCarousel />
          {/* Efeito de sombra para suavizar a integração com o fundo */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* Seção de Notícias com o estilo institucional  */}
        <section className="container max-w-6xl px-6 py-16 -mt-12 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter border-l-4 border-green-500 pl-4">
              ÚLTIMAS <span className="text-green-500">NOTÍCIAS</span>
            </h2>
            <div className="hidden md:block h-[1px] flex-1 bg-green-500/20 mx-8"></div>
            <p className="text-[10px] font-mono text-green-500/50 uppercase tracking-[0.3em]">Sussurradores E-Sports</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <div key={news.id} className="transition-all duration-300 hover:scale-[1.02]">
                <Newscard 
                  title={news.title}
                  description={news.description}
                  image={news.image}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Estilizado conforme a identidade visual */}
      <footer className="w-full mt-auto py-12 border-t border-green-500/10 bg-zinc-950">
        <div className="container max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-lg font-black tracking-tighter italic">
              SUSSURRADORES <span className="text-green-500">E-SPORTS</span>
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Created by © Hendriko</p>
          </div>
          
          <nav className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            <a href="/about" className="hover:text-green-500 transition-colors">Quem Somos</a>
            <a href="#" className="hover:text-green-500 transition-colors">Projetos</a>
            <a href="#" className="hover:text-green-500 transition-colors">Contato</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}