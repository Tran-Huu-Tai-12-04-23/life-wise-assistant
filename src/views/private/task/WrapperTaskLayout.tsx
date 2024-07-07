import {
  DndContext,
  DragEndEvent,
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
import { COLUMN, TASK } from "@/components/drop/constant";
import { EViewType } from ".";
import ScrollContainer from "react-indiana-drag-scroll";
import Board from "./board";
import { IColumn } from "@/dto/column.dto";
import { useColumnState } from "@/redux/features/column/columnSlice";
import { ITask } from "@/dto/task.dto";
import { useColumnAction } from "@/redux/features/column/action";
import Loader from "@/components/UI/Loader";
import List from "./list";
function WrapperTaskLayout({ viewType }: { viewType: EViewType }) {
  const { columns, isLoading } = useColumnState();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const {
    onMoveTaskInTheSameColumn,
    onMoveTaskInTheDifferentColumn,
    onSwapBetweenColumn,
  } = useColumnAction();
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
    return columns
      .flatMap((col: IColumn) => col.tasks)
      .find((item: ITask) => item.id === id);
  };
  const findColIncludeTask = (
    id: UniqueIdentifier | null
  ): IColumn | undefined => {
    return columns.find((col: IColumn) =>
      col.tasks.find((item: ITask) => item.id === id)
    );
  };

  const findColById = (id: UniqueIdentifier | null): IColumn | undefined => {
    return columns.find((item: IColumn) => item.id === id);
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
        (container: IColumn) => container.id === active.id
      );
      const overContainerIndex = columns.findIndex(
        (container: IColumn) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...columns];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      onSwapBetweenColumn({
        columns: newItems,
        colCurrentIndex: activeContainerIndex,
        colTargetIndex: overContainerIndex,
      });
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
        (container: IColumn) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container: IColumn) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex(
        (item: ITask) => item.id === active.id
      );
      const overitemIndex = overContainer.tasks.findIndex(
        (item: ITask) => item.id === over.id
      );
      // In the same container

      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...columns];
        onMoveTaskInTheSameColumn({
          activeContainerIndex,
          tasks: arrayMove(
            newItems[activeContainerIndex].tasks,
            activeitemIndex,
            overitemIndex
          ),
          columnId: newItems[activeContainerIndex].id,
          taskCurrentIndex: activeitemIndex,
          taskNewIndex: overitemIndex,
        });
      } else {
        onMoveTaskInTheDifferentColumn({
          activeItemIndex: activeitemIndex,
          overItemIndex: overitemIndex,
          activeContainerIndex,
          overContainerIndex,
          columnIdFrom: columns[activeContainerIndex].id,
          columnIdTo: columns[overContainerIndex].id,
        });
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
        (container: IColumn) => container.id === activeContainer.id
      );
      const overContainerIndex = columns.findIndex(
        (container: IColumn) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.tasks.findIndex(
        (item: ITask) => item.id === active.id
      );

      onMoveTaskInTheDifferentColumn({
        activeItemIndex: activeitemIndex,
        overItemIndex: 0,
        activeContainerIndex,
        overContainerIndex,
        columnIdFrom: columns[activeContainerIndex].id,
        columnIdTo: columns[overContainerIndex].id,
      });
    }
    setActiveId(null);
  }
  const handleDragMove = () => {};

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
        }  flex gap-5 pb-2 p-4 relative`}
      >
        {isLoading && (
          <div className="absolute top-0 w-[90vw] left-0 bottom-0 flex justify-center items-center">
            <Loader />
          </div>
        )}
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
              taskActive={findTaskById(activeId) as ITask}
              columnActive={findColById(activeId) as IColumn}
            />
          )}
          {viewType === EViewType.LIST && (
            <List
              columns={columns}
              taskActive={findTaskById(activeId) as ITask}
              columnActive={findColById(activeId) as IColumn}
            />
          )}
        </DndContext>
      </div>
    </ScrollContainer>
  );
}

export default WrapperTaskLayout;
