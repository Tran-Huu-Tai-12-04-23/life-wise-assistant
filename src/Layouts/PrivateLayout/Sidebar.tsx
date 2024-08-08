import { useMemo } from "react";
import { FaCalendar, FaTasks } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

import { sideBarWidth } from "@/constant/constant";
import { useTeamState } from "@/redux/features/team/teamSlice";
import { privateRoutes } from "@/routes/private-route";

function SideBar() {
  const { currentTeam } = useTeamState();
  const location = useLocation();

  // Memoize the sidebar items
  const sidebars = useMemo(
    () => [
      {
        name: "Dashboard",
        route: privateRoutes.dashboard,
        icon: <MdSpaceDashboard size={32} />,
      },
      {
        name: "Task",
        route: privateRoutes.task,
        icon: <FaTasks size={32} />,
      },
      {
        name: "Schedule",
        route: privateRoutes.schedule,
        icon: <FaCalendar size={32} />,
      },
      {
        name: "Activity",
        route: privateRoutes.activity,
        icon: <RiChatHistoryFill size={32} />,
      },
      {
        name: "Setting",
        route: privateRoutes.setting,
        icon: <IoSettings size={32} />,
      },
    ],
    [currentTeam]
  );

  return (
    <div
      style={{ width: sideBarWidth }}
      className="h-full flex flex-col border-r border-primary/10"
    >
      <div className="w-full flex flex-col ">
        {sidebars.map((item) => (
          <Link
            to={item.route}
            className={`p-8 pb-10 pt-10 flex items-center gap-4 border-l-2  min-w-full  w-full hover:text-primary ${
              item.route === location.pathname
                ? "border-primary "
                : "border-transparent "
            }`}
            key={item.route}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
