import { Link } from 'react-router-dom';
import news from '../../../modules/blog/data/news';
import FeaturedNewsCard from './featuredNews';

export default function NewsCard() {
  if (!news || news.length === 0) return null;

  const featuredNews = news[0];
  const secondaryNews = news.slice(1, 4);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
      {/* NOTÍCIA DESTAQUE */}
      <div className="lg:col-span-7">
        <FeaturedNewsCard featured={featuredNews} />
      </div>

      {/* LISTA SECUNDÁRIA COM THUMBS COMPACTAS */}
      <div className="flex flex-col gap-4 lg:col-span-5">
        {secondaryNews.map((item) => (
          <Link
            to={`/noticias/${item.id}`}
            key={item.id}
            className="group flex items-center gap-4 rounded-xl border-[2.5px] border-[#16211C] bg-white p-3 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
          >
            {/* THUMB PEQUENA COM FALLBACK ESTILIZADO NEO-BRUTALISTA */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 shrink-0 rounded-lg border-2 border-[#16211C] object-cover bg-[#E8EFFA]"
              />
            ) : (
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#16211C] bg-linear-to-br from-[#E4F5EA] to-[#E8EFFA]">
                {/* Detalhe geométrico ao fundo */}
                <div className="absolute -right-3 -top-3 h-10 w-10 rounded-full border border-[#16211C] bg-[#FFC531] opacity-70" />
                
                {/* Badge com iniciais estilizado */}
                <div className="relative z-10 flex h-9 w-9 -rotate-3 items-center justify-center rounded-md border-2 border-[#16211C] bg-[#1B4FA0] font-black text-xs text-white shadow-[2px_2px_0px_0px_rgba(22,33,28,1)]">
                  RL
                </div>
              </div>
            )}

            {/* CONTEÚDO */}
            <div className="flex flex-col justify-between min-w-0 flex-1">
              <div>
                <span className="inline-block rounded-full border border-[#16211C] bg-[#FFC531] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-[#16211C]">
                  {item.tag}
                </span>

                <h3 className="mt-1 text-xs font-black leading-snug text-[#16211C] line-clamp-2 group-hover:text-[#1B4FA0] transition-colors">
                  {item.title}
                </h3>
              </div>

              <span className="mt-2 font-mono text-[10px] font-bold uppercase text-[#4E5C55]">
                {item.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}