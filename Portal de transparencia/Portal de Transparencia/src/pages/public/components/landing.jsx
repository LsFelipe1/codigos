import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="relative overflow-hidden bg-[#0E8A46] border-b-[3px] border-[#16211C] py-16 lg:py-24">
      {/* SHAPES GEOMÉTRICOS DE FUNDO */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#FFC531] opacity-90 border-[3px] border-[#16211C]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#1B4FA0] opacity-60 border-[3px] border-[#16211C]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">

          {/* LADO ESQUERDO: TEXTO E BOTÕES */}
          <div className="pb-6 lg:pb-12">
            {/* TAG KICKER */}
            <div className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#16211C] bg-[#FFC531] px-4 py-1.5 font-extrabold text-[12px] uppercase tracking-wider text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]">
              <span>● Protocolo público aberto a todos</span>
            </div>

            {/* TÍTULO COM DESTAQUE EM CAIXA AMARELA */}
            <h1 className="mt-6 font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Cada solicitação vira <br />
              <span className="inline-block -rotate-1 bg-[#FFC531] px-3 py-1 text-[#16211C] border-[3px] border-[#16211C] shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] mt-2">
                protocolo.
              </span>
            </h1>

            <h2 className="mt-4 text-xl sm:text-2xl font-black text-[#E4F5EA]">
              Cada protocolo, uma resposta pública.
            </h2>

            <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[#E4F5EA]">
              Acompanhe as demandas do seu bairro, consulte o andamento de cada pedido e veja o caminho entre a solicitação e a solução.
            </p>

            {/* BOTÕES DE AÇÃO */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/pedidos"
                className="inline-flex items-center justify-center rounded-xl border-[2.5px] border-[#16211C] bg-[#FFC531] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]"
              >
                Consultar pedidos
              </Link>
              <a
                href="#noticias"
                className="inline-flex items-center justify-center rounded-xl border-[2.5px] border-white bg-transparent px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                Ver notícias
              </a>
            </div>

            {/* ESTATÍSTICAS RÁPIDAS */}
            <div className="mt-10 flex flex-wrap gap-8 border-t-2 border-dashed border-white/30 pt-6">
              <Stat number="100%" label="Pedidos públicos" />
              <Stat number="Aberto" label="Para a população" />
              <Stat number="24h" label="Acompanhamento" />
            </div>
          </div>

          {/* LADO DIREITO: PAINEL ANIMADO EM ESTILO NEO-BRUTALISTA */}
          <div className="relative hidden min-h-125 items-center justify-center lg:flex">
            
            {/* CONTAINER PRINCIPAL DO CARD */}
            <div className="relative w-full max-w-md rounded-3xl border-[3px] border-[#16211C] bg-white p-7 shadow-[8px_8px_0px_0px_rgba(22,33,28,1)] animate-[cardEnter_1s_ease-out]">
              
              {/* CABEÇALHO DO CARD */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#DEE6E0] pb-5">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-widest text-[#4E5C55]">
                    Portal Público
                  </p>
                  <h3 className="mt-0.5 text-lg font-black text-[#16211C]">
                    Acompanhamento Vivo
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#E4F5EA] text-[#0E8A46] font-black text-sm">
                  ✓
                </div>
              </div>

              {/* CONTEÚDO E STATUS */}
              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-lg border border-[#16211C] bg-[#E8EFFA] px-2.5 py-1 font-mono text-[10px] font-black uppercase text-[#1B4FA0]">
                      Iluminação
                    </span>

                    <h4 className="mt-3 text-lg font-black leading-tight text-[#16211C]">
                      Recuperação da iluminação pública
                    </h4>
                  </div>

                  <span className="shrink-0 rounded-xl border-2 border-[#16211C] bg-[#E4F5EA] px-2.5 py-1 text-xs font-black text-[#006028]">
                    Concluído
                  </span>
                </div>

                {/* CAIXA DE PROTOCOLO DESTAQUE */}
                <div className="rounded-2xl border-2 border-[#16211C] bg-[#FFF6DC] p-4">
                  <p className="font-mono text-[10px] font-black uppercase text-[#E0A800]">
                    Número do protocolo
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-black text-[#16211C]">
                    BEZ-2026-0001
                  </p>
                </div>

                {/* TIMELINE ANIMADA DE ACOMPANHAMENTO */}
                <div className="pt-2">
                  <p className="mb-4 text-xs font-black uppercase tracking-wider text-[#4E5C55]">
                    Andamento do pedido
                  </p>

                  <div className="relative pl-2">
                    {/* Linha vertical de progresso */}
                    <div className="absolute left-3.25 top-2 h-[calc(100%-16px)] w-1 bg-[#DEE6E0]" />
                    <div className="absolute left-3.25 top-2 h-[calc(100%-16px)] w-1 origin-top bg-[#0E8A46] animate-[progress_4s_ease-in-out_infinite]" />

                    <TimelineItem title="Pedido registrado" date="09 ago 2026" />
                    <TimelineItem title="Encaminhado" date="10 ago 2026" />
                    <TimelineItem title="Em andamento" date="11 ago 2026" />
                    <TimelineItem title="Concluído" date="12 ago 2026" />
                  </div>
                </div>
              </div>

              {/* FLOATING CARD SUPERIOR */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border-2 border-[#16211C] bg-[#FFC531] px-4 py-3 shadow-[4px_4px_0px_0px_rgba(22,33,28,1)] xl:block">
                <p className="text-[10px] font-black uppercase text-[#16211C]">Status</p>
                <p className="text-xs font-black text-[#16211C]">100% Atualizado ●</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <p className="font-black text-2xl text-white leading-none">
        {number}
      </p>
      <p className="mt-1 text-xs font-bold text-[#E4F5EA]">{label}</p>
    </div>
  );
}

function TimelineItem({ title, date }) {
  return (
    <div className="relative flex items-start gap-4 pb-4">
      <span className="relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-[#16211C] bg-[#0E8A46]" />
      <div>
        <p className="text-xs font-black text-[#16211C] leading-none">{title}</p>
        <p className="mt-1 font-mono text-[10px] text-[#4E5C55]">{date}</p>
      </div>
    </div>
  );
}