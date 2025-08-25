import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(false);
 
 const fetchUser = async () => {
   
    try {
      const { data } = await api.get("/auth/myProfile");
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await api.post("/auth/login", { email, password });
      await fetchUser();    
    } catch (error) {
      throw new Error(error);
    } finally {
       setLoading(false);
    }
  
  };

  const register = async (data) => {
    setLoading(false);
    try {
       await api.post("/auth/register", data);      
    } catch (error) {
       throw new Error(error);
    } finally {
       setLoading(true);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{login, logout, register, user, loading}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);