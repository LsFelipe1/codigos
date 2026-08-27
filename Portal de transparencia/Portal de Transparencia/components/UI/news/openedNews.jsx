import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import mockNews from "../../../modules/blog/data/news";
import { fetchNewsById } from "../../../src/services/api";

export default function OpenedNews() {
  const { id } = useParams();
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);
        const data = await fetchNewsById(id);
        if (data && !data.error) {
          setSelectedNews(data);
        } else {
          const fallback = mockNews.find((item) => String(item.id) === String(id));
          setSelectedNews(fallback || null);
        }
      } catch (err) {
        console.warn("API indisponível. Recorrendo aos dados locais.");
        const fallback = mockNews.find((item) => String(item.id) === String(id));
        setSelectedNews(fallback || null);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F5] py-20">
        <div className="flex items-center gap-3 rounded-2xl border-[2.5px] border-[#16211C] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#16211C] border-t-transparent" />
          <span className="text-xs font-black uppercase text-[#16211C]">Carregando leitura...</span>
        </div>
      </div>
    );
  }

  if (!selectedNews) {
    return (
      <div className="min-h-screen bg-[#F6F8F5] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border-[3px] border-[#16211C] bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]">
          <h1 className="text-2xl font-black text-[#16211C]">Notícia não encontrada</h1>
          <p className="mt-2 text-xs font-bold text-[#4E5C55]">A publicação desejada não está disponível.</p>
          <Link
            to="/noticias"
            className="mt-6 inline-flex rounded-xl border-[2.5px] border-[#16211C] bg-[#FFC531] px-5 py-2.5 text-xs font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]"
          >
            ← Voltar para Notícias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#F6F8F5] pb-20 border-b-[3px] border-[#16211C]">
      {/* BARRA SUPERIOR DE VOLTAR */}
      <div className="border-b-2 border-[#DEE6E0] bg-white py-3.5">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
          >
            ← Voltar para todas as notícias
          </Link>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL DUAS COLUNAS */}
      <main className="mx-auto max-w-6xl px-6 pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          
          {/* ========================================================= */}
          {/* COLUNA DA ESQUERDA: MATÉRIA CLEAN COM EMBEDS DO INSTAGRAM  */}
          {/* ========================================================= */}
          <div className="space-y-6 lg:col-span-8">
            
            {/* CABEÇALHO DA MATÉRIA */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#16211C] bg-[#FFC531] px-3 py-0.5 font-mono text-[11px] font-black uppercase text-[#16211C]">
                  {selectedNews.tag}
                </span>
                <span className="font-mono text-xs font-bold text-[#4E5C55]">
                  {formatDate(selectedNews.date)}
                </span>
              </div>

              <h1 className="text-2xl font-black leading-tight text-[#16211C] sm:text-3xl lg:text-4xl">
                {selectedNews.title}
              </h1>

              {selectedNews.description && (
                <p className="text-sm font-medium leading-relaxed text-[#4E5C55] border-l-4 border-[#1B4FA0] pl-4 py-1">
                  {selectedNews.description}
                </p>
              )}
            </div>

            {/* IMAGEM DE CAPA DA MATÉRIA */}
            {selectedNews.image && (
              <div className="overflow-hidden rounded-2xl border-[2.5px] border-[#16211C] bg-white shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="max-h-105 w-full object-cover"
                />
              </div>
            )}

            {/* CORPO DO TEXTO (COM PROCESSAMENTO AUTOMÁTICO DE LINKS DO INSTAGRAM/YOUTUBE) */}
            <div className="rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
              <div className="text-sm sm:text-base leading-relaxed text-[#16211C] space-y-4">
                {renderFormattedContent(selectedNews.content || selectedNews.description)}
              </div>
            </div>

          </div>
          
          {/* COLUNA DA DIREITA: WIDGET REDES SOCIAIS (ESTILO ELFSIGHT)  */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div class="elfsight-app-914d22d8-2797-410c-8d09-61a129283da2" data-elfsight-app-lazy></div>

          </aside>

        </div>
      </main>
    </article>
  );
}

function renderFormattedContent(rawText) {
  if (!rawText) return null;

  // Divide o texto em blocos de parágrafos
  const paragraphs = rawText.split("\n");

  return paragraphs.map((paragraph, idx) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;

    // Regex para identificar URLs do Instagram (posts /p/ ou reels /reel/)
    const instaRegex = /(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)\/?)/gi;
    
    // Regex para identificar URLs do YouTube
    const ytRegex = /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})[^\s]*)/gi;

    const hasInstaMatch = instaRegex.test(trimmed);
    const hasYtMatch = ytRegex.test(trimmed);

    // CASO 1: O parágrafo contém um link do Instagram
    if (hasInstaMatch) {
      // Extrai a URL exata do Instagram
      const matches = trimmed.match(/(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)\/?)/i);
      if (matches && matches[0]) {
        const fullInstaUrl = matches[0];
        const postId = matches[2];

        // Texto restante (remove o link bruto para não duplicar no texto)
        const textWithoutUrl = trimmed.replace(fullInstaUrl, "").trim();

        return (
          <div key={idx} className="my-6 space-y-3">
            {textWithoutUrl && <p className="leading-relaxed">{textWithoutUrl}</p>}
            <RealInstagramEmbed url={fullInstaUrl} postId={postId} />
          </div>
        );
      }
    }

    // CASO 2: O parágrafo contém um link do YouTube
    if (hasYtMatch) {
      const embedUrl = getYouTubeEmbedUrl(trimmed);
      if (embedUrl) {
        return (
          <div key={idx} className="my-6 overflow-hidden rounded-2xl border-[2.5px] border-[#16211C] shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] aspect-video w-full bg-black">
            <iframe
              src={embedUrl}
              title="Vídeo do YouTube"
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        );
      }
    }

    // CASO 3: Parágrafo regular de texto
    return <p key={idx} className="leading-relaxed">{trimmed}</p>;
  });
}

// =========================================================================
// COMPONENTE DO EMBED REAL DO INSTAGRAM (UTILIZA IFRAME NATIVO + EMBED.JS)
// =========================================================================
function RealInstagramEmbed({ url, postId }) {
  useEffect(() => {
    // Carrega o script oficial do Instagram para formatar o embed se ainda não existir
    if (!window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  // Limpa e garante a URL de embed no formato correto
  const cleanUrl = url.endsWith("/") ? url : `${url}/`;
  const embedIframeUrl = `${cleanUrl}embed`;

  return (
    <div className="my-6 flex justify-center w-full">
      <div className="w-full max-w-135 overflow-hidden rounded-2xl border-[2.5px] border-[#16211C] bg-white p-3 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
        
        {/* IFRAME NATIVO DO INSTAGRAM (Carrega o vídeo/foto real) */}
        <iframe
          src={embedIframeUrl}
          title={`Post do Instagram ${postId}`}
          className="w-full min-h-120 sm:min-h-130 rounded-xl border-0"
          frameBorder="0"
          scrolling="no"
          allowTransparency="true"
          allow="encrypted-media"
        />

        {/* BARRINHA INFERIOR DE REDIRECIONAMENTO DIRETO */}
        <div className="mt-2 flex items-center justify-between border-t border-dashed border-[#DEE6E0] pt-2 px-1">
          <span className="font-mono text-[10px] font-bold text-[#4E5C55]">
            📷 Publicação Oficial
          </span>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-black uppercase text-[#1B4FA0] hover:underline"
          >
            Abrir no app do Instagram →
          </a>
        </div>

      </div>
    </div>
  );
}

// =========================================================================
// FUNÇÕES AUXILIARES
// =========================================================================
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

function formatDate(date) {
  if (!date) return "Não informado";
  if (date.includes("-")) {
    const parts = date.split("T")[0].split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
  }
  return date;
}