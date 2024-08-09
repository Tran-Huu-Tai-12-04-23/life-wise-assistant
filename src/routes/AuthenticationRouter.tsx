import AuthLayout from "@/Layouts/AuthLayout";
import Loadable from "@/components/UI/Loadable";
import { lazy } from "react";

const AuthLogin = Loadable(lazy(() => import("@/views/auth/Login")));
const GoogleAuthSuccess = Loadable(
  lazy(() => import("@/views/auth/google/callback/success"))
);
const GithubAuthSuccess = Loadable(
  lazy(() => import("@/views/auth/github/callback/success"))
);

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
    {
      path: "github/callback/success",
      element: <GithubAuthSuccess />,
    },
  ],
};

export default AuthenticationRoutes;
