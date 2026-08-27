import { useEffect, useState } from "react";
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa";
import { BsClipboard2PulseFill } from "react-icons/bs";
import { FaClipboardQuestion } from "react-icons/fa6";


// Mapeamento de Cores e Estilos Neo-Brutalistas
const themeMap = {
  blue: {
    badgeBg: "bg-blue-500/50",
    badgeText: "text-[#1B4FA0]",
    barBg: "bg-[#1B4FA0]",
    icon: <FaClipboardList />,
  },
  amber: {
    badgeBg: "bg-amber-400/50",
    badgeText: "text-[#E0A800]",
    barBg: "bg-[#E0A800]",
    icon: <BsClipboard2PulseFill />
  },
  orange: {
    badgeBg: "bg-zinc-400/50",
    badgeText: "text-zinc-500",
    barBg: "bg-zinc-400",
    icon: <FaClipboardQuestion />
  },
  green: {
    badgeBg: "bg-emerald-300/70",
    badgeText: "text-emerald-600",
    barBg: "bg-emerald-500/90",
    icon: <FaClipboardCheck />
  }
};

export default function DashboardCard({ number, type, text, color, progress }) {
  const [count, setCount] = useState(0);
  const theme = themeMap[color] || themeMap.blue;

  // Efeito de Contagem Numérica Animada
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.max(1, Math.ceil(number / (duration / 16)));

    const timer = setInterval(() => {
      start += step;

      if (start >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="relative flex flex-col justify-between rounded-2xl border-[2.5px] border-[#16211C] bg-white p-6 shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(22,33,28,1)]">
      
      {/* TOPO DO CARD */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-mono text-3xl font-black text-[#16211C] leading-none">
            {count.toLocaleString("pt-BR")}
          </span>
          <h4 className="mt-2 text-xs font-black uppercase tracking-wider text-[#16211C]">
            {type}
          </h4>
        </div>

        {/* ÍCONE COM MOLDURA ESPESSA */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#16211C] font-black text-base ${theme.badgeBg} `}>
          {theme.icon}
        </div>
      </div>

      {/* RODAPÉ E BARRA DE PROGRESSO */}
      <div className="mt-6 pt-4 border-t-2 border-dashed border-[#DEE6E0]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-[#4E5C55]">
            {text}
          </p>
          <span className={`font-mono text-[11px] font-black ${theme.badgeText}`}>
            {progress}%
          </span>
        </div>

        {/* BARRA DE PROGRESSO COM BORDA */}
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-[#16211C] bg-[#F6F8F5]">
          <div
            style={{ width: `${progress}%` }}
            className={`h-full ${theme.barBg} transition-all duration-1000 ease-out`}
          />
        </div>
      </div>
    </div>
  );
}