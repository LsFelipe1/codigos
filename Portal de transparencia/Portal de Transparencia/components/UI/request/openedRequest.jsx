import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import mockRequests from "../../../modules/request/data/request";
import { fetchRequestById, fetchRequestHistory } from "../../../src/services/api";

export default function OpenedRequest() {
  const { id } = useParams();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchRequestById(id);
        setSelectedRequest(data);

        const historyData = await fetchRequestHistory(id);
        if (Array.isArray(historyData)) {
          setHistory(historyData);
        }
      } catch (err) {
        console.warn("Recorrendo aos dados mockados locais.");
        const fallback = mockRequests.find((item) => String(item.id) === String(id));
        setSelectedRequest(fallback || null);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F5] py-20">
        <div className="flex items-center gap-3 rounded-2xl border-[2.5px] border-[#16211C] bg-white p-5 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#16211C] border-t-transparent" />
          <span className="text-xs font-black uppercase text-[#16211C]">Carregando pedido...</span>
        </div>
      </div>
    );
  }

  if (!selectedRequest) {
    return (
      <div className="min-h-screen bg-[#F6F8F5] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl border-[3px] border-[#16211C] bg-white p-8 text-center shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]">
          <h1 className="text-2xl font-black text-[#16211C]">
            Pedido Não Encontrado
          </h1>
          <p className="mt-2 text-xs font-bold text-[#4E5C55]">
            O pedido pesquisado não existe ou foi removido.
          </p>
          <Link
            to="/pedidos"
            className="mt-6 inline-flex rounded-xl border-[2.5px] border-[#16211C] bg-[#FFC531] px-5 py-2.5 text-xs font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]"
          >
            ← Voltar para Pedidos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F5] pb-20 border-b-[3px] border-[#16211C]">
      {/* BARRA SUPERIOR DE VOLTAR */}
      <div className="border-b-2 border-[#DEE6E0] bg-white py-4">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            to="/pedidos"
            className="inline-flex items-center gap-2 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
          >
            ← Voltar para todos os pedidos
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pt-8">
        {/* CABEÇALHO DO PEDIDO */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {selectedRequest.tag && (
              <span className="rounded-full border-2 border-[#16211C] bg-[#FFC531] px-3.5 py-1 font-mono text-xs font-black uppercase text-[#16211C]">
                {selectedRequest.tag}
              </span>
            )}

            <StatusBadge status={selectedRequest.status} />
          </div>

          <h1 className="text-3xl font-black text-[#16211C] md:text-5xl">
            {selectedRequest.title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs font-bold text-[#4E5C55]">
            <span>Data: {formatDate(selectedRequest.date)}</span>
            <span>•</span>
            <span>Protocolo: <strong className="text-[#16211C]">{selectedRequest.protocol}</strong></span>
          </div>
        </header>

        {/* CORPO DE INFORMAÇÕES E HISTÓRICO */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="space-y-6 lg:col-span-2">
            {/* SOBRE O PEDIDO */}
            <section className="rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] md:p-8">
              <h2 className="text-lg font-black text-[#16211C]">
                Sobre a Solicitação
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#16211C] font-medium">
                {selectedRequest.description}
              </p>
            </section>

            {/* LINHA DO TEMPO / RESPOSTAS DO GABINETE */}
            <section className="rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] md:p-8">
              <h2 className="text-lg font-black text-[#16211C] mb-6">
                Andamento e Respostas Oficiais
              </h2>

              <div className="space-y-4">
                {history.length > 0 ? (
                  history.map((h, idx) => (
                    <div key={h.id || idx} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-4 w-4 rounded-full border-2 border-[#16211C] bg-[#0E8A46]" />
                        {idx < history.length - 1 && <div className="h-full w-0.5 bg-[#DEE6E0]" />}
                      </div>
                      <div className="pb-4 min-w-0 flex-1">
                        <div className="flex items-center justify-between font-mono text-xs font-black">
                          <span className="text-[#16211C]">Status: {h.status}</span>
                          <span className="text-[#4E5C55]">
                            {h.created_at ? new Date(h.created_at).toLocaleDateString("pt-BR") : formatDate(selectedRequest.date)}
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-medium text-[#16211C] bg-[#F6F8F5] p-3.5 rounded-xl border border-[#16211C]">
                          {h.note}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-[#16211C] bg-[#FFF6DC] p-4 text-center">
                    <p className="text-xs font-bold text-[#16211C]">Aguardando movimentação e respostas oficiais do gabinete.</p>
                  </div>
                )}
              </div>
            </section>

            {/* FOTOS DA SOLICITAÇÃO */}
            {selectedRequest.images?.length > 0 && (
              <section className="rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] md:p-8">
                <h2 className="text-lg font-black text-[#16211C]">
                  Anexos da Solicitação
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedRequest.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedRequest.title} - ${index + 1}`}
                      className="h-64 w-full rounded-xl border-2 border-[#16211C] object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR FICHA TÉCNICA */}
          <aside className="space-y-6">
            <section className="rounded-2xl border-[2.5px] border-[#16211C] bg-[#FFF6DC] p-6 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)]">
              <h2 className="font-mono text-xs font-black uppercase text-[#16211C]">
                Ficha Técnica da Demanda
              </h2>

              <div className="mt-4 space-y-4 pt-3 border-t-2 border-dashed border-[#16211C]/20">
                <InfoItem label="Status Atual" value={selectedRequest.status} />
                <InfoItem label="Prioridade" value={selectedRequest.priority} />
                <InfoItem label="Bairro" value={selectedRequest.district} />
                <InfoItem label="Rua / Endereço" value={selectedRequest.street} />
                <InfoItem label="Responsável" value={selectedRequest.responsible} />
              </div>
            </section>
          </aside>

        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Recebido: "bg-[#E8EFFA] text-[#1B4FA0] border-[#16211C]",
    "Em análise": "bg-[#FFF6DC] text-[#E0A800] border-[#16211C]",
    Encaminhado: "bg-purple-100 text-purple-900 border-[#16211C]",
    "Em andamento": "bg-[#FFF6DC] text-[#E0A800] border-[#16211C]",
    Concluído: "bg-[#E4F5EA] text-[#0A5F32] border-[#16211C]",
    Cancelado: "bg-red-100 text-red-900 border-[#16211C]",
  };

  return (
    <span className={`rounded-full border-2 px-3 py-1 font-mono text-xs font-black uppercase ${styles[status] || "bg-[#F6F8F5] text-[#16211C] border-[#16211C]"}`}>
      {status}
    </span>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="font-mono text-[10px] font-black uppercase text-[#4E5C55]">
        {label}
      </p>

      <p className="text-xs font-black text-[#16211C]">
        {value || "Não informado"}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "Não informado";
  if (date.includes("T")) date = date.split("T")[0];

  const parts = date.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  return date;
}