import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/myProfile")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (data) => {
    await api.post("/login", data);
    const res = await api.get("/myProfile");
    setUser(res.data);
  };

  const register = async (data) => {
    await api.post("/register", data);
    const res = await api.get("/myProfile");
    setUser(res.data);
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{user, login, logout, register}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);