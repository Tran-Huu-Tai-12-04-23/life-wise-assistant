import AppIcon from "@/components/Icons/header/appIcon";
import Avatar from "@/components/UI/Avatar";
import { headerHeight } from "@/constant/constant";
import UserMenu from "./UserMenu";
import { GrFormAdd } from "react-icons/gr";
import Notification from "./Notification";
import Button from "@/components/UI/Button";

function Header() {
  return (
    <div
      style={{ height: headerHeight }}
      className={`w-full sticky z-[100000] top-0 p-4 backdrop-blur-3xl pl-4 pr-4 border-b flex justify-between items-center  max-w-8xl  border-solid`}
    >
      <div className="flex justify-start items-center gap-4">
        <AppIcon />
        <h1 className="text-lg font-semibold">Life Manager</h1>
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button
          type="outlined"
          name="Add new teams"
          rightIcon={<GrFormAdd size={22} />}
          onClick={() => {
            const modal = document.getElementById(
              "modal_create_teams"
            ) as HTMLDialogElement;

            if (modal) {
              modal.showModal();
            }
          }}
        />
        <Notification />

        <div className="dropdown">
          <div tabIndex={111} role="button" className=" m-1">
            <Avatar isOnline isStatus />
          </div>
          <ul
            tabIndex={111}
            className="dropdown-content menu bg-base-300 z-[1000000] right-0 backdrop-blur-xl rounded-md w-[15rem] shadow-md"
          >
            <UserMenu />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
