import { useState } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "../../../context/AuthContext";

export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const userName = user?.name || "Administrador";
  const userRole = user?.role === "admin" ? "Administrador" : user?.role || "Gabinete";

  const getInitials = (name) => {
    if (!name) return "AD";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-[3px] border-[#16211C] bg-white px-5 sm:px-6 lg:px-8">
        
        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#F6F8F5] font-black text-[#16211C] shadow-[2px_2px_0px_0px_rgba(22,33,28,1)] lg:hidden cursor-pointer"
        >
          ☰
        </button>

        {/* IDENTIFICAÇÃO DO PAINEL */}
        <div className="hidden lg:block">
          <span className="inline-block rounded-md border border-[#16211C] bg-[#FFC531] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-[#16211C]">
            Área Administrativa
          </span>
          <p className="mt-1 text-xs font-bold text-[#4E5C55]">
            Gestão e Acompanhamento Institucional
          </p>
        </div>

        {/* USUÁRIO LOGADO */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-black text-[#16211C]">
              {userName}
            </p>
            <p className="font-mono text-[10px] font-bold text-[#4E5C55] uppercase">
              {userRole}
            </p>
          </div>

          <div className="flex h-10 w-10 -rotate-2 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#1B4FA0] font-black text-white text-xs shadow-[2px_2px_0px_0px_rgba(22,33,28,1)]">
            {getInitials(userName)}
          </div>
        </div>
      </header>

      {/* SIDEBAR MOBILE OVERLAY */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          <div className="lg:hidden">
            <Sidebar mobile onClose={() => setMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}