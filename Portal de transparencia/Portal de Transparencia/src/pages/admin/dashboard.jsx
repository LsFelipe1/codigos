import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardStats } from "../../services/api";

const statusStyles = {
  "Recebido": "bg-[#F1F5F9] text-[#334155] border-[#0F172A]",
  "Em análise": "bg-[#FEF3C7] text-[#92400E] border-[#0F172A]",
  "Encaminhado": "bg-[#F3E8FF] text-[#6B21A8] border-[#0F172A]",
  "Em andamento": "bg-[#EFF6FF] text-[#1E40AF] border-[#0F172A]",
  "Concluído": "bg-[#DCFCE7] text-[#166534] border-[#0F172A]",
  "Cancelado": "bg-[#FEE2E2] text-[#991B1B] border-[#0F172A]"
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadStats() {
    try {
      setIsLoading(true);
      const stats = await fetchDashboardStats();
      setData(stats);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  const statsData = useMemo(() => {
    if (!data) return [];
    const req = data.requests;

    return [
      {
        title: "Total de Pedidos",
        value: req.total,
        description: "Solicitações registradas",
        badgeBg: "bg-[#F1F5F9]",
        badgeText: "text-[#0F172A]",
        icon: "📋"
      },
      {
        title: "Em Análise",
        value: req.recebidos,
        description: "Aguardando triagem",
        badgeBg: "bg-[#FEF3C7]",
        badgeText: "text-[#92400E]",
        icon: "⏳"
      },
      {
        title: "Em Andamento",
        value: req.em_andamento,
        description: "Em execução pela equipe",
        badgeBg: "bg-[#EFF6FF]",
        badgeText: "text-[#1E40AF]",
        icon: "⚡"
      },
      {
        title: "Concluídos",
        value: req.concluidos,
        description: "Demandas resolvidas",
        badgeBg: "bg-[#DCFCE7]",
        badgeText: "text-[#166534]",
        icon: "✓"
      },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F172A] border-t-transparent" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Sincronizando sistema...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
            Painel Geral • MariaDB Conectado
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Visão Geral do Gabinete
          </h1>
          <p className="mt-1 text-xs font-medium text-[#64748B] sm:text-sm">
            Métricas de desempenho e fluxo de trabalho em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadStats}
            title="Atualizar dados"
            className="rounded-xl border-2 border-[#0F172A] bg-white p-3 text-xs font-black text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer"
          >
            🔄
          </button>

          <Link
            to="/admin/pedidos/novo"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#0F172A] bg-[#2563EB] px-5 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <span>＋</span>
            <span>Novo Pedido</span>
          </Link>
        </div>
      </div>

      {/* CARDS DE INDICADORES */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => (
          <div
            key={item.title}
            className="flex items-start justify-between rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-[#64748B]">
                {item.title}
              </p>
              <p className="mt-2 font-mono text-3xl font-black text-[#0F172A]">
                {item.value}
              </p>
              <p className="mt-1 text-[11px] font-bold text-[#64748B]">
                {item.description}
              </p>
            </div>

            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#0F172A] ${item.badgeBg} ${item.badgeText} text-base font-black`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* TAXA DE EFICIÊNCIA */}
      <div className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-black text-[#0F172A]">Taxa de Resolução do Gabinete</h3>
            <p className="text-xs text-[#64748B] font-medium">Porcentagem de solicitações solucionadas com sucesso</p>
          </div>
          <span className="font-mono text-2xl font-black text-[#166534]">
            {data?.requests?.resolution_rate || 0}%
          </span>
        </div>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full border-2 border-[#0F172A] bg-[#F8FAFC] flex">
          <div 
            style={{ width: `${data?.requests?.resolution_rate || 0}%` }} 
            className="bg-[#22C55E] transition-all duration-500" 
            title="Concluídos"
          />
          <div 
            style={{ width: `${data?.requests?.total > 0 ? (data.requests.em_andamento / data.requests.total) * 100 : 0}%` }} 
            className="bg-[#3B82F6] transition-all duration-500" 
            title="Em Andamento"
          />
          <div 
            style={{ width: `${data?.requests?.total > 0 ? (data.requests.recebidos / data.requests.total) * 100 : 0}%` }} 
            className="bg-[#F59E0B] transition-all duration-500" 
            title="Em Análise"
          />
        </div>
      </div>

      {/* AÇÕES RÁPIDAS & SOLICITAÇÕES RECENTES */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
          {/* AÇÕES RÁPIDAS */}
          <div className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-3">
            <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">Ações Rápidas</h2>
            
            <Link
              to="/admin/pedidos/novo"
              className="group flex items-center justify-between rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3.5 transition duration-150 hover:bg-[#EFF6FF]"
            >
              <div>
                <p className="text-xs font-black text-[#0F172A]">
                  Cadastrar solicitação
                </p>
                <p className="mt-0.5 text-[11px] text-[#64748B]">
                  Inserir pedido recebido presencialmente.
                </p>
              </div>
              <span className="font-mono text-sm font-black text-[#0F172A] transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="/admin/blog/novo"
              className="group flex items-center justify-between rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3.5 transition duration-150 hover:bg-[#EFF6FF]"
            >
              <div>
                <p className="text-xs font-black text-[#0F172A]">
                  Publicar matéria
                </p>
                <p className="mt-0.5 text-[11px] text-[#64748B]">
                  Novo comunicado no blog institucional.
                </p>
              </div>
              <span className="font-mono text-sm font-black text-[#0F172A] transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* BLOG PAINEL */}
          <div className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Resumo do Blog</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3">
                <p className="font-mono text-xl font-black text-[#0F172A]">{data?.blog?.publicadas || 0}</p>
                <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">Publicadas</p>
              </div>
              <div className="rounded-lg border-2 border-[#0F172A] bg-[#FEF3C7] p-3">
                <p className="font-mono text-xl font-black text-[#92400E]">{data?.blog?.rascunhos || 0}</p>
                <p className="font-mono text-[10px] font-bold uppercase text-[#92400E]">Rascunhos</p>
              </div>
            </div>
          </div>
        </div>

        {/* ÚLTIMAS SOLICITAÇÕES REAIS */}
        <div className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] lg:col-span-7">
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#E2E8F0] pb-4">
            <div>
              <h2 className="text-sm font-black text-[#0F172A] uppercase tracking-wider">
                Últimas Solicitações
              </h2>
              <p className="mt-0.5 text-xs text-[#64748B]">
                Pedidos registrados recentemente no MariaDB.
              </p>
            </div>

            <Link
              to="/admin/pedidos"
              className="font-mono text-xs font-bold uppercase text-[#2563EB] hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          <div className="mt-4 space-y-2.5">
            {data?.recent_requests?.length > 0 ? (
              data.recent_requests.map((item) => (
                <Link
                  key={item.id}
                  to={`/admin/pedidos/${item.id}`}
                  className="group flex items-center justify-between rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 transition duration-150 hover:bg-[#EFF6FF]"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <p className="truncate text-xs font-black text-[#0F172A]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] font-bold text-[#64748B]">
                      {item.protocol} • {item.district || "Bezerros"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-md border-2 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase ${
                      statusStyles[item.status] || "bg-white text-[#0F172A] border-[#0F172A]"
                    }`}
                  >
                    {item.status}
                  </span>
                </Link>
              ))
            ) : (
              <p className="py-6 text-center text-xs font-bold text-[#64748B]">Nenhuma solicitação cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}