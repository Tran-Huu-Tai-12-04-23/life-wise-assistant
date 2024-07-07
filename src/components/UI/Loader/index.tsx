// material-ui
import { useLocation } from "react-router-dom";
import "./style.css";
import { useMemo } from "react";
// ==============================|| LOADER ||============================== //
const Loader = () => {
  const pathname = useLocation().pathname;

  const isGlobal = useMemo(() => {
    if (pathname.includes("/login")) return true;
    if (pathname.includes("/get-start")) return true;
  }, [pathname]);

  return (
    <div
      className={`w-full h-full flex justify-center ${
        isGlobal
          ? "fixed top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-blue-600 to-green-600"
          : "bg-[rgba(0,0,0,0.01)]"
      } items-center mt-auto mb-auto ml-auto mr-auto  backdrop-blur-sm z-50`}
    >
      <div className="spinner-custom">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
