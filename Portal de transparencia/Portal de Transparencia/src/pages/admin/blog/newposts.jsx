import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../../../components/UI/toast";
import { API_BASE_URL, uploadImage } from "../../../../src/services/api";

export default function NewPost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    tag: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    content: "",
    image: "",
    status: "Publicado",
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const serverImageUrl = await uploadImage(file);

      setForm((prev) => ({ ...prev, image: serverImageUrl }));
      setToast({
        message: "Imagem enviada para o servidor com sucesso!",
        type: "success",
      });
    } catch (error) {
      setToast({
        message: error.message || "Erro ao enviar imagem.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Informe o título.";
    if (!form.tag) newErrors.tag = "Selecione uma categoria.";
    if (!form.description.trim()) newErrors.description = "Informe o resumo.";
    if (!form.content.trim()) newErrors.content = "Informe o conteúdo.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newPost = {
      title: form.title.trim(),
      tag: form.tag,
      date: form.date,
      description: form.description.trim(),
      content: form.content.trim(),
      image: form.image || null,
      status: form.status,
      author: "Assessoria de Imprensa",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/create_news.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Falha ao gravar notícia.");
      }

      setToast({
        message: "Publicação cadastrada com sucesso no MariaDB!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin/blog");
      }, 1800);
    } catch (error) {
      console.error("Erro ao enviar matéria:", error);
      setToast({
        message: "Erro de conexão com o servidor PHP local.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
            Blog Institucional
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Nova Publicação
          </h1>
          <p className="mt-1 text-xs font-medium text-[#64748B] sm:text-sm">
            Escreva e publique informativos gravando diretamente no banco de dados.
          </p>
        </div>

        <Link
          to="/admin/blog"
          className="w-fit rounded-xl border-2 border-[#0F172A] bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMAÇÕES BÁSICAS */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Informações Gerais
          </h2>

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
              Título da Matéria <span className="text-red-600">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Novo hospital será construído em Bezerros"
              className={`w-full rounded-lg border-2 bg-[#F8FAFC] px-4 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white ${
                errors.title ? "border-red-600" : "border-[#0F172A]"
              }`}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Categoria <span className="text-red-600">*</span>
              </label>
              <select
                name="tag"
                value={form.tag}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
              >
                <option value="">Selecione...</option>
                <option>Saúde</option>
                <option>Educação</option>
                <option>Infraestrutura</option>
                <option>Segurança</option>
                <option>Obras</option>
                <option>Política</option>
                <option>Comunidade</option>
              </select>
              {errors.tag && <ErrorMessage>{errors.tag}</ErrorMessage>}
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Data de Publicação
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-4 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Visibilidade / Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
              >
                <option>Publicado</option>
                <option>Rascunho</option>
                <option>Arquivado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
              Resumo (Linha fina) <span className="text-red-600">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Resumo que aparecerá na listagem do blog..."
              className="w-full resize-none rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F172A] outline-none transition focus:bg-white"
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </div>
        </section>

        {/* IMAGEM DE DESTAQUE */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-1 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Imagem de Capa
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Escolha a imagem que será exibida como destaque na matéria.
          </p>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#0F172A] bg-[#F8FAFC] p-6 text-center transition hover:bg-[#EFF6FF]">
            <span className="font-mono text-sm font-bold text-[#2563EB]">↑ Upload de Imagem</span>
            <span className="mt-1 font-mono text-xs font-bold text-[#0F172A]">
              {isUploading ? "Enviando arquivo..." : "Selecionar imagem principal"}
            </span>
            <span className="mt-0.5 font-mono text-[10px] text-[#64748B]">
              PNG, JPG, JPEG ou WEBP
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {form.image && (
            <div className="mt-4 overflow-hidden rounded-lg border-2 border-[#0F172A]">
              <img
                src={form.image}
                alt="Pré-visualização"
                className="max-h-80 w-full object-cover"
              />
            </div>
          )}
        </section>

        {/* CONTEÚDO COMPLETO */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-1 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Conteúdo da Notícia
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Escreva o texto integral da matéria.
          </p>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="12"
            placeholder="Escreva a notícia aqui..."
            className="w-full resize-y rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-4 text-xs font-medium leading-relaxed text-[#0F172A] outline-none transition focus:bg-white"
          />
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
        </section>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to="/admin/blog"
            className="rounded-xl border-2 border-[#0F172A] bg-white px-6 py-3 text-center font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="cursor-pointer rounded-xl border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isSubmitting ? "Gravando..." : "Publicar Matéria →"}
          </button>
        </div>
      </form>

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

function ErrorMessage({ children }) {
  return <p className="mt-1 font-mono text-[10px] font-bold text-red-600">{children}</p>;
}