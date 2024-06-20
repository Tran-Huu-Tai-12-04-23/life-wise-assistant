import AppIcon from "@/components/Icons/header/appIcon";
import Avatar from "@/components/UI/Avatar";
import Badge from "@/components/UI/Badge";
import { headerHeight } from "@/constant/constant";
import { FaBell } from "react-icons/fa";

function Header() {
  return (
    <div
      style={{ height: headerHeight }}
      className={`w-full pl-4 pr-4 flex justify-between items-center  max-w-8xl border-b-[1px] border-solid border-[rgba(0,0,0,0.06)]`}
    >
      <div className="flex justify-start items-center gap-4">
        <AppIcon />
        <h1 className="text-lg font-semibold">Life Manager</h1>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Badge name="1">
          <FaBell className="text-primary" size={24} />
        </Badge>

        <Avatar isOnline isStatus />
      </div>
    </div>
  );
}

export default Header;
