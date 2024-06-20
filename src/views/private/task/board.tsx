import { SortableContext } from "@dnd-kit/sortable";
import { ColumnDTO } from "@/dto/column.dto";
import { DragOverlay } from "@dnd-kit/core";
import { TaskDTO } from "@/dto/task.dto";
import TaskItem from "@/components/drop/TaskItem";
import Column from "@/components/drop/Column";

interface PropTypes {
  columns: ColumnDTO[];
  taskActive?: TaskDTO;
  columnActive?: ColumnDTO;
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
        {taskActive && <TaskItem data={taskActive} isActive />}
        {columnActive && <Column data={columnActive} isActive />}
      </DragOverlay>
    </>
  );
}

export default List;
