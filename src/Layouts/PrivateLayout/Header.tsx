import AppIcon from "@/components/Icons/header/appIcon";
import Avatar from "@/components/UI/Avatar";
import Badge from "@/components/UI/Badge";
import { headerHeight } from "@/constant/constant";
import { FaBell } from "react-icons/fa";
import UserMenu from "./UserMenu";

function Header() {
  return (
    <div
      style={{ height: headerHeight }}
      className={`w-full pl-4 pr-4 border-b flex justify-between items-center  max-w-8xl  border-solid`}
    >
      <div className="flex justify-start items-center gap-4">
        <AppIcon />
        <h1 className="text-lg font-semibold">Life Manager</h1>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Badge name="1">
          <FaBell className="text-primary" size={24} />
        </Badge>

        <div className="dropdown">
          <div tabIndex={0} role="button" className=" m-1">
            <Avatar isOnline isStatus />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[100000000] right-0 backdrop-blur-3xl rounded-md w-[15rem] shadow-2xl"
          >
            <UserMenu />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
