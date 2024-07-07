import React from "react";
import { enumData } from "@/constant/enum";
import GroupAvatar from "@/components/UI/GroupAvatar";
import Chip from "@/components/UI/Chip";
import { IUser } from "@/dto/user.dto";
import { ITask } from "@/dto/task.dto";

interface ITaskItemProps {
  data: ITask;
}

const TaskItem: React.FC<ITaskItemProps> = ({ data }) => {
  return (
    <div className="w-full relative z-[10000] rounded-md  shadow-md p-2 flex justify-between items-center">
      <div>
        <h5 className="font-bold">{data.title}</h5>
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
          lstAvatar={data.lstMember.map((i: IUser) => {
            return {
              avatar: i?.avatar,
              tooltip: i?.username,
            };
          })}
        />
      )}
    </div>
  );
};

export default TaskItem;
