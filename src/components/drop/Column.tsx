/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { COLUMN } from "./constant";
import { CSS } from "@dnd-kit/utilities";
import { IoMdAdd } from "react-icons/io";
import { IColumn } from "@/dto/column.dto";
import { useColumnAction } from "@/redux/features/column/action";
import { useAuthState } from "@/redux/features/auth/authSlice";
interface IColumnProps {
  data: IColumn;
  isActive?: boolean;
}

const Column: React.FC<IColumnProps> = ({ data }) => {
  const { changeCurrentColumn } = useColumnAction();
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
      type: COLUMN,
    },
  });

  if (!data) return null;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
      }}
      className={` w-full ${
        isDragging ? "bg-primary/15" : "bg-[rgba(0,0,0,0.1)]"
      }  p-2 h-full border-solid card border-primary/10 min-w-[22rem] rounded-xl flex flex-col gap-y-4 `}
    >
      <div className="flex flex-col w-full items-start border-b">
        <div className="flex justify-between w-full">
          <div
            className="flex w-full items-center justify-start gap-2 p-2 ignore-scroll"
            {...listeners}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: enumData?.taskStatus[data.statusCode].color,
              }}
            />
            <h6>{enumData?.taskStatus[data.statusCode].name}</h6>
          </div>
          <IoMdAdd
            onClick={() => {
              const addTaskElement = document.getElementById("add_task");
              if (addTaskElement) {
                (addTaskElement as any)?.showModal();
              }
              changeCurrentColumn(data);
            }}
            size={20}
            className="hover:text-primary/50"
          />
        </div>
      </div>

      <SortableContext items={data.tasks.map((item) => item.id)}>
        <div className="flex pl-2 w-full pr-2 h-[70vh] no-scrollbar overflow-auto items-start flex-col gap-y-4 ">
          {data.tasks.map((task) => (
            <TaskItem key={task.id} data={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
