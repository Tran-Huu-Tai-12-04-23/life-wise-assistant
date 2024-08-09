import Loader from "@/components/UI/Loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRouter";
import GetStartRoutes, { NotFoundRoute } from "./GetStartRouter";
import PrivateRoutes from "./PrivateRouter";

// Initialize the router with authentication routes
const publicRouter = createBrowserRouter(
  [AuthenticationRoutes, NotFoundRoute],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME as string,
  }
);

const privateRouter = createBrowserRouter(
  [PrivateRoutes, GetStartRoutes, NotFoundRoute],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME as string,
  }
);

function RouterAppPublic() {
  return (
    <RouterProvider
      router={publicRouter}
      fallbackElement={
        <div className="h-screen w-screen flex justify-center items-center bg-primary">
          <Loader />
        </div>
      }
    />
  );
}

function RouterAppPrivate() {
  return (
    <RouterProvider
      router={privateRouter}
      fallbackElement={
        <div className="h-screen w-screen flex justify-center items-center bg-primary">
          <Loader />
        </div>
      }
    />
  );
}

export { RouterAppPrivate, RouterAppPublic };
