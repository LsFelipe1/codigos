import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiOutlineDoubleLeft } from "react-icons/ai";

function SidebarItem({ to, icon, children, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl border-2 px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
          isActive
            ? "border-[#0F172A] bg-[#0F172A] text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
            : "border-transparent text-[#475569] hover:border-[#0F172A] hover:bg-white hover:text-[#0F172A]"
        }`
      }
    >
      <span className="shrink-0">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
}

export default function Sidebar({ mobile = false, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    if (onClose) onClose();
    navigate("/login");
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r-2 border-[#0F172A] bg-[#F8FAFC] transition-all duration-300 ${
        mobile ? "flex" : "hidden lg:flex"
      }`}
    >
      {/* CABEÇALHO */}
      <div className="flex h-20 items-center justify-between border-b-2 border-[#0F172A] bg-white px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#0F172A] font-black text-xs text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.3)]">
            RL
          </div>
          <div>
            <h1 className="text-xs font-black text-[#0F172A] uppercase tracking-wider leading-none">
              Painel Admin
            </h1>
            <span className="font-mono text-[9px] font-bold uppercase text-[#64748B]">
              Gabinete Digital
            </span>
          </div>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#0F172A] bg-[#F1F5F9] font-black text-xs text-[#0F172A]"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        )}
      </div>

      {/* MENU NAVEGAÇÃO */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Principal
          </p>
          <div className="space-y-1">
            <SidebarItem
              to="/admin"
              end
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            >
              Visão Geral
            </SidebarItem>
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Gestão
          </p>
          <div className="space-y-1">
            <SidebarItem
              to="/admin/pedidos"
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            >
              Solicitações
            </SidebarItem>

            <SidebarItem
              to="/admin/pedidos/novo"
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Novo Pedido
            </SidebarItem>
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Comunicação
          </p>
          <div className="space-y-1">
            <SidebarItem
              to="/admin/blog"
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              }
            >
              Notícias
            </SidebarItem>

            <SidebarItem
              to="/admin/blog/novo"
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20.12 4.12a2 2 0 010 2.828l-8.586 8.586a2 2 0 01-.818.493l-4 1a1 1 0 01-1.213-1.213l1-4a2 2 0 01.493-.818l8.586-8.586z" />
                </svg>
              }
            >
              Nova Publicação
            </SidebarItem>
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            Sistema
          </p>
          <div className="space-y-1">
            <SidebarItem
              to="/admin/configuracoes"
              onClick={onClose}
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            >
              Configurações
            </SidebarItem>
          </div>
        </div>
      </nav>

      {/* RODAPÉ */}
      <div className="border-t-2 border-[#0F172A] bg-white p-4 space-y-2">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            navigate("/");
          }}
          className="flex w-full items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-[#F8FAFC] px-3.5 py-2 font-mono text-xs font-bold uppercase text-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:cursor-pointer hover:-translate-y-0.5"
        >
          <AiOutlineDoubleLeft className="text-xl" />
          <span>Portal Público</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border-2 border-[#0F172A] bg-red-50 px-3.5 py-2 font-mono text-xs font-bold uppercase text-zinc-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-x-0.5 hover:cursor-pointer hover:-translate-y-0.5"
        >
          <RiLogoutBoxFill className="text-xl" />
          <span>Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}