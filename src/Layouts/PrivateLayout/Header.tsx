import AppIcon from "@/components/Icons/header/appIcon";
import Avatar from "@/components/UI/Avatar";
import { headerHeight } from "@/constant/constant";
import UserMenu from "./UserMenu";
import { GrFormAdd } from "react-icons/gr";
import Notification from "./Notification";

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
        <button
          onClick={() => {
            const modal = document.getElementById(
              "modal_create_teams"
            ) as HTMLDialogElement;

            if (modal) {
              modal.showModal();
            }
          }}
          className="btn  btn-outline btn-primary"
        >
          <h5>Add new teams</h5>
          <GrFormAdd size={22} />
        </button>
        <Notification />

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
