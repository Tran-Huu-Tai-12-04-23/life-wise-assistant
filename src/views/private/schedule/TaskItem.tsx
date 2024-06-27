import React from "react";
import { TaskDTO } from "@/dto/task.dto";
import { enumData } from "@/constant/enum";
import GroupAvatar from "@/components/UI/GroupAvatar";
import Chip from "@/components/UI/Chip";

export interface ITask {
  name: string;
  id: string;
}
interface ITaskItemProps {
  data: TaskDTO;
}

const TaskItem: React.FC<ITaskItemProps> = ({ data }) => {
  return (
    <div className="w-full relative z-[10000] rounded-md  shadow-md p-2 flex justify-between items-center">
      <div>
        <h5 className="font-bold">{data.name}</h5>
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
    </div>
  );
};

export default TaskItem;
