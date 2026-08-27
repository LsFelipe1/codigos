import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restaura a sessão ao recarregar a página
    const storedUser = localStorage.getItem("@Gabinete:user");
    const storedToken = localStorage.getItem("@Gabinete:token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  function login(userData, tokenData) {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("@Gabinete:user", JSON.stringify(userData));
    localStorage.setItem("@Gabinete:token", tokenData);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@Gabinete:user");
    localStorage.removeItem("@Gabinete:token");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}