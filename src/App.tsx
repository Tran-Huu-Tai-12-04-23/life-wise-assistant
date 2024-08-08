/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./components/UI/Loader";
import { useTheme } from "./context/ThemeContext";
import { getAccessToken } from "./helper";
import { useAuthAction } from "./redux/features/auth/action";
import { useAuthState } from "./redux/features/auth/authSlice";
import { RouterAppPrivate, RouterAppPublic } from "./routes/Route";

function App() {
  const { getProfile } = useAuthAction();
  const { currentUser } = useAuthState();
  const { theme } = useTheme();

  useEffect(() => {
    const initUser = async () => {
      const acToken = getAccessToken();
      acToken && (await getProfile());
    };
    initUser();
  }, []);

  return (
    <React.Suspense fallback={<Loader />}>
      {currentUser && <RouterAppPrivate />}
      {!currentUser && <RouterAppPublic />}
      <ToastContainer style={{ zIndex: 100000000 }} theme={theme} />
    </React.Suspense>
  );
}

export default App;
