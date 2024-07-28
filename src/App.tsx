/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Loader from "./components/UI/Loader";
import { useAuthAction } from "./redux/features/auth/action";
import RouterApp from "./routes/Route";

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
