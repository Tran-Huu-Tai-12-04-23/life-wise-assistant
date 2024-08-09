import { ITask } from "@/dto/task.dto";
import { IUser } from "@/dto/user.dto";
import { daysLeftToExpire } from "@/helper";
import { useAuthState } from "@/redux/features/auth/authSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo } from "react";
import Chip from "../UI/Chip";
import GroupAvatar from "../UI/GroupAvatar";
import { TASK } from "./constant";

interface ITaskListItemProps {
  data: ITask | null;
  isActive?: boolean;
}

const TaskListItem: React.FC<ITaskListItemProps> = ({ data }) => {
  const { enumData } = useAuthState();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data?.id || "",
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
        borderLeftColor: enumData?.taskStatus[data.status]?.color,
      }}
      className={`shadow-2xl border-l-[4px] border-solid  px-2 backdrop-blur-3xl  gap-4 w-full flex items-center between group py-4  ignore-scroll rounded-xl border border-transparent hover:border-primary/10 cursor-pointer ${
        isDragging ? "opacity-50 bg-primary/10" : "bg-primary-content"
      }`}
    >
      <h6 className="font-bold">{data.title}</h6>
      <h6
        className={`text-xs font-bold ${
          dayleft > 0 ? "text-yellow-600" : "text-red-600"
        } absolute top-2 right-2`}
      >
        {dayleft > 0 ? `${dayleft} days left` : "Expired"}
      </h6>
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

      <div className="flex gap-2 justify-end ml-auto items-center mt-2 pr-20">
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

export default TaskListItem;
