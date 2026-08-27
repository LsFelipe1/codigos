import { useEffect, useState, useMemo } from "react";
import SectionHeader from "../../../../components/sectionHeader";
import DashboardCard from "../../../../components/UI/dashboard/dashboardCard";
import { fetchDashboardStats } from "../../../../src/services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPublicStats() {
      try {
        setIsLoading(true);
        const data = await fetchDashboardStats();
        setStats(data.requests);
      } catch (error) {
        console.warn("Erro ao carregar estatísticas do portal.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPublicStats();
  }, []);

  // CÁLCULO DINÂMICO DOS NÚMEROS E PORCENTAGENS
  const formattedStats = useMemo(() => {
    const total = stats?.total || 0;
    const emAndamento = stats?.em_andamento || 0;
    const emAnalise = stats?.recebidos || 0;
    const concluidos = stats?.concluidos || 0;

    const getPercentage = (val) => (total > 0 ? Math.round((val / total) * 100) : 0);

    return [
      {
        number: total,
        type: "Total de pedidos",
        text: "Solicitações registradas",
        color: "blue",
        progress: 100,
      },
      {
        number: emAndamento,
        type: "Pedidos em andamento",
        text: "Em execução pela equipe",
        color: "amber",
        progress: getPercentage(emAndamento),
      },
      {
        number: emAnalise,
        type: "Pedidos em análise",
        text: "Aguardando avaliação",
        color: "orange",
        progress: getPercentage(emAnalise),
      },
      {
        number: concluidos,
        type: "Pedidos concluídos",
        text: "Demandas solucionadas",
        color: "green",
        progress: getPercentage(concluidos),
      },
    ];
  }, [stats]);

  return (
    <section className="relative overflow-hidden bg-[#F6F8F5] border-b-[3px] border-[#16211C] px-6 py-20 sm:px-10 lg:px-16">
      {/* SHAPES GEOMÉTRICOS DE FUNDO */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#E4F5EA] opacity-60 border-[3px] border-[#16211C]" />

      <div className="relative mx-auto max-w-7xl">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#16211C] px-3 py-1 text-xs font-black uppercase text-[#FFC531]">
              Painel Público de Transparência
            </span>
            <h2 className="mt-2 text-3xl font-black text-[#16211C]">
              Números do Gabinete
            </h2>
            <p className="mt-1 text-xs text-[#4E5C55] sm:text-sm">
              Acompanhamento transparente das demandas da população em tempo real.
            </p>
          </div>

          {/* INDICADOR DE DADOS OFICIAIS SINCRO */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-xl border-2 border-[#16211C] bg-[#FFC531] px-3.5 py-1.5 text-[11px] font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16211C] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16211C]"></span>
            </span>
            <span>Atualizado em tempo real</span>
          </div>
        </div>

        {/* CARDS COM DADOS DO BANCO DE DADOS */}
        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]"
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formattedStats.map((item) => (
              <DashboardCard key={item.type} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}