import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import TaskItem from "@/components/drop/TaskItem";
import Column from "@/components/drop/Column";
import { ITask } from "@/dto/task.dto";
import { IColumn } from "@/dto/column.dto";

interface PropTypes {
  columns: IColumn[];
  taskActive?: ITask;
  columnActive?: IColumn;
}
function List(props: PropTypes) {
  const { columns, taskActive, columnActive } = props;
  return (
    <>
      <SortableContext items={columns.map((col) => col.id)}>
        {columns.map((col) => (
          <Column data={col} key={col.id} />
        ))}
      </SortableContext>
      <DragOverlay adjustScale={false}>
        {taskActive && <TaskItem data={taskActive} isRotate isActive />}
        {columnActive && <Column data={columnActive} isActive />}
      </DragOverlay>
    </>
  );
}

export default List;
