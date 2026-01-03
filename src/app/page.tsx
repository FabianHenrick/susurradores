import { title } from "process";
import HomeCarousel from "../components/home-carousel";
import Newscard from "./components/Newscard";

export default function Home() {

const latestNews = [
 {
    id: 1,
    title: "Nova vitória no campeonato regional",
    description: "O time demonstrou garra e conquistou os três pontos fundamentais para a classificação.",
    image: "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
  },
  {
    id: 2,
    title: "Entrevista exclusiva com o capitão",
    description: "Confira o que o líder da equipe pensa sobre os próximos desafios da temporada.",
    image: "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
  },
  {
    id: 3,
    title: "Inscrições abertas para a base",
    description: "Saiba como participar da peneira que selecionará os novos talentos para o clube.",
    image: "https://imghost.com.br/ib/kKpPigTnnccF1v2_1756468419.png"
  }
]


  return (
    // Removi o grid complexo do container pai para facilitar o alinhamento vertical
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      
      <main className="w-full max-w-5xl flex flex-col gap-12"> 
        {/* flex-col: garante que fiquem um abaixo do outro
            gap-12: cria um espaçamento entre o carrossel e as notícias 
        */}
        <HomeCarousel />
        
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <Newscard 
            key={news.id}
            title={news.title}
            description={news.description}
            image={news.image}
              />
          ))}
          </div>
          
        </section>
      </main>

      <footer className="mt-auto flex gap-6 flex-wrap items-center justify-center">
        <p>created by © Hendriko</p>
      </footer>
    </div>
  );
}