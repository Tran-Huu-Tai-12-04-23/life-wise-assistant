/* eslint-disable import/no-cycle */
import { DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { Stack } from '@mui/material';
// eslint-disable-next-line import/no-cycle
import { useColumnState } from 'src/redux/features/column/columnSlice';
import Row from './row';
import TaskListItem from './task-list-item';

const TaskList = ({ taskActive, columnActive }) => {
  const { columns, columnsActive } = useColumnState();
  return (
    <Stack direction="column" spacing={2} sx={{ marginTop: 2, width: '100%' }}>
      <SortableContext items={columns.map((col) => col.id)}>
        {columns.map((col) => {
          if (columnsActive?.includes(col.id)) {
            return <Row key={col.id} data={col} />;
          }
          return null;
        })}
      </SortableContext>
      <DragOverlay adjustScale={false} sx={{ width: '100%' }}>
        {taskActive && <TaskListItem data={taskActive} />}
        {columnActive && <Row data={columnActive} isActive />}
      </DragOverlay>
    </Stack>
  );
};

export default TaskList;
