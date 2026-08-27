import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiArrowToLeft } from "react-icons/bi";

const links = [
  ["Início", "/"],
  ["Pedidos", "/pedidos"],
  ["Notícias", "/noticias"],
  ["Sobre", "/sobre"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Monitora o scroll da página para ajustar o tamanho do header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => { if (window.innerWidth >= 768) setOpen(false); };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* TOPBAR VERDE INSTITUCIONAL */}
      <div className="bg-[#0A5F32] text-[#DDEFE2] text-[12px] font-semibold py-2 px-6 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">gabinete@rinaldoluiz.com.br</span>
            <span className="opacity-40">•</span>
            <span className="hover:text-white transition-colors cursor-pointer">(81) 99999-0000</span>
          </div>
          <div className="flex gap-4 text-xs font-bold ml-auto sm:ml-0">
            <a href="#" className="hover:text-[#FFC531] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#FFC531] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#FFC531] transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* HEADER PRINCIPAL COM ANIMACAO DE SCROLL */}
      <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#16211C] bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12 transition-all duration-300 ease-in-out ${
            scrolled ? "h-16" : "h-20"
          }`}
        >

          {/* LOGO NEO-BRUTALISTA COM ANIMACAO HOVER */}
          <Link to="/" className="group flex items-center gap-3">
            <div
              className={`flex -rotate-3 items-center justify-center rounded-xl border-[3px] border-[#16211C] bg-[#1B4FA0] font-black text-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-all duration-300 group-hover:scale-105 group-hover:-rotate-6 group-hover:bg-[#0E8A46] ${
                scrolled ? "h-9 w-9 text-xs" : "h-11 w-11 text-base"
              }`}
            >
              <BiArrowToLeft />
            </div>
            <div className="flex flex-col">
              <strong
                className={`font-black text-[#16211C] leading-none transition-all duration-300 group-hover:text-[#1B4FA0] ${
                  scrolled ? "text-base" : "text-lg"
                }`}
              >
                Rinaldo Luiz
              </strong>
              <span
                className={`font-bold text-[#4E5C55] uppercase tracking-wider transition-all duration-300 ${
                  scrolled ? "text-[9px] mt-0.5" : "text-[11px] mt-1"
                }`}
              >
                VEREADOR DE BEZERROS
              </span>
            </div>
          </Link>

          {/* NAVEGAÇÃO DESKTOP COM INDICADOR FLUTUANTE */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(([name, path]) => {
              const active = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`group relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-[#0E8A46] text-white shadow-[2px_2px_0px_0px_rgba(22,33,28,1)] border-2 border-[#16211C]"
                      : "text-[#16211C] hover:bg-[#E4F5EA] hover:text-[#0A5F32]"
                  }`}
                >
                  {name}
                  {!active && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#FFC531] transition-all duration-300 group-hover:w-1/2" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* BOTÕES DE AÇÃO INTERATIVOS */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className={`rounded-xl border-[2.5px] border-[#16211C] bg-white font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#F6F8F5] hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)] active:translate-x-0 active:translate-y-0 ${
                scrolled ? "px-3.5 py-1.5 text-[11px]" : "px-4 py-2 text-xs"
              }`}
            >
              Painel
            </Link>

            <Link
              to="/pedidos"
              className={`rounded-xl border-[2.5px] border-[#16211C] bg-[#FFC531] font-black uppercase text-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)] active:translate-x-0 active:translate-y-0 ${
                scrolled ? "px-3.5 py-1.5 text-[11px]" : "px-4 py-2 text-xs"
              }`}
            >
              Fazer pedido
            </Link>
          </div>

          {/* BOTÃO BURGER MOBILE ANIMADO (X) */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="md:hidden relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#F6F8F5] shadow-[2px_2px_0px_0px_rgba(22,33,28,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <div className="flex w-5 flex-col gap-1 items-center justify-center">
              <span
                className={`h-0.5 w-full bg-[#16211C] rounded-full transition-all duration-300 ease-in-out ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#16211C] rounded-full transition-all duration-300 ease-in-out ${
                  open ? "opacity-0 scale-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full bg-[#16211C] rounded-full transition-all duration-300 ease-in-out ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>

        </div>

        {/* MENU MOBILE EXPANSÍVEL COM ANIMAÇÃO DE ALTURA */}
        <div
          className={`overflow-hidden border-t-[3px] border-[#16211C] bg-white transition-all duration-300 ease-in-out md:hidden ${
            open ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-t-0"
          }`}
        >
          <div className="px-6 space-y-3">
            <nav className="flex flex-col gap-2">
              {links.map(([name, path]) => {
                const active = pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-black text-xs uppercase border-2 border-[#16211C] transition-all ${
                      active
                        ? "bg-[#0E8A46] text-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)]"
                        : "bg-[#F6F8F5] text-[#16211C] hover:bg-[#E4F5EA]"
                    }`}
                  >
                    <span>{name}</span>
                    {active && <span className="h-2 w-2 rounded-full bg-[#FFC531]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 border-t-2 border-dashed border-[#DEE6E0]">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center py-3 rounded-xl font-black text-xs uppercase bg-[#FFC531] text-[#16211C] border-2 border-[#16211C] shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Área Administrativa →
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}