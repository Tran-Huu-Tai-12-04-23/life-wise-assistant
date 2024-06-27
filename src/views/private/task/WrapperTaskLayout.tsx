import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import exampleColumnsData from "./dumy";
import { ITask } from "@/components/drop/TaskItem";
import { COLUMN, TASK } from "@/components/drop/constant";
import { ColumnDTO } from "@/dto/column.dto";
import { TaskDTO } from "@/dto/task.dto";
import { EViewType } from ".";
import ScrollContainer from "react-indiana-drag-scroll";
import Board from "./board";
import List from "./list";
function WrapperTaskLayout({ viewType }: { viewType: EViewType }) {
  const [columns, setColumns] = useState(exampleColumnsData);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const findTaskById = (id: UniqueIdentifier | null): ITask | undefined => {
    return columns.flatMap((col) => col.tasks).find((item) => item.id === id);
  };
  const findColIncludeTask = (
    id: UniqueIdentifier | null
  ): ColumnDTO | undefined => {
    return columns.find((col) => col.tasks.find((item) => item.id === id));
  };

  const findColById = (id: UniqueIdentifier | null): ColumnDTO | undefined => {
    return columns.find((item) => item.id === id);
  };
  function handleDragEnd(event: DragEndEvent) {
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
      const activeContainerIndex = columns.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = columns.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...columns];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setColumns(newItems);
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
      const activeitemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.tasks.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...columns];
        newItems[activeContainerIndex].tasks = arrayMove(
          newItems[activeContainerIndex].tasks,
          activeitemIndex,
          overitemIndex
        );

        setColumns(newItems);
      } else {
        // In different containers
        const newItems = [...columns];
        const [removeditem] = newItems[activeContainerIndex].tasks.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].tasks.splice(
          overitemIndex,
          0,
          removeditem
        );
        setColumns(newItems);
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
      const activeitemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      const newItems = [...columns];
      const [removeditem] = newItems[activeContainerIndex].tasks.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].tasks.push(removeditem);
      setColumns(newItems);
    }
    setActiveId(null);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDragMove = (event: DragMoveEvent) => {};

  return (
    <ScrollContainer
      hideScrollbars={false}
      stopPropagation={true}
      horizontal={true}
      ignoreElements={".ignore-scroll"}
    >
      <div
        className={`${
          viewType === EViewType.LIST ? "flex-col w-full" : "w-fit"
        }  flex gap-10 pb-2 p-4 `}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          {viewType === EViewType.BOARD && (
            <Board
              columns={columns}
              taskActive={findTaskById(activeId) as TaskDTO}
              columnActive={findColById(activeId) as ColumnDTO}
            />
          )}
          {viewType === EViewType.LIST && (
            <List
              columns={columns}
              taskActive={findTaskById(activeId) as TaskDTO}
              columnActive={findColById(activeId) as ColumnDTO}
            />
          )}
        </DndContext>
      </div>
    </ScrollContainer>
  );
}

export default WrapperTaskLayout;
