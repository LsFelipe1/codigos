import { useEffect, useState } from "react";
import mockRequests from "../../../modules/request/data/request";
import Search from "../search";
import RequestCard from "./requestCard";
import { fetchRequests } from "../../../src/services/api";

const filters = {
  district: ["Centro", "São Sebastião", "Santo Amaro", "Cruzeiro"],
  tag: ["Iluminação", "Infraestrutura", "Saúde", "Urbanismo", "Mobilidade", "Saneamento"],
  status: ["Recebido", "Em análise", "Encaminhado", "Em andamento", "Concluído", "Cancelado"],
  priority: ["Baixa", "Média", "Alta"]
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
        console.warn("Usando dados mockados como fallback.");
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
    <section className="relative overflow-hidden bg-[#F6F8F5] py-16 md:py-24 border-b-[3px] border-[#16211C]">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#FFC531] px-3 py-1 text-xs font-black uppercase text-[#16211C]">
              Acompanhamento Público
            </span>
            <h1 className="mt-2 text-3xl font-black text-[#16211C] sm:text-4xl">
              Pedidos Recentes
            </h1>
            <p className="mt-1 text-xs font-medium text-[#4E5C55] sm:text-sm">
              Acompanhe as solicitações registradas e veja o andamento de cada demanda.
            </p>
          </div>

          <div className="w-full lg:max-w-md">
            <Search value={search} onChange={setSearch} />
          </div>
        </div>

        {/* CONTROLE DE CARREGAMENTO */}
        {isLoading ? (
          <div className="mt-12 flex justify-center py-16">
            <div className="flex items-center gap-3 rounded-2xl border-[2.5px] border-[#16211C] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#16211C] border-t-transparent" />
              <span className="text-xs font-black uppercase text-[#16211C]">Conectando ao banco MariaDB...</span>
            </div>
          </div>
        ) : (
          <>
            {/* PAINEL DE FILTROS NEO-BRUTALISTA */}
            <div className="relative mt-10 overflow-hidden rounded-2xl border-[2.5px] border-[#16211C] bg-white shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
              <div className="border-b-2 border-[#16211C] bg-[#E8EFFA] px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] font-black uppercase tracking-widest text-[#1B4FA0]">
                      Filtros de Busca
                    </p>
                    <h3 className="mt-0.5 text-base font-black text-[#16211C]">
                      Refinar Consulta
                    </h3>
                  </div>

                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-black uppercase text-[#1B4FA0] hover:underline cursor-pointer"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(filters).map(([key, options]) => (
                  <label key={key} className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] font-black uppercase text-[#4E5C55]">
                      {labels[key]}
                    </span>

                    <select
                      value={selected[key]}
                      onChange={e => setSelected(prev => ({ ...prev, [key]: e.target.value }))}
                      className="h-11 cursor-pointer rounded-xl border-2 border-[#16211C] bg-[#F6F8F5] px-3.5 font-mono text-xs font-bold text-[#16211C] outline-none transition focus:bg-white"
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
            <div className="mt-8 flex items-center justify-between border-b-2 border-[#DEE6E0] pb-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase text-[#4E5C55]">
                  Resultado
                </p>
                <p className="mt-0.5 text-xs text-[#4E5C55]">
                  <strong className="text-sm font-black text-[#16211C]">{filteredRequests.length}</strong>{" "}
                  {filteredRequests.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
                </p>
              </div>

              {hasFilters && (
                <span className="rounded-full border border-[#16211C] bg-[#FFC531] px-3 py-1 font-mono text-[10px] font-black uppercase text-[#16211C]">
                  Filtros Ativos
                </span>
              )}
            </div>

            {/* LISTA DE CARDS */}
            <div className="mt-6">
              {filteredRequests.length ? (
                <RequestCard requests={filteredRequests} />
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-[#16211C] bg-white p-12 text-center">
                  <h3 className="text-base font-black text-[#16211C]">Nenhum pedido encontrado</h3>
                  <p className="mt-1 text-xs text-[#4E5C55]">Ajuste os filtros de pesquisa para encontrar resultados.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}