import { Link } from "react-router-dom";

const links = {
  portal: [
    ["Início", "/"],
    ["Pedidos", "/pedidos"],
    ["Notícias", "/noticias"],
  ],
  institucional: [
    ["Sobre o vereador", "/sobre"],
    ["Contato", "#"],
    ["Política de Privacidade", "#"],
    ["Área Administrativa", "/login"],
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#16211C] text-[#B9C4BD] pt-14 pb-8 border-t-[3px] border-[#16211C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.1fr] pb-10 border-b border-white/12">
          
          {/* 1. MARCA INSTITUCIONAL */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 -rotate-3 items-center justify-center rounded-xl border-[2.5px] border-[#16211C] bg-[#FFC531] font-black text-[#16211C] text-base shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                RL
              </div>
              <div>
                <h2 className="text-lg font-black text-white leading-none">
                  Rinaldo Luiz
                </h2>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFC531]">
                  VEREADOR DE BEZERROS
                </span>
              </div>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-[#A9B6AE]">
              Trabalhando por todos os cidadãos de Bezerros, com transparência e proximidade com a população.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold text-[#E4F5EA]">
              <span className="h-2 w-2 rounded-full bg-[#0E8A46] animate-pulse" />
              <span>Gabinete Digital Ativo</span>
            </div>
          </div>

          {/* 2. LINQUE PORTAL */}
          <FooterColumn title="Portal">
            {links.portal.map(([name, path]) => (
              <FooterLink key={name} to={path}>{name}</FooterLink>
            ))}
          </FooterColumn>

          {/* 3. INSTITUCIONAL */}
          <FooterColumn title="Institucional">
            {links.institucional.map(([name, path]) => (
              <FooterLink key={name} to={path}>{name}</FooterLink>
            ))}
          </FooterColumn>

          {/* 4. CONTATO */}
          <div>
            <FooterTitle>Contato</FooterTitle>

            <div className="space-y-3 font-mono text-xs text-[#A9B6AE]">
              <ContactItem label="Gabinete" value="Rua Dr. José Maria, 411 - Bezerros, PE" />
              <ContactItem label="E-mail" value="gabinete@rinaldoluiz.com.br" />
              <ContactItem label="Atendimento" value="(81) 99999-0000" />
            </div>
          </div>
        </div>

        {/* BASE DO FOOTER */}
        <div className="mt-6 flex flex-col gap-3 font-mono text-[11px] text-[#7E8B83] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Rinaldo Luiz. Todos os direitos reservados.
          </p>

          <p className="font-bold text-[#FFC531] uppercase">
            TRANSPARÊNCIA • PARTICIPAÇÃO • RESULTADOS
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }) {
  return (
    <h3 className="mb-4 font-mono text-xs font-black uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <nav className="flex flex-col gap-2.5">{children}</nav>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-xs font-semibold text-[#A9B6AE] transition-colors hover:text-[#FFC531]"
    >
      {children}
    </Link>
  );
}

function ContactItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-black uppercase text-[#FFC531]/70">
        {label}
      </p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}