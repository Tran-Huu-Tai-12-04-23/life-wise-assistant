import ModalUtil from "@/Layouts/PrivateLayout/ModalUtil";
import Loadable from "@/components/UI/Loadable";
import React, { lazy } from "react";
import { Outlet } from "react-router-dom";
import NotFoundPage from "./not-found";

const GetStartScreen = Loadable(lazy(() => import("@/views/get-start/index")));
const Layout = () => {
  return (
    <React.Fragment>
      <ModalUtil />
      <Outlet />;
    </React.Fragment>
  );
};
const GetStartRoutes = {
  path: "/get-start",
  element: <Layout />,
  children: [
    {
      path: "",
      element: <GetStartScreen />,
    },
  ],
};
const NotFoundRoute = {
  path: "*",
  element: <NotFoundPage />,
};
export { NotFoundRoute };
export default GetStartRoutes;
