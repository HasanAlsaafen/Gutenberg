import { useContext } from "react";
import { AuthContext } from "../context/AuthContextContext.jsx";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.type !== "admin")
    return <Navigate to="/login" replace />;
  return children;
}
