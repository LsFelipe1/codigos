import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Toast from "../../../../components/UI/toast";
import { fetchRequestById } from "../../../../src/services/api";

export default function RequestDetails() {
  const { id } = useParams();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [responsible, setResponsible] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadRequest() {
      try {
        setIsLoading(true);
        const data = await fetchRequestById(id);
        setSelectedRequest(data);
        setStatus(data.status || "Recebido");
        setResponsible(data.responsible || "");
      } catch (error) {
        console.error("Erro ao carregar detalhes do pedido.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadRequest();
  }, [id]);

  async function handleSave(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/gabinete-api/update_request_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedRequest.id,
          status,
          responsible,
          note
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status.");

      setToast({
        message: "Status e observação registrados com sucesso!",
        type: "success",
      });
      setNote("");
    } catch (err) {
      setToast({
        message: "Erro de conexão com o servidor.",
        type: "error",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F172A] border-t-transparent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A]">Carregando pedido...</span>
        </div>
      </div>
    );
  }

  if (!selectedRequest) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-black text-[#0F172A]">Pedido não encontrado</h1>
          <Link
            to="/admin/pedidos"
            className="mt-4 inline-block rounded-xl border-2 border-[#0F172A] bg-[#0F172A] px-5 py-2.5 font-mono text-xs font-bold uppercase text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
          >
            Voltar para listagem
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-2.5 py-0.5 font-mono text-xs font-bold text-white">
            {selectedRequest.protocol}
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            {selectedRequest.title}
          </h1>
          <p className="mt-1 font-mono text-xs text-[#64748B]">
            Cadastrado em {selectedRequest.date} • Por {selectedRequest.created_by || "Sistema"}
          </p>
        </div>

        <Link
          to="/admin/pedidos"
          className="w-fit rounded-xl border-2 border-[#0F172A] bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          ← Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* DETALHES */}
          <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">Descrição do Pedido</h2>
            <p className="mt-4 whitespace-pre-line text-xs font-medium leading-relaxed text-[#0F172A]">
              {selectedRequest.description}
            </p>
          </section>

          {/* ESPECIFICAÇÕES */}
          <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">Localização e Especificações</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">Bairro</p>
                <p className="text-xs font-black text-[#0F172A]">{selectedRequest.district}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">Rua</p>
                <p className="text-xs font-black text-[#0F172A]">{selectedRequest.street}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">Categoria</p>
                <p className="text-xs font-black text-[#0F172A]">{selectedRequest.tag}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase text-[#64748B]">Prioridade</p>
                <p className="text-xs font-black text-[#0F172A]">{selectedRequest.priority}</p>
              </div>
            </div>
          </section>
        </div>

        {/* ATUALIZAR STATUS */}
        <aside className="space-y-6">
          <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">Atualizar Andamento</h2>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">Novo Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full cursor-pointer rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
                >
                  <option>Recebido</option>
                  <option>Em análise</option>
                  <option>Encaminhado</option>
                  <option>Em andamento</option>
                  <option>Concluído</option>
                  <option>Cancelado</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">Responsável</label>
                <input
                  type="text"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">Observação / Nº do Ofício</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows="3"
                  className="w-full resize-none rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F172A] outline-none transition focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl border-2 border-[#0F172A] bg-[#2563EB] py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Salvar Alterações →
              </button>
            </form>
          </section>
        </aside>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}