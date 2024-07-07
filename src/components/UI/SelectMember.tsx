import { IUser } from "@/dto/user.dto";
import ToolTip from "./Tooltip";

function SelectMember({
  lstMember,
  onSelect,
  value,
}: {
  lstMember: IUser[];
  onSelect: (user: IUser) => void;
  value: IUser[];
}) {
  return (
    <div className="avatar-group -space-x-2 rtl:space-x-reverse">
      {lstMember.map((user, index) => {
        const isSelect = value?.find((item) => item.id === user.id);
        if (index === 5)
          return (
            <div key={index} className="avatar placeholder">
              <div className="w-8 bg-neutral text-neutral-content">
                <span>+{lstMember.length - 5}</span>
              </div>
            </div>
          );
        else if (index > 5) return null;
        return (
          <div
            className={`avatar hover:scale-110 bg-contain object-contain cursor-pointer ${
              isSelect ? "border-2 border-primary" : ""
            }`}
            key={index}
            onClick={() => onSelect(user)}
          >
            <ToolTip tip={user.username}>
              <div className="w-10 h-10 ">
                <img src={user.avatar} alt={user.username} />
              </div>
            </ToolTip>
          </div>
        );
      })}
    </div>
  );
}

export default SelectMember;
