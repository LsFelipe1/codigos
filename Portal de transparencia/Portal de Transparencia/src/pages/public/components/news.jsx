import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mockNews from "../../../../modules/blog/data/news";
import { fetchNews } from "../../../../src/services/api";

export default function Newsletter() {
  const [featured, setFeatured] = useState(null);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHomeNews() {
      try {
        setIsLoading(true);
        const data = await fetchNews();

        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((item) => item.status !== "Rascunho" && item.status !== "Arquivado");
          const list = published.length > 0 ? published : data;

          setFeatured(list[0] || null);
          setSecondaryNews(list.slice(1, 4));
        } else {
          setFeatured(mockNews[0] || null);
          setSecondaryNews(mockNews.slice(1, 4));
        }
      } catch (err) {
        console.warn("API indisponível no Newsletter. Usando fallback local.");
        setFeatured(mockNews[0] || null);
        setSecondaryNews(mockNews.slice(1, 4));
      } finally {
        setIsLoading(false);
      }
    }

    loadHomeNews();
  }, []);

  return (
    <section className="bg-[#F6F8F5] border-b-[3px] border-[#16211C] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#FFC531] px-3 py-1 text-xs font-black uppercase text-[#16211C]">
              Informativos & Blog
            </span>
            <h2 className="mt-2 text-2xl font-black text-[#16211C] sm:text-3xl">
              Últimas Notícias do Mandato
            </h2>
          </div>

          <Link
            to="/noticias"
            className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
          >
            Ver todas as matérias →
          </Link>
        </div>

        {/* ESTRUTURA DE DESTAQUE + NOTÍCIAS SECUNDÁRIAS */}
        {isLoading ? (
          <div className="mt-10 flex justify-center py-16">
            <span className="text-xs font-black uppercase text-[#16211C]">Carregando destaques do blog...</span>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* CARD DE DESTAQUE PRINCIPAL */}
            {featured && (
              <article className="group relative flex flex-col justify-between rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(22,33,28,1)] lg:col-span-2 md:p-8">
                <div>
                  {/* IMAGEM DO DESTAQUE */}
                  {featured.image ? (
                    <div className="h-64 md:h-80 w-full overflow-hidden rounded-xl border-2 border-[#16211C] bg-[#E8EFFA]">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#E8EFFA] font-black text-sm text-[#1B4FA0] uppercase">
                      Informativo em Destaque
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border-2 border-[#16211C] bg-[#FFC531] px-3 py-1 font-mono text-[11px] font-black uppercase text-[#16211C]">
                      {featured.tag}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#4E5C55]">
                      {featured.date}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-black leading-snug text-[#16211C] md:text-2xl">
                    {featured.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[#4E5C55] md:text-sm line-clamp-3">
                    {featured.description}
                  </p>
                </div>

                <div className="mt-8 border-t-2 border-dashed border-[#DEE6E0] pt-4">
                  <Link
                    to={`/noticias/${featured.id}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
                  >
                    <span>Ler matéria completa em destaque</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            )}

            {/* LISTA SECUNDÁRIA DE NOTÍCIAS */}
            <div className="flex flex-col gap-6">
              {secondaryNews.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl border-[2.5px] border-[#16211C] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="rounded-full border border-[#16211C] bg-[#E8EFFA] px-2.5 py-0.5 font-mono font-black uppercase text-[#1B4FA0]">
                        {item.tag}
                      </span>
                      <span className="font-mono text-[#4E5C55] font-bold">{item.date}</span>
                    </div>

                    <h4 className="mt-2 text-sm font-black leading-snug text-[#16211C] line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-[#4E5C55] line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    to={`/noticias/${item.id}`}
                    className="mt-4 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
                  >
                    Ler matéria →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}