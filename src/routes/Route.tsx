import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "@/components/UI/Loader";
import AuthenticationRoutes from "./AuthenticationRouter";
import PrivateRoutes from "./PrivateRouter";
import GetStartRoutes from "./GetStartRouter";

// Initialize the router with authentication routes
const router = createBrowserRouter(
  [AuthenticationRoutes, PrivateRoutes, GetStartRoutes],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME as string,
  }
);

function RouterApp() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="h-screen w-screen flex justify-center items-center bg-primary">
          <Loader />
        </div>
      }
    />
  );
}

export default RouterApp;
