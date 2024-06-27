import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { sideBarWidth } from "@/constant/constant";

function PrivateLayout() {
  const { user, isLoaded } = useAuth();
  const location = useLocation();

  if (!user && isLoaded) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return (
    <div className="flex w-[100vw] justify-center items-center ">
      <div className="w-[100vw]  h-[100vh] flex flex-col ">
        <Header />
        <div className="flex h-[calc(100vh-4rem)] w-full ">
          <Sidebar />
          <div
            style={{ width: `calc(100% - ${sideBarWidth}px)` }}
            className="content bg-[rgba(0,0,0,0.02)] overflow-x-hidden"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateLayout;
