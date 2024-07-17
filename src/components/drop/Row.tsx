import React from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { COLUMN } from "./constant";
import { CSS } from "@dnd-kit/utilities";
import { IoMdAdd } from "react-icons/io";
import { ColumnDTO } from "@/dto/column.dto";
import TaskListItem from "./TaskListItem";
interface IRowProps {
  data: ColumnDTO | null;
  isActive?: boolean;
}

const Row: React.FC<IRowProps> = ({ data }) => {
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
      } relative  p-2 border-dashed card border-[1px] border-primary/10   min-w-[20rem] rounded-xl flex flex-col gap-y-4 `}
    >
      <div className="flex justify-between items-center border-dashed  border-b-[1px] border-primary/10">
        <div className=" p-2 ignore-scroll" {...listeners}>
          {data.name}
        </div>
        <IoMdAdd
          onClick={() => {
            const addTaskElement = document.getElementById("add_task");
            if (addTaskElement) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (addTaskElement as any)?.showModal();
            }
          }}
          size={20}
          className="hover:text-primary/50"
        />
      </div>

      <SortableContext items={data.tasks.map((item) => item.id)}>
        <div className="flex w-full items-start flex-col no-scrollbar gap-y-4 overflow-y-auto ">
          {data.tasks.map((task) => (
            <TaskListItem key={task.id} data={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Row;
