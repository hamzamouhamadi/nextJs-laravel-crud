import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import { useRouter } from "next/router";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLogged(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setLogged(true);
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("access_token");
    } catch (error) {
      console.log(error);
    }
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
