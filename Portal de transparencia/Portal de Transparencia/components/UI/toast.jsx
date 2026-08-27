import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex animate-[slideUp_0.3s_ease-out] items-center gap-3 rounded-2xl border border-(--gray-200) bg-(--paper) p-4 shadow-[0_10px_30px_rgba(18,35,63,0.12)] min-w-80 max-w-md">
      {/* Ícone */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
          isSuccess
            ? "bg-(--green-bg) text-(--green)"
            : "bg-(--red-bg) text-(--red)"
        }`}
      >
        {isSuccess ? "✓" : "✕"}
      </div>

      {/* Mensagem */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-(--navy)">
          {isSuccess ? "Sucesso!" : "Atenção"}
        </p>
        <p className="mt-0.5 text-xs text-(--ink-soft) leading-snug">
          {message}
        </p>
      </div>

      {/* Botão Fechar */}
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-lg p-1 text-(--gray-500) transition hover:bg-(--gray-100) hover:text-(--navy) cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}