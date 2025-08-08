import { useState } from "react";
import { AuthContext } from "./AuthContextContext.jsx";

// Removed the export of AuthContext to resolve Fast Refresh warning

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, type }

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
