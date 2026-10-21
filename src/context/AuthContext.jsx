import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, fetchCurrentUser } from "../services/apiService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("bht_auth_token"));
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(() => {
    return sessionStorage.getItem("bht_guest_visited") === "true";
  });

  // Verify token on mount or token change
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      const storedToken = localStorage.getItem("bht_auth_token");
      if (!storedToken) {
        if (isMounted) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const res = await fetchCurrentUser(storedToken);
        if (isMounted) {
          if (res.success && res.user) {
            setUser(res.user);
            setToken(storedToken);
          } else {
            // Token invalid or expired
            localStorage.removeItem("bht_auth_token");
            setToken(null);
            setUser(null);
          }
        }
      } catch {
        if (isMounted) {
          localStorage.removeItem("bht_auth_token");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success && res.token) {
      localStorage.setItem("bht_auth_token", res.token);
      setToken(res.token);
      setUser(res.user);
      sessionStorage.setItem("bht_guest_visited", "true");
      setHasVisited(true);
      return { success: true, user: res.user, message: res.message };
    }
    return { success: false, error: res.error };
  };

  const signup = async (userData) => {
    const res = await signupUser(userData);
    if (res.success && res.token) {
      localStorage.setItem("bht_auth_token", res.token);
      setToken(res.token);
      setUser(res.user);
      sessionStorage.setItem("bht_guest_visited", "true");
      setHasVisited(true);
      return { success: true, user: res.user, message: res.message };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    localStorage.removeItem("bht_auth_token");
    setToken(null);
    setUser(null);
  };

  const continueAsGuest = () => {
    sessionStorage.setItem("bht_guest_visited", "true");
    setHasVisited(true);
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    hasVisited,
    login,
    signup,
    logout,
    continueAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
