import Button from "@/components/UI/Button";
import { FaUser } from "react-icons/fa";
import { FaTeamspeak } from "react-icons/fa6";
import { RiSettings2Fill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
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
  const { logout } = useAuth();
  return (
    <div className="flex flex-col w-full">
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
        onClick={() => logout()}
        name="Logout"
        rightIcon={<HiOutlineLogout />}
        type="primary"
      />
    </div>
  );
}

export default UserMenu;
