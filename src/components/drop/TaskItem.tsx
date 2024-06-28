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
interface ITaskItemProps {
  data: TaskDTO;
  isActive?: boolean;
}

const TaskItem: React.FC<ITaskItemProps> = ({ data }) => {
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
      className={`px-2  border-l-[4px] border-solid backdrop-blur-3xl group py-4  ignore-scroll  shadow-md rounded-xl w-full border border-transparent hover:border-primary/10 cursor-pointer  ${
        isDragging ? "opacity-50 bg-primary/10 " : "bg-primary-content/10"
      }`}
    >
      <h5 className="font-bold">{data.name}</h5>
      <h5 className="text-sm truncate">{data.description}</h5>
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

      <div className="flex gap-2 justify-start items-center mt-2">
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

export default TaskItem;
