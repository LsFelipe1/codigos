import { Link } from "react-router-dom";
import WhatsAppButton from "../../../../components/UI/whatsappButton";
import  "../../../assets/image/IMG_5513.jpg"
import { FaHospitalAlt, FaLightbulb, FaSearch, FaGraduationCap } from "react-icons/fa";

const pillars = [
  {
    icon: <FaHospitalAlt />,
    title: "Saúde com Dignidade",
    description: "Fiscalização constante dos postos de saúde, busca por medicamentos e ampliação do atendimento aos bairros."
  },
  {
    icon: <FaLightbulb />,
    title: "Infraestrutura & Iluminação",
    description: "Acompanhamento rigoroso de obras, pavimentação de ruas e manutenção da iluminação pública."
  },
  {
    icon: <FaSearch />,
    title: "Transparência Total",
    description: "Prestação de contas diária e abertura dos protocolos de solicitação para consulta livre de qualquer cidadão."
  },
  {
    icon: <FaGraduationCap />,
    title: "Educação & Juventude",
    description: "Incentivo a projetos de capacitação profissional e melhorias na estrutura das escolas do município."
  }
];

const timeline = [
  {
    year: "2018",
    title: "Radialista",
    description: "Atuação direta em associações de moradores, ouvindo as demandas e organizando mutirões de melhorias de bairros."
  },
  {
    year: "2022",
    title: "Primeira Candidatura",
    description: "Com o compromisso de criar um gabinete aberto, participativo e focado em soluções reais."
  },
  {
    year: "2024",
    title: "Primeira Eleição",
    description: "Primeiro mandato com votação expressiva, fortalecendo a fiscalização do Executivo e projetos sociais."
  },
  {
    year: "2026",
    title: "Continuação dos trabalhos",
    description: "Implementação da plataforma digital de transparência para controle de protocolos da população em tempo real."
  }
];

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-[#F6F8F5] py-12 md:py-20 border-b-[3px] border-[#16211C]">
      {/* GLOWS E SHAPES GEOMÉTRICOS DE FUNDO */}
      <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-[#E4F5EA] opacity-60 border-[3px] border-[#16211C]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-[#FFF6DC] opacity-70 border-[3px] border-[#16211C]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {/* HERO BIOGRÁFICO */}
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12">
          {/* FOTO E FRAME NEO-BRUTALISTA (5 Colunas) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <div className="relative overflow-hidden rounded-2xl border-[3px] border-[#16211C] bg-white p-3 shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]">
                <div className="relative h-96 w-full overflow-hidden rounded-xl border-2 border-[#16211C] bg-[#1B4FA0]">
                  {/* Placeholder da Foto do Vereador */}
                  {/* <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-[3px] border-[#16211C] bg-[#FFC531] font-black text-3xl text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]">
                      RL
                    </div>
                    <p className="mt-4 font-black text-base text-white">
                      Rinaldo Luiz
                    </p>
                    <p className="text-xs font-bold text-[#E8EFFA]">
                      Vereador de Bezerros
                    </p>
                  </div> */}
                  <img src="src/assets/image/IMG_5513.jpg" alt="foto do vereador Rinaldo Luiz sorrindo" className="min-h-95 min-w-160 cen" />
                </div>

                <div className="p-3 text-center">
                  <span className="inline-block rounded-full border-2 border-[#16211C] bg-[#E4F5EA] px-3 py-1 font-mono text-[11px] font-black text-[#0A5F32] uppercase">
                    ● Em Exercício do Mandato
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TEXTO DE APRESENTAÇÃO (7 Colunas) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#16211C] px-3 py-1 text-xs font-black uppercase text-[#FFC531]">
              Trajetória & Compromisso
            </span>

            <h1 className="text-3xl font-black text-[#16211C] sm:text-4xl lg:text-5xl leading-tight">
              Trabalho sério, presença constante e{" "}
              <span className="inline-block -rotate-1 bg-[#FFC531] px-2 py-0.5 border-2 border-[#16211C] text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]">
                transparência total.
              </span>
            </h1>

            <p className="text-sm leading-relaxed text-[#4E5C55] sm:text-base md:leading-8">
              Bem-vindo ao portal do nosso mandato. Sou Rinaldo Luiz, vereador dedicado a transformar as solicitações dos bairros em soluções reais para a nossa cidade. Acredito que a política se faz nas ruas, ouvindo as pessoas e fiscalizando a aplicação dos recursos públicos.
            </p>

            <p className="text-sm leading-relaxed text-[#4E5C55] sm:text-base md:leading-8">
              Este Gabinete Digital foi criado para garantir que cada cidadão tenha um canal aberto e direto de acompanhamento de pedidos de iluminação, infraestrutura, saúde e serviços públicos.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/pedidos"
                className="inline-flex items-center gap-2 rounded-xl border-[2.5px] border-[#16211C] bg-[#0E8A46] px-6 py-3.5 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
              >
                <span>Consultar solicitações</span>
                <span>→</span>
              </Link>

              <a
                href="#bandeiras"
                className="inline-flex items-center gap-2 rounded-xl border-[2.5px] border-[#16211C] bg-white px-6 py-3.5 text-xs font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
              >
                <span>Conhecer bandeiras</span>
              </a>
            </div>
          </div>
        </div>

        {/* ESTATÍSTICAS DA FAIXA DE RESUMO */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border-[3px] border-[#16211C] bg-[#16211C] p-6 shadow-[5px_5px_0px_0px_rgba(22,33,28,0.9)] md:grid-cols-4">
          <StatCard number="1º" label="Mandato em Exercício" />
          <StatCard number="+1.300" label="Pedidos Acompanhados" />
          <StatCard number="100%" label="Transparência Ativa" />
          <StatCard number="24h" label="Gabinete Digital" />
        </div>

        {/* PRINCIPAIS BANDEIRAS DE ATUAÇÃO */}
        <section id="bandeiras" className="mt-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#FFC531] px-3 py-1 text-xs font-black uppercase text-[#16211C]">
              Eixos de Trabalho
            </span>
            <h2 className="text-2xl font-black text-[#16211C] sm:text-3xl">
              Nossas Principais Bandeiras
            </h2>
            <p className="text-xs text-[#4E5C55] sm:text-sm">
              As diretrizes que orientam nossa atuação na Câmara e na fiscalização do município.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#E4F5EA] text-2xl">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#16211C]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4E5C55]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE / HISTÓRIA */}
        <section className="mt-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block rounded-md border-2 border-[#16211C] bg-[#E8EFFA] px-3 py-1 text-xs font-black uppercase text-[#1B4FA0]">
              Linha do Tempo
            </span>
            <h2 className="text-2xl font-black text-[#16211C] sm:text-3xl">
              Trajetória de Trabalho
            </h2>
            <p className="text-xs text-[#4E5C55] sm:text-sm">
              Conheça os principais marcos da nossa história e atuação política.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-5 rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] items-start"
              >
                <div className="shrink-0 rounded-xl border-2 border-[#16211C] bg-[#FFC531] px-4 py-2 font-mono text-sm font-black text-[#16211C]">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-base font-black text-[#16211C]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#4E5C55]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION FINAL */}
        <section className="mt-20 rounded-3xl border-[3px] border-[#16211C] bg-[#FFC531] p-8 text-center sm:p-12 shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]">
          <h2 className="text-2xl font-black text-[#16211C] sm:text-3xl">
            Tem alguma demanda para o seu bairro?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#16211C] font-semibold sm:text-sm">
            Seu pedido é transformado em protocolo público e acompanhado do registro até a resposta do Poder Executivo.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/pedidos"
              className="rounded-xl border-[2.5px] border-[#16211C] bg-[#16211C] px-6 py-3.5 text-xs font-black uppercase text-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Consultar lista de pedidos
            </Link>
          </div>
        </section>
      </div>

      <WhatsAppButton phoneNumber="5581999999999" />
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <p className="font-black text-2xl text-[#FFC531] sm:text-3xl">
        {number}
      </p>
      <p className="mt-1 text-[11px] font-bold text-[#C9D6CE] uppercase">{label}</p>
    </div>
  );
}