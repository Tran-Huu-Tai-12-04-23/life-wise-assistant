import { UserDTO } from "@/dto/user.dto";
import Avatar from "./Avatar";
import { Key } from "react";

function MenuToAssign({
  children,
  lstMember,
}: {
  children: React.ReactNode;
  lstMember: UserDTO[];
}) {
  return (
    <div
      className="dropdown group-hover:flex hidden dropdown-hover z-[10000] absolute top-0 right-0"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div tabIndex={0} role="button" className=" m-1 p-2 rounded-md">
        {children}
      </div>
      <ul
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        tabIndex={0}
        className="text-primary-content right-0 top-0 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <p className="text-sm font-bold text-primary mb-2">Assign to</p>
        {lstMember.map((user: UserDTO, index: Key) => (
          <div
            className="p-2 rounded-md flex gap-2 items-center hover:bg-primary/10"
            key={index}
          >
            <Avatar isOnline={false} isStatus={false} url={user?.avatar} />
            <p className="text-sm font-bold text-primary">{user?.name}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MenuToAssign;
