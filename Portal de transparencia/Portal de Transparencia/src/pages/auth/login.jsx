import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      login(response.user, response.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "E-mail ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen overflow-hidden items-center justify-center bg-[#F6F8F5] px-5 py-12 border-b-[3px] border-[#16211C]">
      {/* SHAPE GEOMÉTRICO LIMPO NO FUNDO */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#E4F5EA] border-[3px] border-[#16211C] opacity-70" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#FFF6DC] border-[3px] border-[#16211C] opacity-70" />

      {/* CARD PRINCIPAL CLEAN */}
      <div className="relative w-full max-w-md rounded-2xl border-[3px] border-[#16211C] bg-white p-8 shadow-[6px_6px_0px_0px_rgba(22,33,28,1)] sm:p-10">
        
        {/* CABEÇALHO */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#1B4FA0] hover:underline"
          >
            ← Voltar ao portal público
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 -rotate-3 items-center justify-center rounded-xl border-2 border-[#16211C] bg-[#FFC531] font-black text-[#16211C] text-sm shadow-[2px_2px_0px_0px_rgba(22,33,28,1)]">
              RL
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#16211C]">
                Acesso Restrito
              </h1>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4E5C55]">
                Gabinete Digital
              </p>
            </div>
          </div>
        </div>

        {/* ALERTA DE ERRO CLEAN */}
        {error && (
          <div className="mb-5 rounded-xl border-2 border-[#16211C] bg-red-100 p-3 text-center font-mono text-xs font-black text-red-900">
            {error}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CAMPO DE E-MAIL */}
          <div>
            <label className="mb-1 block font-mono text-[10px] font-black uppercase text-[#4E5C55]">
              E-mail institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gabinete.com"
              required
              className="w-full rounded-xl border-2 border-[#16211C] bg-[#F6F8F5] px-4 py-3 font-mono text-xs font-bold text-[#16211C] outline-none transition focus:bg-white"
            />
          </div>

          {/* CAMPO DE SENHA */}
          <div>
            <label className="mb-1 block font-mono text-[10px] font-black uppercase text-[#4E5C55]">
              Senha de acesso
            </label>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border-2 border-[#16211C] bg-[#F6F8F5] py-3 pl-4 pr-20 font-mono text-xs font-bold text-[#16211C] outline-none transition focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 font-mono text-[10px] font-black uppercase text-[#1B4FA0] cursor-pointer hover:underline"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {/* BOTÃO DE ENTRAR */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer rounded-xl border-[2.5px] border-[#16211C] bg-[#16211C] py-3.5 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(22,33,28,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 disabled:opacity-70"
            >
              {isLoading ? "Autenticando..." : "Entrar no Painel →"}
            </button>
          </div>
        </form>

        {/* RODAPÉ */}
        <div className="mt-6 border-t-2 border-dashed border-[#DEE6E0] pt-4 text-center">
          <p className="font-mono text-[10px] text-[#4E5C55]">
            Painel exclusivo para equipe e moderação.
          </p>
        </div>

      </div>
    </main>
  );
}