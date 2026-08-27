import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../../../components/UI/toast";

const initialForm = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  district: "",
  street: "",
  tag: "",
  status: "Recebido",
  priority: "Média",
  responsible: "",
  images: [],
};

export default function NewRequest() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [toast, setToast] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleImages(e) {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages(previews);
  }

  function removePreviewImage(index) {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Informe o título do pedido.";
    if (!form.description.trim()) newErrors.description = "Informe a descrição do pedido.";
    if (!form.district.trim()) newErrors.district = "Informe o bairro.";
    if (!form.street.trim()) newErrors.street = "Informe a rua.";
    if (!form.tag) newErrors.tag = "Selecione uma categoria.";
    if (!form.responsible) newErrors.responsible = "Informe o responsável.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function generateProtocol() {
    const year = new Date().getFullYear();
    const randomNumber = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
    return `BEZ-${year}-${randomNumber}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newRequest = {
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      district: form.district.trim(),
      street: form.street.trim(),
      tag: form.tag,
      protocol: generateProtocol(),
      status: form.status,
      priority: form.priority,
      responsible: form.responsible,
      createdBy: "Equipe de Gestão",
    };

    try {
      const response = await fetch("http://localhost/gabinete-api/create_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRequest),
      });

      if (!response.ok) throw new Error("Falha ao salvar solicitação no banco.");

      setToast({
        message: `Solicitação gravada no MariaDB! Protocolo: ${newRequest.protocol}`,
        type: "success",
      });

      setTimeout(() => navigate("/admin/pedidos"), 1800);
    } catch (error) {
      setToast({
        message: "Erro de conexão com a API PHP local.",
        type: "error",
      });
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
            Administração
          </span>
          <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
            Novo Pedido
          </h1>
          <p className="mt-1 text-xs font-medium text-[#64748B] sm:text-sm">
            Cadastre uma solicitação pública recebida presencialmente.
          </p>
        </div>

        <Link
          to="/admin/pedidos"
          className="w-fit rounded-xl border-2 border-[#0F172A] bg-white px-4 py-2 font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          ← Voltar
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMAÇÕES DA SOLICITAÇÃO */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Informações do Pedido
          </h2>

          <div className="space-y-4">
            <Input
              label="Título do Pedido"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Manutenção da rede de iluminação pública"
              error={errors.title}
              required
            />

            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
                Descrição Detalhada <span className="text-red-600">*</span>
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Descreva detalhadamente a demanda recebida..."
                className={`w-full resize-none rounded-lg border-2 bg-[#F8FAFC] p-3 text-xs font-medium text-[#0F172A] outline-none transition focus:bg-white ${
                  errors.description ? "border-red-600" : "border-[#0F172A]"
                }`}
              />
              {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Categoria"
                name="tag"
                value={form.tag}
                onChange={handleChange}
                error={errors.tag}
                options={[
                  "Iluminação",
                  "Infraestrutura",
                  "Saúde",
                  "Educação",
                  "Segurança",
                  "Limpeza urbana",
                  "Transporte",
                  "Saneamento",
                  "Outro",
                ]}
              />

              <Select
                label="Prioridade"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                options={["Baixa", "Média", "Alta", "Urgente"]}
              />
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Localização da Demanda
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Bairro"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="Ex: Centro"
              error={errors.district}
              required
            />

            <Input
              label="Rua / Logradouro"
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Ex: Av. Otávio Pessoa"
              error={errors.street}
              required
            />
          </div>
        </section>

        {/* CONTROLE ADMINISTRATIVO */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-4 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Controle Administrativo
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select
              label="Status Inicial"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["Recebido", "Em análise", "Encaminhado", "Em andamento", "Concluído", "Cancelado"]}
            />

            <Select
              label="Órgão Responsável"
              name="responsible"
              value={form.responsible}
              onChange={handleChange}
              error={errors.responsible}
              options={[
                "Secretaria de Infraestrutura",
                "Secretaria de Saúde",
                "Secretaria de Educação",
                "Secretaria de Segurança",
                "Secretaria de Serviços Públicos",
                "Outro",
              ]}
            />

            <Input
              label="Data de Registro"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* ANEXO DE IMAGENS */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <h2 className="mb-2 text-xs font-black uppercase tracking-wider text-[#0F172A]">
            Anexos da Solicitação
          </h2>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#0F172A] bg-[#F8FAFC] p-6 text-center transition hover:bg-[#EFF6FF]">
            <span className="font-mono text-sm font-bold text-[#2563EB]">↑ Anexar Imagens</span>
            <span className="mt-1 font-mono text-[10px] text-[#64748B]">
              Selecione arquivos PNG ou JPG
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={handleImages}
              className="hidden"
            />
          </label>

          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg border-2 border-[#0F172A]">
                  <img src={image.url} alt={image.name} className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePreviewImage(index)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-md border border-[#0F172A] bg-red-600 font-bold text-xs text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* AÇÕES */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Link
            to="/admin/pedidos"
            className="rounded-xl border-2 border-[#0F172A] bg-white px-6 py-3 text-center font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="cursor-pointer rounded-xl border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Salvar Solicitação →
          </button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, error, type = "text", required = false }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border-2 bg-[#F8FAFC] px-4 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white ${
          error ? "border-red-600" : "border-[#0F172A]"
        }`}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

function Select({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full cursor-pointer rounded-lg border-2 bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white ${
          error ? "border-red-600" : "border-[#0F172A]"
        }`}
      >
        <option value="">Selecione...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

function ErrorMessage({ children }) {
  return <p className="mt-1 font-mono text-[10px] font-bold text-red-600">{children}</p>;
}