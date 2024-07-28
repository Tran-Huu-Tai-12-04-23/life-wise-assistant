import PrivateLayout from "@/Layouts/PrivateLayout/index";
import Loadable from "@/components/UI/Loadable";
import { lazy } from "react";
import { privateRoutes } from "./private-route";

const Dashboard = Loadable(lazy(() => import("@/views/private/dashboard")));
const Task = Loadable(lazy(() => import("@/views/private/task")));
const Activity = Loadable(lazy(() => import("@/views/private/activity")));
const Setting = Loadable(lazy(() => import("@/views/private/setting")));
const Schedule = Loadable(lazy(() => import("@/views/private/schedule")));

const PrivateRoutes = {
  path: "/",
  element: <PrivateLayout />,
  children: [
    {
      path: privateRoutes.dashboard,
      element: <Dashboard />,
    },
    {
      path: privateRoutes.task,
      element: <Task />,
    },
    {
      path: privateRoutes.schedule,
      element: <Schedule />,
    },
    {
      path: privateRoutes.activity,
      element: <Activity />,
    },
    {
      path: privateRoutes.setting,
      element: <Setting />,
    },
  ],
};

export default PrivateRoutes;
