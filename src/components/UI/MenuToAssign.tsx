import { IUser } from "@/dto/user.dto";
import Avatar from "./Avatar";
import { Key } from "react";

function MenuToAssign({
  children,
  lstMember,
  right,
}: {
  children: React.ReactNode;
  lstMember: IUser[];
  right?: boolean;
}) {
  return (
    <div
      className="dropdown dropdown-top z-[100000000] relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div tabIndex={1000} role="button" className="btn m-1">
        {children}
      </div>
      <ul
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        tabIndex={1000}
        className={`text-primary-content ${
          right ? "left-0" : "right-0"
        } top-0 dropdown-content menu p-2 shadow-xl bg-primary-content backdrop-blur-2xl  z-[1000000] rounded-box w-52`}
      >
        <p className="text-sm font-bold text-primary mb-2">Assign to</p>
        {lstMember.map((user: IUser, index: Key) => (
          <div
            className="p-2 rounded-md flex gap-2 items-center hover:bg-primary/10"
            key={index}
          >
            <Avatar isOnline={false} isStatus={false} url={user?.avatar} />
            <p className="text-sm font-bold text-primary">{user?.username}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MenuToAssign;
