import Loader from "./components/UI/Loader";
import React from "react";
import RouterApp from "./route/Route";

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <RouterApp />
    </React.Suspense>
  );
}

export default App;
