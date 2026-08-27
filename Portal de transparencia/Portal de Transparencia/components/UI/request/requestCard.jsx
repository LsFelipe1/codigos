import { Link } from "react-router-dom";

// Mapeamento de Badges e Cores Neo-Brutalistas para cada Status
const statusStyles = {
  "Recebido": "bg-[#E8EFFA] text-[#1B4FA0] border-[#16211C]",
  "Em análise": "bg-[#FFF6DC] text-[#E0A800] border-[#16211C]",
  "Encaminhado": "bg-purple-100 text-purple-900 border-[#16211C]",
  "Em andamento": "bg-[#FFF6DC] text-[#E0A800] border-[#16211C]",
  "Concluído": "bg-[#E4F5EA] text-[#0A5F32] border-[#16211C]",
  "Cancelado": "bg-red-100 text-red-900 border-[#16211C]"
};

export default function RequestCard({ requests }) {
  const requestsFeatured = requests.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {requestsFeatured.map((item) => {
        const lastUpdate = item.updated_at || item.updatedAt || item.date || item.created_at;

        return (
          <article
            key={item.id}
            className="group flex flex-col justify-between rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
          >
            <div>
              {/* CABEÇALHO DO CARD */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-black leading-snug text-[#16211C]">
                  {item.title}
                </h3>

                <span
                  className={`shrink-0 rounded-full border-2 px-3 py-1 font-mono text-[10px] font-black uppercase ${
                    statusStyles[item.status] || "bg-[#F6F8F5] text-[#16211C] border-[#16211C]"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* BADGES E TAGS */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tag && (
                  <span className="rounded-md border border-[#16211C] bg-[#FFC531] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-[#16211C]">
                    {item.tag}
                  </span>
                )}

                {item.district && (
                  <span className="rounded-md border border-[#16211C] bg-[#E8EFFA] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-[#1B4FA0]">
                    {item.district}
                  </span>
                )}

                {item.priority && (
                  <span className="rounded-md border border-[#16211C] bg-[#F6F8F5] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#4E5C55]">
                    Prio: {item.priority}
                  </span>
                )}
              </div>

              {/* DESCRIÇÃO DA DEMANDA */}
              <p className="mt-4 text-xs font-medium leading-relaxed text-[#4E5C55] line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* RODAPÉ E PROTOCOLO DESTAQUE */}
            <div className="mt-6 border-t-2 border-dashed border-[#DEE6E0] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-widest text-[#4E5C55]">
                    Protocolo
                  </p>
                  <p className="font-mono text-xs font-black text-[#16211C]">
                    {item.protocol}
                  </p>
                </div>

                <Link
                  to={`/pedidos/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
                >
                  Ver detalhes →
                </Link>
              </div>

              {lastUpdate && (
                <p className="mt-3 text-center font-mono text-[10px] font-bold text-[#4E5C55]">
                  Última atualização: {lastUpdate}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}