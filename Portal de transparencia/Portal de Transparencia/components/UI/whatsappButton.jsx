import { useState } from "react";

export default function WhatsAppButton({ phoneNumber = "5581999999999", message = "Olá! Gostaria de falar com o Gabinete do Vereador Rinaldo Luiz." }) {
  const [isHovered, setIsHovered] = useState(false);

  // Link formatado para o WhatsApp Web / App
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Falar pelo WhatsApp com o Gabinete"
        className="group relative flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_8px_25px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_12px_30px_rgba(37,211,102,0.45)]"
      >
        {/* Ícone SVG do WhatsApp */}
        <svg
          className="h-6 w-6 shrink-0 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.12-1.334c1.464.798 3.111 1.218 4.887 1.219h.005c5.507 0 9.991-4.479 9.992-9.986.001-2.667-1.034-5.174-2.916-7.058C17.205 3.036 14.7 2 12.012 2zm5.828 14.18c-.24.674-1.398 1.288-1.939 1.371-.497.076-1.144.11-1.841-.113-.427-.137-.978-.316-1.693-.625-2.986-1.293-4.935-4.323-5.086-4.523-.148-.2-1.222-1.629-1.222-3.107 0-1.479.774-2.206 1.049-2.506.275-.3.6-.375.8-.375.2 0 .4 0 .575.009.187.01.437-.071.687.528.25.6.85 2.072.925 2.222.075.15.125.325.025.525s-.15.3-.3.475c-.15.175-.315.39-.45.525-.15.15-.306.315-.131.615.175.3 0 .778 1.137 1.8 1.458 1.31 2.689 1.718 3.064 1.905.375.187.592.162.812-.088.225-.25.962-1.121 1.221-1.506.25-.386.5-.323.837-.198.337.125 2.137 1.007 2.502 1.19.365.183.61.275.7.425.089.15.089.871-.151 1.545z" />
        </svg>

        {/* Texto Expansível */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-40 sm:max-w-0">
          Fale com o Gabinete
        </span>

        {/* Badge Pulsante de Status Online */}
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#25D366] bg-emerald-300" />
        </span>
      </a>
    </div>
  );
}