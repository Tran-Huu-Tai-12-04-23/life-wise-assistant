import React, { useRef } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { TASK } from "./constant";

type TaskItemProps = {
  data: { id: string };
  components: Record<string, { content: string }>;
  path: string[];
};

const style: React.CSSProperties = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};

const TaskItem: React.FC<TaskItemProps> = ({ data, components, path }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: TASK,
    item: { id: data.id, path },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  const opacity = 1;
  const component = components[data.id];

  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className="component draggable"
    >
      <div>{data.id}</div>
      <div>{component.content}</div>
    </div>
  );
};

export default TaskItem;
