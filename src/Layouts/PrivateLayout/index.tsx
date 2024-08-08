import { sideBarWidth } from "@/constant/constant";
import { useAuthState } from "@/redux/features/auth/authSlice";
import Message from "@/views/message";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Outlet } from "react-router-dom";
import FloatingMessage from "./FloatingMessage";
import Header from "./Header";
import ModalUtil from "./ModalUtil";
import Sidebar from "./Sidebar";

function PrivateLayout() {
  const { currentUser } = useAuthState();
  // const { currentTeam } = useTeamState();
  // const location = useLocation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // if (!currentUser && !isLoading) {
  //   return <Navigate to="/auth/login" state={{ from: location }} />;
  // }

  // if (!currentTeam) {
  //   return <Navigate to="/get-start" state={{ from: location }} />;
  // }
  return (
    <>
      <div className="flex w-[100vw] justify-center items-center overflow-hidden bg-primary-content">
        {/* contain all modal global for app */}
        <ModalUtil />
        {currentUser && <FloatingMessage setSelectedId={setSelectedId} />}

        <div className="w-[100vw]  h-[100vh] flex flex-col overflow-hidden">
          <Header />
          <div className="flex h-[calc(100vh-4rem)] w-full ">
            <Sidebar />
            <div
              style={{ width: `calc(100% - ${sideBarWidth}px)` }}
              className="content overflow-x-hidden bg-secondary"
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-[10000000] bg-primary/10 backdrop-blur-3xl"
            layoutId={selectedId}
          >
            <IoMdClose
              onClick={() => {
                setSelectedId(null);
              }}
              size={22}
              className="cursor-pointer hover:text-red-500 text-red-400 absolute top-[0.8rem] right-[0.8rem] shadow-2xl z-50"
            />
            <Message />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PrivateLayout;
