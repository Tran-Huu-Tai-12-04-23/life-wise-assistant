import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const { user, isLoaded } = useAuth();

  if (user && isLoaded) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default AuthLayout;
