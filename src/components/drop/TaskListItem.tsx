import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { TASK } from "./constant";
import { CSS } from "@dnd-kit/utilities";
import { TaskDTO } from "@/dto/task.dto";
import GroupAvatar from "../UI/GroupAvatar";
import Chip from "../UI/Chip";
import { enumData } from "@/constant/enum";
export interface ITask {
  name: string;
  id: string;
}
interface ITaskListItemProps {
  data: TaskDTO | null;
  isActive?: boolean;
}

const TaskListItem: React.FC<ITaskListItemProps> = ({ data }) => {
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
  const getColorStatus = useMemo(() => {
    return enumData.taskStatus[data?.status as keyof typeof enumData.taskStatus]
      .color;
  }, [data?.status]);

  if (!data) return;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        borderLeftColor: getColorStatus,
      }}
      className={`shadow-2xl border-l-[4px] border-solid  px-2 backdrop-blur-3xl  gap-4 w-full flex items-center between group py-4  ignore-scroll rounded-xl border border-transparent hover:border-primary/10 cursor-pointer ${
        isDragging ? "opacity-50 bg-primary/10" : "bg-primary-content/10"
      }`}
    >
      <div>
        <h5 className="font-bold">{data.name}</h5>
        <h5 className="text-sm truncate">{data.description}</h5>
      </div>
      {data.lstMember.length > 0 && (
        <GroupAvatar
          lstAvatar={data.lstMember.map((i) => {
            return {
              avatar: i?.avatar,
              tooltip: i?.name,
            };
          })}
        />
      )}

      <div className="flex gap-2 justify-end ml-auto items-center mt-2 pr-20">
        <Chip
          name={
            enumData.taskStatus[data.status as keyof typeof enumData.taskStatus]
              .name
          }
          color={
            enumData.taskStatus[data.status as keyof typeof enumData.taskStatus]
              .color
          }
          background={
            enumData.taskStatus[data.status as keyof typeof enumData.taskStatus]
              .background
          }
        />
        <Chip
          name={
            enumData.priority[data.priority as keyof typeof enumData.priority]
              .name
          }
          color={
            enumData.priority[data.priority as keyof typeof enumData.priority]
              .color
          }
          background={
            enumData.priority[data.priority as keyof typeof enumData.priority]
              .background
          }
        />
      </div>
    </div>
  );
};

export default TaskListItem;
