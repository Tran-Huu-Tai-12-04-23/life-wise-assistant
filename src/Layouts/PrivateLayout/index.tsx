import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { sideBarWidth } from "@/constant/constant";
import ModalUtil from "./ModalUtil";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";

function PrivateLayout() {
  const { currentUser, isLoading } = useAuthState();
  const { currentTeam } = useTeamState();
  const location = useLocation();

  if (!currentUser && !isLoading) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (!currentTeam) {
    return <Navigate to="/get-start" state={{ from: location }} />;
  }
  return (
    <div className="flex w-[100vw] justify-center items-center overflow-hidden">
      {/* contain all modal global for app */}
      <ModalUtil />
      <div className="w-[100vw]  h-[100vh] flex flex-col overflow-hidden">
        <Header />
        <div className="flex h-[calc(100vh-4rem)] w-full ">
          <Sidebar />
          <div
            style={{ width: `calc(100% - ${sideBarWidth}px)` }}
            className="content overflow-x-hidden"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateLayout;
