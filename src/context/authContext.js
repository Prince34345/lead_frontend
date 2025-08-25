import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);