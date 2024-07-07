import React from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { COLUMN } from "./constant";
import { CSS } from "@dnd-kit/utilities";
import { IoMdAdd } from "react-icons/io";
import TaskListItem from "./TaskListItem";
import { IColumn } from "@/dto/column.dto";
import { useColumnAction } from "@/redux/features/column/action";
import { useAuthState } from "@/redux/features/auth/authSlice";
interface IRowProps {
  data: IColumn | null;
  isActive?: boolean;
}

const Row: React.FC<IRowProps> = ({ data }) => {
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
    id: data?.id || "",
    data: {
      type: COLUMN,
    },
  });

  if (!data) return null;

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
      }}
      className={` w-full ${
        isDragging ? "bg-primary/10" : ""
      } relative bg-[rgba(0,0,0,0.1)]  p-2 border-dashed card border-[1px] border-primary/10 min-w-[20rem] rounded-xl flex flex-col gap-y-4 `}
    >
      <div className="flex justify-between items-center border-dashed  border-b-[1px] border-primary/10">
        <div
          className=" p-2 justify-start items-center flex ignore-scroll"
          {...listeners}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: enumData?.taskStatus[data.statusCode].color,
            }}
          />
          <h6 className="ml-2 font-bold">{data.name}</h6>
        </div>
        <IoMdAdd
          onClick={() => {
            const addTaskElement = document.getElementById("add_task");
            if (addTaskElement) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (addTaskElement as any)?.showModal();
            }
            changeCurrentColumn(data);
          }}
          size={20}
          className="hover:text-primary/50"
        />
      </div>

      <SortableContext items={data.tasks.map((item) => item.id)}>
        <div className="flex w-full items-start flex-col no-scrollbar gap-y-4 overflow-y-auto pb-4 ">
          {data.tasks.map((task) => (
            <TaskListItem key={task.id} data={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Row;
