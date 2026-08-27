import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function ProtectedRoute() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-(--paper)">
        <span className="text-xs font-bold text-(--navy)">Verificando credenciais...</span>
      </div>
    );
  }

  // Se não estiver logado, redireciona diretamente para a tela de login
  return signed ? <Outlet /> : <Navigate to="/login" replace />;
}