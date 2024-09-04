/* eslint-disable import/no-cycle */

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import LoadingView from 'src/components/loadingView';
import { useColumnAction } from 'src/redux/features/column/action';
import { useColumnState } from 'src/redux/features/column/columnSlice';
import { useTeamState } from 'src/redux/features/team/teamSlice';
import TaskBoard from './components/board';
import TaskList from './components/list';

export const COLUMN = 'column';
export const TASK = 'task';

export const EViewType = {
  BOARD: 'BOARD',
  LIST: 'LIST',
};

function WrapperTaskLayout({ viewType = EViewType.LIST }) {
  const { currentTeam } = useTeamState();
  const { onGetAllColumnOfTeam } = useColumnAction();
  const { columns, isLoading } = useColumnState();
  const [activeId, setActiveId] = useState(null);
  const { onMoveTaskInTheSameColumn, onMoveTaskInTheDifferentColumn, onSwapBetweenColumn } =
    useColumnAction();
  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const findTaskById = (id) => {
    const task = columns?.flatMap((col) => col.tasks)?.find((item) => item.id === id);
    return task;
  };
  const findColIncludeTask = (id) =>
    columns?.find((col) => col?.tasks?.find((item) => item.id === id));

  const findColById = (id) => columns?.find((item) => item.id === id);
  function handleDragEnd(event) {
    const { active, over } = event;
    // Handling Container Sorting
    if (
      active?.data?.current?.type === COLUMN &&
      over?.data?.current?.type === COLUMN &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = columns?.findIndex((container) => container.id === active.id);
      const overContainerIndex = columns.findIndex((container) => container.id === over.id);
      // Swap the active and over container
      let newItems = [...columns];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      onSwapBetweenColumn({
        columns: newItems,
        colCurrentIndex: activeContainerIndex,
        colTargetIndex: overContainerIndex,
      }, true);
    } else if (
      active?.data?.current?.type === TASK &&
      over?.data?.current?.type === TASK &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findColIncludeTask(active.id);
      const overContainer = findColIncludeTask(over.id);
      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex((item) => item.id === active.id);
      const overitemIndex = overContainer.tasks.findIndex((item) => item.id === over.id);
      // In the same container

      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...columns];
        onMoveTaskInTheSameColumn({
          activeContainerIndex,
          tasks: arrayMove(newItems[activeContainerIndex].tasks, activeitemIndex, overitemIndex),
          columnId: newItems[activeContainerIndex].id,
          taskCurrentIndex: activeitemIndex,
          taskNewIndex: overitemIndex,
        },true);
      } else {
        onMoveTaskInTheDifferentColumn({
          activeItemIndex: activeitemIndex,
          overItemIndex: overitemIndex,
          taskId: active.id,
          activeContainerIndex,
          overContainerIndex,
          columnIdFrom: columns[activeContainerIndex].id,
          columnIdTo: columns[overContainerIndex].id,
        },true);
      }
    }
    // Handling Item Drop Into a Container
    else if (
      active?.data?.current?.type === TASK &&
      over?.data?.current?.type === COLUMN &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findColIncludeTask(active.id);
      const overContainer = findColById(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex((item) => item.id === active.id);

      onMoveTaskInTheDifferentColumn({
        taskId: active.id,
        activeItemIndex: activeitemIndex,
        overItemIndex: 0,
        activeContainerIndex,
        overContainerIndex,
        columnIdFrom: columns[activeContainerIndex].id,
        columnIdTo: columns[overContainerIndex].id,
      },true);
    }
    setActiveId(null);
  }
  const handleDragMove = (event) => {
     const { active, over } = event;
    // Handling Container Sorting
    if (
      active?.data?.current?.type === COLUMN &&
      over?.data?.current?.type === COLUMN &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = columns?.findIndex((container) => container.id === active.id);
      const overContainerIndex = columns.findIndex((container) => container.id === over.id);
      // Swap the active and over container
      let newItems = [...columns];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      onSwapBetweenColumn({
        columns: newItems,
        colCurrentIndex: activeContainerIndex,
        colTargetIndex: overContainerIndex,
      }, false);
    } else if (
      active?.data?.current?.type === TASK &&
      over?.data?.current?.type === TASK &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findColIncludeTask(active.id);
      const overContainer = findColIncludeTask(over.id);
      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex((item) => item.id === active.id);
      const overitemIndex = overContainer.tasks.findIndex((item) => item.id === over.id);
      // In the same container

      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...columns];
        onMoveTaskInTheSameColumn({
          activeContainerIndex,
          tasks: arrayMove(newItems[activeContainerIndex].tasks, activeitemIndex, overitemIndex),
          columnId: newItems[activeContainerIndex].id,
          taskCurrentIndex: activeitemIndex,
          taskNewIndex: overitemIndex,
        }, false);
      } else {
        onMoveTaskInTheDifferentColumn({
          activeItemIndex: activeitemIndex,
          overItemIndex: overitemIndex,
          taskId: active.id,
          activeContainerIndex,
          overContainerIndex,
          columnIdFrom: columns[activeContainerIndex].id,
          columnIdTo: columns[overContainerIndex].id,
        },  false);
      }
    }
    // Handling Item Drop Into a Container
    else if (
      active?.data?.current?.type === TASK &&
      over?.data?.current?.type === COLUMN &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findColIncludeTask(active.id);
      const overContainer = findColById(over.id);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex((item) => item.id === active.id);

      onMoveTaskInTheDifferentColumn({
        taskId: active.id,
        activeItemIndex: activeitemIndex,
        overItemIndex: 0,
        activeContainerIndex,
        overContainerIndex,
        columnIdFrom: columns[activeContainerIndex].id,
        columnIdTo: columns[overContainerIndex].id,
      }, false);
    }
  };

  useEffect(() => {
    if (currentTeam) onGetAllColumnOfTeam();
  }, [currentTeam]);

  return (
    <Box
      className="ignore-scroll hide-scroll"
      sx={{
        position: 'relative',
        // minHeight: '80vh',
        height: '100%',
        px: 2,
        '&::-webkit-scrollbar': {
          width: 0,
        },
      }}
    >
      <ScrollContainer
        hideScrollbars={false}
        className="hide-scroll"
        stopPropagation
        horizontal
        ignoreElements=".ignore-scroll"
      >
        <Box sx={{ height: 2 }}>{isLoading && <LoadingView />}</Box>
        <Box
          sx={{
            height: '100%',
          }}
        >
          {!isLoading && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            >
              {/* <TaskBoard taskActive={findTaskById(activeId)} columnActive={findColById(activeId)} /> */}
              {viewType === EViewType.BOARD && (
                <TaskBoard
                  taskActive={findTaskById(activeId)}
                  columnActive={findColById(activeId)}
                />
              )}
              {viewType === EViewType.LIST && (
                <TaskList
                  taskActive={findTaskById(activeId)}
                  columnActive={findColById(activeId)}
                />
              )}
            </DndContext>
          )}
        </Box>
      </ScrollContainer>
    </Box>
  );
}
WrapperTaskLayout.propTypes = {
  viewType: PropTypes.string,
};
export default WrapperTaskLayout;
