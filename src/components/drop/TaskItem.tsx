import { ITask } from "@/dto/task.dto";
import { IUser } from "@/dto/user.dto";
import { daysLeftToExpire } from "@/helper";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import React, { useMemo } from "react";
import { FaCalendarDay } from "react-icons/fa";
import Chip from "../UI/Chip";
import GroupAvatar from "../UI/GroupAvatar";
import { TASK } from "./constant";

interface ITaskItemProps {
  data: ITask;
  isActive?: boolean;
  isRotate?: boolean;
}

const TaskItem: React.FC<ITaskItemProps> = ({ data, isRotate }) => {
  const { enumData } = useAuthState();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data?.id,
    data: {
      type: TASK,
    },
  });

  if (!data) return;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dayleft = useMemo(() => {
    return daysLeftToExpire(new Date(data.dateExpire));
  }, [data.dateExpire]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={`px-2 ${
        isRotate ? "rotate-6" : ""
      } border-l-[4px] gap-2 flex-col flex transition-all border-solid backdrop-blur-3xl group py-4  ignore-scroll  shadow-xl rounded-xl w-full border border-transparent hover:border-primary/10 cursor-pointer  ${
        isDragging ? "opacity-50 bg-primary/50 " : "bg-accent"
      }`}
    >
      <h6 className="font-bold text-lg mt-[5px] text-over w-full">
        {data.title}
      </h6>
      <h6
        className={`text-xs font-bold ${
          dayleft > 0 ? "text-yellow-600" : "text-red-600"
        } absolute top-2 right-2`}
      >
        {dayleft > 0 ? `${dayleft} days left` : "Expired"}
      </h6>
      <div className=" flex items-center justify-start gap-2">
        <FaCalendarDay size={12} style={{ color: "gray" }} />
        <h5 className="text-xs text-gray-400">
          {moment(data.dateExpire).format("DD/MM/YYYY")}
        </h5>
      </div>
      {data?.lstMember?.length > 0 && (
        <GroupAvatar
          lstAvatar={data?.lstMember?.map((i: IUser) => {
            return {
              avatar: i?.avatar,
              tooltip: i?.username,
            };
          })}
        />
      )}
      <div className="flex gap-2 justify-start items-center mt-2">
        <Chip
          name={enumData?.taskStatus[data.status]?.name}
          color={enumData?.taskStatus[data.status]?.color}
          background={enumData?.taskStatus[data.status]?.background}
        />
        <Chip
          name={enumData?.taskPriority[data.priority]?.name}
          color={enumData?.taskPriority[data.priority]?.color}
          background={enumData?.taskPriority[data.priority]?.background}
        />
      </div>
    </div>
  );
};

export default TaskItem;
