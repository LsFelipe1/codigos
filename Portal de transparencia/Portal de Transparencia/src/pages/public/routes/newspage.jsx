import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import mockNews from "../../../../modules/blog/data/news";
import { fetchNews } from "../../../../src/services/api";
import Search from "../../../../components/UI/search";
import Tag from "../../../../components/UI/tag";
import Header from "../components/header";

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todas");

  useEffect(() => {
    async function loadPublicNews() {
      try {
        setIsLoading(true);
        const data = await fetchNews();
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((item) => item.status !== "Rascunho" && item.status !== "Arquivado");
          setNewsList(published.length > 0 ? published : data);
        } else {
          setNewsList(mockNews);
        }
      } catch (err) {
        console.warn("API indisponível. Exibindo dados de contingência do blog.");
        setNewsList(mockNews);
      } finally {
        setIsLoading(false);
      }
    }

    loadPublicNews();
  }, []);

  const categories = ["Todas", "Saúde", "Educação", "Infraestrutura", "Segurança", "Obras", "Política", "Comunidade"];

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const term = search.toLowerCase();
      const matchesSearch =
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.tag?.toLowerCase().includes(term);

      const matchesTag = selectedTag === "Todas" || item.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [newsList, search, selectedTag]);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const listNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];

  return (
    <>
      <Header />
      <div className="relative overflow-hidden bg-[#F6F8F5] py-12 md:py-20 border-b-[3px] border-[#16211C]">
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          
          {/* CABEÇALHO DA PÁGINA */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3 max-w-2xl">
              <Tag nome="• Informativos e Ações" />
              <h1 className="text-3xl font-black text-[#16211C] sm:text-4xl lg:text-5xl">
                Notícias do Mandato
              </h1>
              <p className="text-xs font-medium leading-relaxed text-[#4E5C55] sm:text-sm">
                Acompanhe as últimas matérias, fiscalizações de obras e ações desenvolvidas pelo Gabinete.
              </p>
            </div>

            <div className="w-full md:max-w-xs">
              <Search value={search} onChange={setSearch} placeholder="Pesquisar matéria..." />
            </div>
          </div>

          {/* FILTRO DE CATEGORIAS */}
          <div className="mt-8 flex flex-wrap gap-2 border-b-2 border-[#DEE6E0] pb-6">
            {categories.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-xl border-2 px-4 py-2 font-mono text-xs font-black uppercase transition cursor-pointer ${
                  selectedTag === tag
                    ? "border-[#16211C] bg-[#16211C] text-white shadow-[2px_2px_0px_0px_rgba(22,33,28,1)]"
                    : "border-[#16211C] bg-white text-[#16211C] hover:bg-[#FFF6DC]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* ESTADO DE CARREGAMENTO */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex items-center gap-3 rounded-2xl border-[2.5px] border-[#16211C] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#16211C] border-t-transparent" />
                <span className="text-xs font-black uppercase text-[#16211C]">Carregando notícias...</span>
              </div>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              
              {/* NOTÍCIA PRINCIPAL DESTAQUE */}
              {featuredNews && (
                <section className="group relative overflow-hidden rounded-2xl border-[3px] border-[#16211C] bg-white shadow-[5px_5px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    
                    {/* Imagem Destaque */}
                    <div className="relative md:col-span-5 h-60 md:h-auto overflow-hidden bg-[#E8EFFA] border-b-2 md:border-b-0 md:border-r-2 border-[#16211C]">
                      {featuredNews.image ? (
                        <img
                          src={featuredNews.image}
                          alt={featuredNews.title || "Notícia em destaque"}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : null}

                      <ImagePlaceholder altText={`Informativo do Gabinete: ${featuredNews.title}`} visible={!featuredNews.image} />

                      <span className="absolute left-3 top-3 rounded-full border-2 border-[#16211C] bg-[#FFC531] px-3 py-0.5 font-mono text-[10px] font-black uppercase text-[#16211C]">
                        ★ Destaque • {featuredNews.tag}
                      </span>
                    </div>

                    {/* Conteúdo Destaque */}
                    <div className="flex flex-col justify-between p-6 md:col-span-7">
                      <div>
                        <span className="font-mono text-[10px] font-bold uppercase text-[#4E5C55]">
                          {featuredNews.date}
                        </span>
                        <h2 className="mt-1.5 text-xl font-black text-[#16211C] sm:text-2xl leading-snug group-hover:text-[#1B4FA0] transition-colors">
                          {featuredNews.title}
                        </h2>
                        <p className="mt-2 text-xs leading-relaxed text-[#4E5C55] font-medium line-clamp-3">
                          {featuredNews.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-3 border-t-2 border-dashed border-[#DEE6E0]">
                        <Link
                          to={`/noticias/${featuredNews.id}`}
                          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#16211C] bg-[#16211C] px-4 py-2 font-mono text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                        >
                          <span>Ler Matéria Completa</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* LISTA SEQUENCIAL DE NOTÍCIAS */}
              {listNews.length > 0 && (
                <div className="space-y-4">
                  {listNews.map((item) => (
                    <article
                      key={item.id}
                      className="group flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border-[2.5px] border-[#16211C] bg-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
                    >
                      {/* Imagem Lateral */}
                      <div className="relative h-48 sm:h-auto sm:w-56 shrink-0 overflow-hidden border-b-2 sm:border-b-0 sm:border-r-2 border-[#16211C] bg-[#E8EFFA]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title || "Imagem da notícia"}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : null}

                        <ImagePlaceholder altText={`Informativo: ${item.title}`} visible={!item.image} />

                        <span className="absolute left-2.5 top-2.5 rounded-md border border-[#16211C] bg-[#FFC531] px-2 py-0.5 font-mono text-[9px] font-black uppercase text-[#16211C]">
                          {item.tag}
                        </span>
                      </div>

                      {/* Conteúdo Horizontal */}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase text-[#4E5C55]">
                            <span>{item.date}</span>
                          </div>

                          <h3 className="mt-1 text-base font-black leading-snug text-[#16211C] group-hover:text-[#1B4FA0] transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-[#4E5C55] font-medium line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-dashed border-[#DEE6E0] flex justify-end">
                          <Link
                            to={`/noticias/${item.id}`}
                            className="inline-flex items-center gap-1 font-mono text-xs font-black uppercase text-[#1B4FA0] hover:underline"
                          >
                            <span>Ler matéria</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ESTADO VAZIO */}
          {filteredNews.length === 0 && !isLoading && (
            <div className="mt-10 rounded-2xl border-2 border-dashed border-[#16211C] bg-white p-12 text-center">
              <h3 className="text-base font-black text-[#16211C]">Nenhuma matéria encontrada</h3>
              <p className="mt-1 text-xs text-[#4E5C55]">Tente selecionar outra categoria ou busque por outros termos.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

{/* PLACEHOLDER DE IMAGEM */}
function ImagePlaceholder({ altText, visible = true }) {
  return (
    <div
      role="img"
      aria-label={altText}
      style={{ display: visible ? "flex" : "none" }}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#E4F5EA] via-[#F6F8F5] to-[#E8EFFA]"
    >
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full border-2 border-[#16211C] bg-[#FFC531] opacity-60" />
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 -rotate-3 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#1B4FA0] font-black text-xs text-white shadow-[2px_2px_0px_0px_rgba(22,33,28,1)]">
          RL
        </div>
        <span className="font-mono text-[9px] font-black uppercase text-[#16211C] tracking-wider">
          Gabinete Digital
        </span>
      </div>
    </div>
  );
}