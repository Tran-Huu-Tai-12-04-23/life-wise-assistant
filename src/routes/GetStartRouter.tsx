import { lazy } from "react";
import Loadable from "@/components/UI/Loadable";
import React from "react";
import ModalUtil from "@/Layouts/PrivateLayout/ModalUtil";
import { Outlet } from "react-router-dom";

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

export default GetStartRoutes;
