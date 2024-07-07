import { SortableContext } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import TaskListItem from "@/components/drop/TaskListItem";
import Row from "@/components/drop/Row";
import { IColumn } from "@/dto/column.dto";
import { ITask } from "@/dto/task.dto";

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
