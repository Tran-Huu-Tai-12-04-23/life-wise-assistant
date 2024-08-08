import { Outlet } from "react-router-dom";

function AuthLayout() {
  // const teamState = useTeamState();
  // const authState = useAuthState();

  // if (
  //   authState.currentUser &&
  //   !authState.isLoading &&
  //   teamState.currentTeam !== null
  // ) {
  //   return <Navigate to="/" />;
  // }

  // if (
  //   authState.currentUser &&
  //   !authState.isLoading &&
  //   teamState.currentTeam === null
  // ) {
  //   return <Navigate to="/get-start" />;
  // }
  return <Outlet />;
}

export default AuthLayout;
