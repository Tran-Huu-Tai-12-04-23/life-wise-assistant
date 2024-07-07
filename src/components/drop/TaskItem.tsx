import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { TASK } from "./constant";
import { CSS } from "@dnd-kit/utilities";
import GroupAvatar from "../UI/GroupAvatar";
import Chip from "../UI/Chip";
import { IUser } from "@/dto/user.dto";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { ITask } from "@/dto/task.dto";
import { daysLeftToExpire } from "@/helper";

interface ITaskItemProps {
  data: ITask;
  isActive?: boolean;
}

const TaskItem: React.FC<ITaskItemProps> = ({ data }) => {
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
        borderLeftColor:
          enumData?.taskStatus[data.status as keyof typeof enumData.taskStatus]
            ?.color,
      }}
      className={`px-2  border-l-[4px] border-solid backdrop-blur-3xl group py-4  ignore-scroll  shadow-md rounded-xl w-full border border-transparent hover:border-primary/10 cursor-pointer  ${
        isDragging ? "opacity-50 bg-primary/10 " : "bg-primary-content/10"
      }`}
    >
      <h5 className="font-bold">{data.title}</h5>
      <h5
        className={`text-xs font-bold ${
          dayleft > 0 ? "text-yellow-600" : "text-red-600"
        } absolute top-2 right-2`}
      >
        {dayleft > 0 ? `${dayleft} days left` : "Expired"}
      </h5>
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
