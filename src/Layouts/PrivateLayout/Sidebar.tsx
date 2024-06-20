import { privateRoutes } from "@/route/private-route";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TeamInfo from "./TeamInfo";

import { MdSpaceDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { sideBarWidth } from "@/constant/constant";

function SideBar() {
  const [sidebars] = useState([
    {
      name: "Dashboard",
      route: privateRoutes.dashboard,
      icon: <MdSpaceDashboard />,
    },
    {
      name: "Task",
      route: privateRoutes.task,
      icon: <FaTasks />,
    },
    {
      name: "Message",
      route: privateRoutes.message,
      icon: <FaMessage />,
    },
    {
      name: "Schedule",
      route: privateRoutes.schedule,
      icon: <FaCalendar />,
    },
    {
      name: "Activity",
      icon: <RiChatHistoryFill />,
      route: privateRoutes.activity,
    },

    {
      name: "Setting",
      route: privateRoutes.setting,
      icon: <IoSettings />,
    },
  ]);

  const location = useLocation();

  return (
    <div
      style={{ width: sideBarWidth }}
      className=" h-full flex flex-col justify-start items-start gap-4 border-r-[1px] border-solid border-primary/10"
    >
      <TeamInfo />

      <div className="w-full flex flex-col mt-10 justify-center items-start border-t-[1px] border-solid border-[rgba(0,0,0,0.1)]">
        {sidebars.map((item: (typeof sidebars)[0], index: number) => (
          <Link
            to={item.route}
            className={`p-4 flex gap-4 items-center border-l-[2px] pl-10 min-w-full pr-10 w-full hover:text-primary  ${
              item.route === location.pathname.substring(1)
                ? " border-solid border-primary text-primary"
                : " border-transparent text-gray-400"
            }`}
            key={index}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
