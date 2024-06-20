import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "@/components/UI/Loader";
import AuthenticationRoutes from "./AuthenticationRouter";
import PrivateRoutes from "./PrivateRouter";

// Initialize the router with authentication routes
const router = createBrowserRouter([AuthenticationRoutes, PrivateRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME as string,
});

function RouterApp() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default RouterApp;
