/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "./components/UI/Loader";
import React, { useEffect } from "react";
import RouterApp from "./routes/Route";
import { useAuthAction } from "./redux/features/auth/action";

function App() {
  const { getProfile } = useAuthAction();

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <React.Suspense fallback={<Loader />}>
      <RouterApp />
    </React.Suspense>
  );
}

export default App;
