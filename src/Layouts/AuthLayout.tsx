import { useAuthState } from "@/redux/features/auth/authSlice";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const teamState = useTeamState();
  const authState = useAuthState();

  if (
    authState.currentUser &&
    !authState.isLoading &&
    teamState.currentTeam !== null
  ) {
    return <Navigate to="/" />;
  }

  if (
    authState.currentUser &&
    !authState.isLoading &&
    teamState.currentTeam === null
  ) {
    return <Navigate to="/get-start" />;
  }
  return <Outlet />;
}

export default AuthLayout;
