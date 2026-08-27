import { useEffect, useState } from "react";
import { fetchSettings, saveSettings } from "../../../../src/services/api";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    address: "",
    publicRequests: true,
    showResponsible: true,
    maintenance: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // CARREGA CONFIGURAÇÕES DO BANCO AO ENTRAR
  useEffect(() => {
    async function loadConfig() {
      try {
        setIsLoading(true);
        const data = await fetchSettings();
        if (data && !data.error) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        setStatusMessage({ type: "error", text: "Erro ao conectar com o banco MariaDB." });
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setStatusMessage({ type: "", text: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSaving(true);
      await saveSettings(settings);
      setStatusMessage({ type: "success", text: "✓ Configurações gravadas com sucesso no MariaDB!" });
    } catch (err) {
      setStatusMessage({ type: "error", text: "Falha ao salvar alterações." });
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-white p-5 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F172A] border-t-transparent" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Carregando parâmetros...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* CABEÇALHO */}
      <div>
        <span className="inline-block rounded-md border-2 border-[#0F172A] bg-[#0F172A] px-3 py-1 font-mono text-[10px] font-bold uppercase text-white">
          Sistema
        </span>
        <h1 className="mt-2 text-2xl font-black text-[#0F172A] sm:text-3xl">
          Configurações Gerais
        </h1>
        <p className="mt-1 text-xs font-medium text-[#64748B] sm:text-sm">
          Gerencie informações globais do portal e parâmetros de visibilidade.
        </p>
      </div>

      {statusMessage.text && (
        <div
          className={`rounded-xl border-2 border-[#0F172A] px-5 py-4 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] ${
            statusMessage.type === "success" ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#FEE2E2] text-[#991B1B]"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMAÇÕES INSTITUCIONAIS */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="mb-6 border-b-2 border-dashed border-[#E2E8F0] pb-4">
            <h2 className="text-sm font-black uppercase text-[#0F172A] tracking-wider">
              Informações Institucionais
            </h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Dados aplicados dinamicamente nos rodapés e cabeçalhos públicos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Nome do Gabinete / Site"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
            />

            <Input
              label="E-mail Institucional"
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
            />

            <Input
              label="Telefone do Gabinete"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
            />

            <Input
              label="WhatsApp (Com DDD e 55)"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              placeholder="5581999999999"
            />

            <div className="md:col-span-2">
              <Input
                label="Endereço Físico"
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* REGRAS DE EXIBIÇÃO */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="mb-6 border-b-2 border-dashed border-[#E2E8F0] pb-4">
            <h2 className="text-sm font-black uppercase text-[#0F172A] tracking-wider">
              Transparência & Visibilidade
            </h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Defina como as solicitações municipais são apresentadas à população.
            </p>
          </div>

          <div className="space-y-3">
            <Toggle
              name="publicRequests"
              checked={settings.publicRequests}
              onChange={handleChange}
              title="Exibir Pedidos Publicamente"
              description="Permite que cidadãos pesquisem e vejam o andamento das demandas."
            />

            <Toggle
              name="showResponsible"
              checked={settings.showResponsible}
              onChange={handleChange}
              title="Exibir Secretaria Responsável"
              description="Exibe nos detalhes qual órgão municipal foi acionado pelo gabinete."
            />
          </div>
        </section>

        {/* MANUTENÇÃO DO SISTEMA */}
        <section className="rounded-xl border-2 border-[#0F172A] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
          <div className="mb-6 border-b-2 border-dashed border-[#E2E8F0] pb-4">
            <h2 className="text-sm font-black uppercase text-[#0F172A] tracking-wider">
              Segurança do Portal
            </h2>
            <p className="mt-0.5 text-xs text-[#64748B]">
              Ações operacionais sobre a plataforma.
            </p>
          </div>

          <Toggle
            name="maintenance"
            checked={settings.maintenance}
            onChange={handleChange}
            title="Modo de Manutenção"
            description="Restringe o acesso do público ao portal enquanto alterações são feitas."
            danger
          />
        </section>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl border-2 border-[#0F172A] bg-[#2563EB] px-6 py-3 font-mono text-xs font-bold uppercase text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "Gravando..." : "Salvar Alterações →"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-[10px] font-bold uppercase text-[#64748B]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] px-4 py-2.5 font-mono text-xs font-bold text-[#0F172A] outline-none transition focus:bg-white"
      />
    </div>
  );
}

function Toggle({ name, checked, onChange, title, description, danger = false }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 rounded-lg border-2 border-[#0F172A] bg-[#F8FAFC] p-4 transition hover:bg-[#EFF6FF]">
      <div>
        <p className={`text-xs font-black uppercase ${danger ? "text-red-700" : "text-[#0F172A]"}`}>
          {title}
        </p>
        <p className="mt-0.5 text-xs text-[#64748B] font-medium">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 accent-[#0F172A] cursor-pointer"
      />
    </label>
  );
}