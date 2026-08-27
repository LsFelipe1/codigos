import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Toast from "../../../../components/UI/toast";
import { fetchNewsById, updateNews, fetchNewsHistory } from "../../../../src/services/api";

export default function EditPost() {
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    tag: "",
    date: "",
    description: "",
    content: "",
    image: "",
    status: "Publicado",
    author: ""
  });

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const postData = await fetchNewsById(id);
        setForm(postData);

        const historyData = await fetchNewsHistory(id);
        if (Array.isArray(historyData)) setHistory(historyData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) loadData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateNews({
        ...form,
        updatedBy: "Assessoria de Imprensa (Sessão Ativa)"
      });

      setToast({
        message: "Notícia e registro de auditoria atualizados com sucesso!",
        type: "success",
      });

      const updatedHistory = await fetchNewsHistory(id);
      if (Array.isArray(updatedHistory)) setHistory(updatedHistory);

    } catch (error) {
      setToast({
        message: "Erro de conexão ao atualizar matéria.",
        type: "error",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F172A] border-t-transparent" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F172A]">Carregando publicação...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
            Blog • Edição Auditável
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Editar Publicação #{id}
          </h1>
        </div>

        <Link
          to="/admin/blog"
          className="w-fit rounded-xl border-2 border-[#0F172A] bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          ← Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* FORMULÁRIO DE EDIÇÃO */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-4">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">Conteúdo Principal</h2>

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Título da Matéria
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-4 py-2.5 text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                  Categoria
                </label>
                <select
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
                >
                  <option>Saúde</option>
                  <option>Educação</option>
                  <option>Infraestrutura</option>
                  <option>Segurança</option>
                  <option>Obras</option>
                  <option>Política</option>
                  <option>Comunidade</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
                >
                  <option>Publicado</option>
                  <option>Rascunho</option>
                  <option>Arquivado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Resumo
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F172A] outline-none transition focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Conteúdo Integral
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="10"
                className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F172A] outline-none transition focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl border-2 border-[#0F172A] bg-[#2563EB] py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Salvar Alterações e Registrar Auditoria →
            </button>
          </section>
        </form>

        {/* SIDEBAR - HISTÓRICO DE AUDITORIA */}
        <aside className="space-y-6">
          <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
              Histórico de Modificações
            </h2>
            <p className="mt-0.5 text-[11px] text-[#64748B] mb-4">
              Registro auditável com carimbo de data/hora.
            </p>

            <div className="space-y-3">
              {history.length > 0 ? (
                history.map((item) => (
                  <div key={item.id} className="rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[#64748B]">
                      <span>{item.action}</span>
                      <span>{new Date(item.created_at).toLocaleString('pt-BR')}</span>
                    </div>
                    <p className="mt-1 font-bold text-[#0F172A]">{item.changes_summary}</p>
                    <p className="mt-1 font-mono text-[10px] text-[#64748B]">
                      Por: <strong>{item.updated_by}</strong>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs font-bold text-[#64748B] text-center py-4">Nenhuma modificação registrada.</p>
              )}
            </div>
          </section>
        </aside>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}