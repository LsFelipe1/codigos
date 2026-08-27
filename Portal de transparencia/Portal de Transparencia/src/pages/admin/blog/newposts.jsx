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
  const [isUploading, setIsUploading] = useState(false); // ✅ ESTADO ADICIONADO AQUI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // UPLOAD REAL DA IMAGEM PARA O SERVIDOR PHP
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

  // SUBMISSÃO DO FORMULÁRIO (ÚNICA E CORRETA)
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
          <p className="text-xs font-bold uppercase tracking-widest text-(--blue)">
            Blog Institucional
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-(--navy) sm:text-3xl">
            Nova Publicação
          </h1>
          <p className="mt-1 text-xs text-(--ink-soft) sm:text-sm">
            Escreva e publique informativos gravando diretamente no banco de dados.
          </p>
        </div>

        <Link
          to="/admin/blog"
          className="w-fit rounded-xl border border-(--gray-200) bg-white px-4 py-2 text-xs font-bold text-(--navy) transition hover:bg-(--gray-100)"
        >
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMAÇÕES BÁSICAS */}
        <section className="rounded-3xl border border-(--gray-200) bg-(--paper) p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-(--navy)">
            Informações Gerais
          </h2>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--navy)">
              Título da Matéria <span className="text-(--red)">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Novo hospital será construído em Bezerros"
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-xs font-medium text-(--ink) outline-none transition focus:ring-4 focus:ring-(--blue-100) ${
                errors.title
                  ? "border-(--red)"
                  : "border-(--gray-200) focus:border-(--blue)"
              }`}
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--navy)">
                Categoria <span className="text-(--red)">*</span>
              </label>
              <select
                name="tag"
                value={form.tag}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-xl border border-(--gray-200) bg-white px-3.5 py-2.5 text-xs font-bold text-(--ink) outline-none transition focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
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
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--navy)">
                Data de Publicação
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-(--gray-200) bg-white px-4 py-2.5 text-xs font-medium text-(--ink) outline-none transition focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--navy)">
                Visibilidade / Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-xl border border-(--gray-200) bg-white px-3.5 py-2.5 text-xs font-bold text-(--ink) outline-none transition focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
              >
                <option>Publicado</option>
                <option>Rascunho</option>
                <option>Arquivado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-(--navy)">
              Resumo (Linha fina) <span className="text-(--red)">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Resumo que aparecerá na listagem do blog..."
              className="w-full resize-none rounded-xl border border-(--gray-200) bg-white px-4 py-3 text-xs font-medium text-(--ink) outline-none transition focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </div>
        </section>

        {/* IMAGEM DE DESTAQUE */}
        <section className="rounded-3xl border border-(--gray-200) bg-(--paper) p-6 shadow-xs">
          <h2 className="mb-1 text-sm font-black text-(--navy)">
            Imagem de Capa
          </h2>
          <p className="text-xs text-(--gray-500) mb-4">
            Escolha a imagem que será exibida como destaque na matéria.
          </p>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-(--gray-200) p-6 text-center transition hover:border-(--blue) hover:bg-(--blue-50)/50">
            <span className="text-xl text-(--blue)">↑</span>
            <span className="mt-2 text-xs font-bold text-(--navy)">
              {isUploading ? "Enviando arquivo..." : "Selecionar imagem principal"}
            </span>
            <span className="mt-1 text-[11px] text-(--gray-500)">
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
            <div className="mt-4 overflow-hidden rounded-2xl border border-(--gray-200)">
              <img
                src={form.image}
                alt="Pré-visualização"
                className="max-h-80 w-full object-cover"
              />
            </div>
          )}
        </section>

        {/* CONTEÚDO COMPLETO */}
        <section className="rounded-3xl border border-(--gray-200) bg-(--paper) p-6 shadow-xs">
          <h2 className="mb-1 text-sm font-black text-(--navy)">
            Conteúdo da Notícia
          </h2>
          <p className="text-xs text-(--gray-500) mb-4">
            Escreva o texto integral da matéria.
          </p>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="12"
            placeholder="Escreva a notícia aqui..."
            className="w-full resize-y rounded-xl border border-(--gray-200) bg-white p-4 text-xs leading-relaxed text-(--ink) outline-none transition focus:border-(--blue) focus:ring-4 focus:ring-(--blue-100)"
          />
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
        </section>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to="/admin/blog"
            className="rounded-xl border border-(--gray-200) bg-white px-6 py-3 text-center text-xs font-bold text-(--navy) transition hover:bg-(--gray-100)"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="cursor-pointer rounded-xl bg-(--navy) px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-(--blue-dark) disabled:opacity-50"
          >
            {isSubmitting ? "Gravando no MariaDB..." : "Publicar matéria"}
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
  return <p className="mt-1 text-[11px] font-bold text-(--red)">{children}</p>;
}