import Button from "@/components/UI/Button";
import { FaUser } from "react-icons/fa";
import { FaTeamspeak } from "react-icons/fa6";
import { RiSettings2Fill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { useResetState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/redux/features/auth/authSlice";
const menus = [
  {
    name: "Profile",
    icon: <FaUser />,
    route: "profile",
  },
  {
    name: "Setting",
    icon: <RiSettings2Fill />,
    route: "setting",
  },
  {
    name: "Teams",
    icon: <FaTeamspeak />,
    route: "teams",
  },
];
function UserMenu() {
  const { resetState } = useResetState();
  const { currentUser } = useAuthState();
  const nav = useNavigate();

  return (
    <div className="flex flex-col w-full z-[10000] bg-transparent backdrop-blur-xl">
      <div className="flex border-b mb-2 flex-col w-full text-inherit hover:text-primary cursor-pointer justify-start items-center gap-2 p-4 ">
        <div className="w-full items-center flex justify-start">
          <h6>Hello:</h6>{" "}
          <h5 className="font-bold text-lg ml-2">{currentUser?.username}</h5>
        </div>
        <div className="w-full ">How can I help you?</div>
      </div>

      {menus.map((menu) => (
        <div
          key={menu.name}
          className="flex hover:bg-primary/5 text-inherit hover:text-primary cursor-pointer justify-start items-center gap-2 p-4 "
        >
          {menu.icon}
          {menu.name}
        </div>
      ))}

      <div className="w-full border-t mb-4 mt-2"></div>

      <Button
        onClick={async () => {
          await resetState();
          nav("/auth/login");
        }}
        name="Logout"
        rightIcon={<HiOutlineLogout />}
        type="primary"
      />
    </div>
  );
}

export default UserMenu;
