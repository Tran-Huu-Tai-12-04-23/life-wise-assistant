import Avatar from "@/components/UI/Avatar";
import { IUser } from "@/dto/user.dto";
import { Key } from "react";
import { MdSwapHoriz } from "react-icons/md";

function AssignUtil({ lstMember }: { lstMember: IUser[] }) {
  return (
    <div
      className="dropdown group-hover:flex dropdown-hover"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <div tabIndex={0} role="button" className=" m-1 p-2 rounded-md">
        <MdSwapHoriz size={24} />
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

export default AssignUtil;
