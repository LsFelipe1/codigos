import { useEffect, useState } from "react";
import mockRequests from "../../../../modules/request/data/request";
import SectionHeader from "../../../../components/sectionHeader";
import Search from "../../../../components/UI/search";
import RequestCard from "../../../../components/UI/request/requestCard";
import { fetchRequests } from "../../../../src/services/api";
import Header from "../components/header";

const filters = {
  district: ["Centro", "São Sebastião", "Santo Amaro", "Cruzeiro", "Nossa Senhora das Dores"],
  tag: ["Iluminação", "Infraestrutura", "Saúde", "Urbanismo", "Mobilidade", "Saneamento"],
  status: ["Recebido", "Em análise", "Encaminhado", "Em andamento", "Concluído", "Cancelado"],
  priority: ["Baixa", "Média", "Alta", "Urgente"]
};

const labels = {
  district: "Bairro",
  tag: "Categoria",
  status: "Status",
  priority: "Prioridade"
};

export default function RequestPage() {
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState({ district: "", tag: "", status: "", priority: "" });

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchRequests();
        
        if (Array.isArray(data) && data.length > 0) {
          setRequestsList(data);
        } else {
          setRequestsList(mockRequests);
        }
      } catch (err) {
        console.warn("Usando dados mockados como fallback devido a erro na API.");
        setRequestsList(mockRequests);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredRequests = requestsList.filter(item => {
    const term = search.toLowerCase();

    const matchesSearch = [
      item.title,
      item.description,
      item.district,
      item.street,
      item.tag,
      item.protocol,
      item.status
    ].some(value => value?.toLowerCase().includes(term));

    return matchesSearch && Object.entries(selected).every(
      ([key, value]) => !value || item[key] === value
    );
  });

  const clearFilters = () => {
    setSearch("");
    setSelected({ district: "", tag: "", status: "", priority: "" });
  };

  const hasFilters = search || Object.values(selected).some(Boolean);

  return (
    <>
      <Header />
    <section className="relative overflow-hidden bg-(--paper) py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            tag="• Acompanhamento público"
            title="Pedidos Recentes"
            description="Acompanhe as solicitações registradas e veja o andamento de cada demanda."
          />

          <div className="w-full lg:max-w-md">
            <Search value={search} onChange={setSearch} placeholder="Buscar por rua, bairro ou protocolo..." />
          </div>
        </div>

        {/* CONTROLE DE CARREGAMENTO */}
        {isLoading ? (
          <div className="mt-12 flex justify-center py-16">
            <div className="flex items-center gap-3 rounded-2xl border border-(--gray-200) bg-white p-4 shadow-xs">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-(--navy) border-t-transparent" />
              <span className="text-xs font-bold text-(--navy)">Conectando ao banco de dados...</span>
            </div>
          </div>
        ) : (
          <>
            {/* PAINEL DE FILTROS */}
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-(--gray-200) bg-white shadow-xs">
              <div className="border-b border-(--gray-200) bg-(--blue-50)/60 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-(family-name:--flexmono) text-[10px] font-bold uppercase tracking-[0.2em] text-(--blue-dark)">
                      Filtros dinâmicos
                    </p>
                    <h3 className="mt-0.5 text-base font-black text-(--navy)">
                      Refinar consulta
                    </h3>
                  </div>

                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="cursor-pointer text-xs font-bold text-(--blue) transition hover:text-(--blue-dark) hover:underline"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(filters).map(([key, options]) => (
                  <label key={key} className="flex flex-col gap-2">
                    <span className="font-(family-name:--flexmono) text-[10px] font-bold uppercase tracking-widest text-(--gray-500)">
                      {labels[key]}
                    </span>

                    <select
                      value={selected[key]}
                      onChange={e => setSelected(prev => ({ ...prev, [key]: e.target.value }))}
                      className="h-11 cursor-pointer rounded-xl border border-(--gray-200) bg-(--paper) px-3.5 text-xs font-bold text-(--ink) outline-none transition hover:border-(--blue) focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
                    >
                      <option value="">
                        {key === "district" ? "Todos os bairros" :
                         key === "tag" ? "Todas as categorias" :
                         key === "status" ? "Todos os status" :
                         "Todas as prioridades"}
                      </option>

                      {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </div>

            {/* BARRA DE RESULTADOS */}
            <div className="mt-8 flex items-center justify-between border-b border-(--gray-200) pb-4">
              <div>
                <p className="font-(family-name:--flexmono) text-[10px] font-bold uppercase tracking-widest text-(--gray-500)">
                  Resultado da busca
                </p>
                <p className="mt-0.5 text-xs text-(--ink-soft)">
                  <strong className="text-sm font-black text-(--navy)">{filteredRequests.length}</strong>{" "}
                  {filteredRequests.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
                </p>
              </div>

              {hasFilters && (
                <span className="rounded-full bg-(--blue-100) px-3 py-1 text-[11px] font-bold text-(--blue-dark)">
                  Filtros ativos
                </span>
              )}
            </div>

            {/* LISTA DE CARDS */}
            <div className="mt-6">
              {filteredRequests.length ? (
                <RequestCard requests={filteredRequests} />
              ) : (
                <div className="rounded-3xl border border-dashed border-(--gray-200) bg-(--blue-50)/40 px-6 py-16 text-center">
                  <h3 className="text-base font-black text-(--navy)">Nenhum pedido encontrado</h3>
                  <p className="mt-1 text-xs text-(--ink-soft)">Ajuste os filtros de pesquisa para visualizar resultados.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
    </>
  );
}