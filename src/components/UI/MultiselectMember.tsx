import { UserDTO } from "@/dto/user.dto";
import { useEffect, useState } from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import Avatar from "./Avatar";
import { users } from "@/views/private/task/dumy";
import { IoMdClose } from "react-icons/io";

function MultiselectMember({ className }: { className?: string }) {
  const [isFocus, setIsFocus] = useState(false);
  const [selectMembers, setSelectMembers] = useState<UserDTO[]>([]);

  useEffect(() => {
    const handleBlur = () => {
      setIsFocus(false);
    };

    window.addEventListener("click", handleBlur);

    return () => {
      window.removeEventListener("click", handleBlur);
    };
  }, []);
  return (
    <div className={className + " w-full"}>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">Select members</span>
        </div>
        <div
          className="dropdown w-full relative "
          onClick={(e) => {
            e.stopPropagation();
            setIsFocus(true);
          }}
        >
          <div className="flex justify-start gap-2 absolute bottom-1/2 pl-4 pr-4 translate-y-1/2">
            {selectMembers.map((user) => (
              <Avatar
                key={user.id}
                url={user.avatar}
                isOnline
                isStatus={false}
              />
            ))}
          </div>
          <button
            onFocus={() => setIsFocus(true)}
            tabIndex={0}
            role="button"
            className={`input input-bordered w-full `}
          />
          {!isFocus && (
            <MdOutlineExpandMore
              size={24}
              className=" absolute top-1/2 right-2 -translate-y-1/2"
            />
          )}
          {isFocus && (
            <MdOutlineExpandLess
              size={24}
              className="text-primary absolute top-1/2 right-2 -translate-y-1/2"
            />
          )}
          <ul
            onClick={(e) => {
              e.stopPropagation();
              setIsFocus(true);
            }}
            tabIndex={0}
            className={
              "dropdown-content flex flex-col gap-2 bg-transparent menu backdrop-blur-2xl w-full rounded-box z-[1] p-2 shadow-2xl bottom-[100%]"
            }
          >
            {users.map((user) => (
              <MemberItem
                isSelected={selectMembers.some((u) => u.id === user.id)}
                onClick={(user) => {
                  if (selectMembers.some((u) => u.id === user.id)) {
                    setSelectMembers(
                      selectMembers.filter((u) => u.id !== user.id)
                    );
                  } else {
                    setSelectMembers([...selectMembers, user]);
                  }
                }}
                key={user.id}
                userData={user}
                full={true}
              />
            ))}
          </ul>
        </div>
      </label>
    </div>
  );
}

const MemberItem = ({
  full = false,
  userData,
  onClick,
  isSelected,
}: {
  full?: boolean;
  userData: UserDTO;
  onClick: (userData: UserDTO) => void;
  isSelected?: boolean;
}) => {
  return (
    <div
      onClick={() => onClick(userData)}
      className={`${full ? "w-full" : "w-[10rem]"} ${
        isSelected ? "bg-primary/10" : ""
      } relative flex justify-start items-center gap-4 p-2 hover:bg-primary/5 rounded-md cursor-pointer`}
    >
      <Avatar
        className="h-8 w-8"
        isOnline={false}
        isStatus={false}
        url={userData?.avatar}
      />
      <h5 className="text-sm">{userData?.name}</h5>

      {isSelected && (
        <IoMdClose
          size={20}
          className="text-primary absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
};

export default MultiselectMember;
