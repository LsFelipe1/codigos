import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import mockRequests from "../../../../modules/request/data/request";
import { fetchRequests } from "../../../../src/services/api";

const statusStyles = {
  "Recebido": "bg-[#F1F5F9] text-[#334155] border-[#0F172A]",
  "Em análise": "bg-[#FEF3C7] text-[#92400E] border-[#0F172A]",
  "Encaminhado": "bg-[#F3E8FF] text-[#6B21A8] border-[#0F172A]",
  "Em andamento": "bg-[#EFF6FF] text-[#1E40AF] border-[#0F172A]",
  "Concluído": "bg-[#DCFCE7] text-[#166534] border-[#0F172A]",
  "Cancelado": "bg-[#FEE2E2] text-[#991B1B] border-[#0F172A]"
};

export default function RequestsList() {
  const [requestsList, setRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Todos");
  const [priority, setPriority] = useState("Todos");
  const [period, setPeriod] = useState("todos");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    async function loadAdminData() {
      try {
        setIsLoading(true);
        const data = await fetchRequests();
        if (Array.isArray(data) && data.length > 0) {
          setRequestsList(data);
        } else {
          setRequestsList(mockRequests);
        }
      } catch (err) {
        setRequestsList(mockRequests);
      } finally {
        setIsLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const filteredRequests = useMemo(() => {
    return requestsList.filter((item) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.district?.toLowerCase().includes(searchTerm) ||
        item.street?.toLowerCase().includes(searchTerm) ||
        item.protocol?.toLowerCase().includes(searchTerm);

      const matchesStatus = status === "Todos" || item.status === status;
      const matchesPriority = priority === "Todos" || item.priority === priority;

      let matchesDate = true;
      if (item.date) {
        const itemDate = new Date(item.date);
        const today = new Date();

        if (period === "7dias") {
          const past7 = new Date();
          past7.setDate(today.getDate() - 7);
          matchesDate = itemDate >= past7;
        } else if (period === "30dias") {
          const past30 = new Date();
          past30.setDate(today.getDate() - 30);
          matchesDate = itemDate >= past30;
        } else if (period === "anoAtual") {
          matchesDate = itemDate.getFullYear() === today.getFullYear();
        } else if (period === "custom") {
          if (startDate) matchesDate = matchesDate && itemDate >= new Date(startDate);
          if (endDate) matchesDate = matchesDate && itemDate <= new Date(endDate);
        }
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
    });
  }, [requestsList, search, status, priority, period, startDate, endDate]);

  const clearFilters = () => {
    setSearch("");
    setStatus("Todos");
    setPriority("Todos");
    setPeriod("todos");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
            Painel Administrativo
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Gerenciamento de Pedidos
          </h1>
          <p className="mt-1 text-xs font-medium text-[#64748B] sm:text-sm">
            Filtre, acompanhe e edite as solicitações registradas no banco de dados.
          </p>
        </div>

        <Link
          to="/admin/pedidos/novo"
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F172A] bg-[#2563EB] px-5 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <span>＋</span>
          <span>Novo Pedido</span>
        </Link>
      </div>

      {/* FILTROS */}
      <div className="rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
              Pesquisar
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Título, bairro, protocolo..."
              className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-4 py-2 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full cursor-pointer rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
            >
              <option>Todos</option>
              <option>Recebido</option>
              <option>Em análise</option>
              <option>Encaminhado</option>
              <option>Em andamento</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full cursor-pointer rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
            >
              <option>Todos</option>
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </div>
        </div>

        {/* PERÍODO DE FILTRAGEM */}
        <div className="border-t-2 border-dashed border-[#E2E8F0] pt-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase text-[#64748B] mr-1">Período:</span>

            {[
              ["todos", "Todo o período"],
              ["7dias", "Últimos 7 dias"],
              ["30dias", "Últimos 30 dias"],
              ["anoAtual", "Ano Atual (2026)"],
              ["custom", "Personalizado"]
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                className={`rounded-lg border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase transition cursor-pointer ${
                  period === key
                    ? "border-[#0F172A] bg-[#0F172A] text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                    : "border-[#0F172A] bg-[#F8FAFC] text-[#0F172A] hover:bg-[#EFF6FF]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="font-mono text-xs font-bold uppercase text-[#2563EB] hover:underline self-end sm:self-auto cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* TABELA DE RESULTADOS */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F172A] border-t-transparent" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A]">Carregando solicitações...</span>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border-2 border-[#0F172A] bg-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left border-collapse">
              <thead className="border-b-2 border-[#0F172A] bg-[#F8FAFC]">
                <tr>
                  <th className="px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Solicitação / Protocolo
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Localização
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Status
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Data de Abertura
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Ação
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-[#E2E8F0]">
                {filteredRequests.map((item) => (
                  <tr key={item.id} className="transition duration-150 hover:bg-[#EFF6FF]">
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-black text-[#0F172A] line-clamp-1">
                        {item.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] font-bold text-[#64748B]">
                        {item.protocol}
                      </p>
                    </td>

                    <td className="px-5 py-3.5">
                      <p className="text-xs font-bold text-[#0F172A]">{item.district}</p>
                      <p className="text-[11px] text-[#64748B] line-clamp-1">{item.street}</p>
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block rounded-md border-2 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase ${
                          statusStyles[item.status] || "bg-white text-[#0F172A] border-[#0F172A]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-[#64748B]">
                      {item.date}
                    </td>

                    <td className="px-5 py-3.5">
                      <Link
                        to={`/admin/pedidos/${item.id}`}
                        className="font-mono text-xs font-bold uppercase text-[#2563EB] hover:underline"
                      >
                        Gerenciar →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="p-12 text-center font-mono text-xs font-bold text-[#64748B]">
              Nenhum pedido encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}