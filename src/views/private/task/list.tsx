import { SortableContext } from "@dnd-kit/sortable";
import { ColumnDTO } from "@/dto/column.dto";
import { DragOverlay } from "@dnd-kit/core";
import { TaskDTO } from "@/dto/task.dto";
import TaskListItem from "@/components/drop/TaskListItem";
import Row from "@/components/drop/Row";

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
          <Row data={col} key={col.id} />
        ))}
      </SortableContext>
      <DragOverlay adjustScale={false}>
        {taskActive && <TaskListItem data={taskActive} isActive />}
        {columnActive && <Row data={columnActive} isActive />}
      </DragOverlay>
    </>
  );
}

export default List;
