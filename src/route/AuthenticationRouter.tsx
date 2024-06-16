import { lazy } from "react";
import Loadable from "@/components/UI/Loadable";
import AuthLayout from "@/Layouts/AuthLayout";

// Lazy-loaded components
const AuthLogin = Loadable(lazy(() => import("@/views/auth/Login")));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "",
      element: <AuthLogin />,
    },
  ],
};

export default AuthenticationRoutes;
