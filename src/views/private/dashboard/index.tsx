import { useAuthState } from "@/redux/features/auth/authSlice";
import BarChart from "./barchart";
import Report from "./report";
import UpComingTask from "./up-coming-task";

function Dashboard() {
  const { currentUser } = useAuthState();
  return (
    <div className="w-full p-10">
      <div className="flex items-center mb-5 justify-between sticky top-[0rem] backdrop-blur-xl z-50 pt-4 pb-4">
        <div className="flex items-end">
          <h1 className="font-bold text-[24px]">
            Hi {currentUser?.userDetail?.fullName || currentUser?.username},
          </h1>
          <h6 className="text-sm text-primary/50 font-bold">
            here's your current tasks
          </h6>
        </div>
      </div>
      <Report />
      <div className="flex mt-5 justify-between h-[30rem] items-center">
        <div className="w-[49%] h-full relative bg-primary/5 rounded-md p-4 backdrop-blur-2xl">
          <BarChart />
        </div>
        <div className="w-[49%] h-full  bg-primary/5 rounded-md p-4 backdrop-blur-2xl overflow-auto">
          <UpComingTask />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
