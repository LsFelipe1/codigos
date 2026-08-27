import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import mockNews from "../../../../modules/blog/data/news";
import { fetchNews, API_BASE_URL } from "../../../../src/services/api";
import Toast from "../../../../components/UI/toast";

export default function Posts() {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // CARREGA NOTÍCIAS DO BANCO DE DADOS
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchNews();
        if (Array.isArray(data) && data.length > 0) {
          setPostsList(data);
        } else {
          setPostsList(mockNews);
        }
      } catch (err) {
        console.warn("API indisponível. Carregando dados de contingência do blog.");
        setPostsList(mockNews);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredPosts = useMemo(() => {
    const term = search.toLowerCase();
    return postsList.filter(
      (item) =>
        item.title?.toLowerCase().includes(term) ||
        item.tag?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term)
    );
  }, [postsList, search]);

  // REMOÇÃO EM TEMPO REAL NO BANCO MARIADB
  async function handleDelete(id, title) {
    if (confirm(`Deseja realmente excluir a publicação:\n"${title}"?`)) {
      try {
        const response = await fetch(`${API_BASE_URL}/delete_news.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Erro ao excluir.");

        setPostsList((prev) => prev.filter((item) => item.id !== id));
        setToast({
          message: "Publicação removida com sucesso do MariaDB.",
          type: "success",
        });
      } catch (error) {
        setToast({
          message: "Erro de conexão ao tentar excluir no servidor.",
          type: "error",
        });
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-(--blue)">
            Comunicação
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-(--navy) sm:text-3xl">
            Gestão do Blog
          </h1>
          <p className="mt-1 text-xs text-(--ink-soft) sm:text-sm">
            Gerencie e publique notícias conectadas ao banco de dados local.
          </p>
        </div>

        <Link
          to="/admin/blog/novo"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--navy) px-5 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-(--blue-dark) active:scale-[0.99]"
        >
          <span>＋</span>
          <span>Nova publicação</span>
        </Link>
      </div>

      {/* CAMPO DE PESQUISA */}
      <div className="rounded-3xl border border-(--gray-200) bg-(--paper) p-4 shadow-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar por título, categoria ou palavra-chave..."
          className="w-full rounded-xl border border-(--gray-200) bg-white px-4 py-2.5 text-xs font-medium text-(--ink) outline-none transition hover:border-(--blue) focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
        />
      </div>

      {/* LISTAGEM DE NOTÍCIAS */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="text-xs font-bold text-(--navy)">Buscando matérias no banco de dados...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredPosts.map((item) => (
            <article
              key={item.id}
              className="group flex gap-4 rounded-3xl border border-(--gray-200) bg-(--paper) p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-(--blue) hover:shadow-md"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-28 w-28 shrink-0 rounded-2xl object-cover border border-(--gray-200) bg-(--blue-100)"
                />
              ) : (
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-(--blue-100) font-bold text-xs text-(--blue-dark)">
                  RL Blog
                </div>
              )}

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-(--blue-100) px-2.5 py-0.5 font-(family-name:--flexmono) text-[10px] font-bold uppercase tracking-wider text-(--blue-dark)">
                      {item.tag}
                    </span>
                    <span className="text-[10px] font-semibold text-(--gray-500)">
                      {item.date}
                    </span>
                  </div>

                  <h2 className="mt-2 text-xs font-bold leading-snug text-(--navy) line-clamp-2 group-hover:text-(--blue) transition-colors">
                    {item.title}
                  </h2>
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-(--gray-200) pt-2">
                  <Link
                    to={`/noticias/${item.id}`}
                    className="text-xs font-bold text-(--blue) hover:text-(--blue-dark) hover:underline"
                  >
                    Visualizar
                  </Link>

                  <Link
                    to={`/admin/blog/${item.id}`}
                    className="text-xs font-bold text-(--blue) hover:text-(--blue-dark) hover:underline"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className="ml-auto text-xs font-bold text-(--red) transition hover:underline cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}