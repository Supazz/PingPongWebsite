import { Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";

export const RequireAdmin = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <p>Checking your session…</p>;
  }

  if (error) {
    return <p role="alert"> {error}</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.roles.includes("Admin")) {
    return <p>Access denied. An Admin account is required.</p>;
  }

  return <Outlet />;
};
