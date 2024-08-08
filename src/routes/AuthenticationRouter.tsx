import AuthLayout from "@/Layouts/AuthLayout";
import Loadable from "@/components/UI/Loadable";
import GoogleAuthSuccess from "@/views/auth/google/callback/success";
import { lazy } from "react";

const AuthLogin = Loadable(lazy(() => import("@/views/auth/Login")));

const AuthenticationRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "", // Adjusted to be relative to '/auth'
      element: <AuthLogin />,
    },
    {
      path: "google/callback/success",
      element: <GoogleAuthSuccess />,
    },
  ],
};

export default AuthenticationRoutes;
