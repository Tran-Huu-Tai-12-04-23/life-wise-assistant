import { lazy } from "react";
import Loadable from "@/components/UI/Loadable";
import AuthLayout from "@/Layouts/AuthLayout";

const AuthLogin = Loadable(lazy(() => import("@/views/auth/Login")));

const AuthenticationRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    {
      path: "login", // Adjusted to be relative to '/auth'
      element: <AuthLogin />,
    },
  ],
};

export default AuthenticationRoutes;
