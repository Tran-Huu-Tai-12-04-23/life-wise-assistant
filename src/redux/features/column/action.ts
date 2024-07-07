/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addTaskToColumn,
  createNewColumn,
  getAllColumnOfTeam,
  moveTaskInTheSameCol,
  moveTaskToDiffCol,
  swapBetweenCol,
} from "@/services/column";
import {
  DataToCreateColumnDTO,
  ITaskToCreate,
  LoadAllColOfTeamDTO,
  MoveTaskToDiffColumnDTO,
  MoveTaskToTheSameColDTO,
} from "@/services/column/dto";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useTeamState } from "../team/teamSlice";
import {
  IFilter,
  changeCurrentColumn,
  changeFilter,
  clearColumnFilter,
  moveTaskInTheDifferentColumn,
  moveTaskInTheSameColumn,
  swapBetweenColumn,
  useColumnState,
} from "./columnSlice";
import { IColumn } from "@/dto/column.dto";
import { ITask } from "@/dto/task.dto";
import { IUser } from "@/dto/user.dto";

export const ColumnActionKey = {
  ADD_COLUMN: "column/add_column",
  LOAD_ALL_COLUMN_OF_TEAM: "column/all_column",
  ADD_TASK: "column/add_task",
  SWAP_BETWEEN_COLUMN: "column/swap_between_column",
  MOVE_TASK_IN_THE_SAME_COL: "task/move-task-in-the-same-column",
  MOVE_TASK_TO_DIFF_COL: "task/move-task-in-the-same-column",
} as const;

export const createColumnAsync = createAsyncThunk<
  IColumn,
  DataToCreateColumnDTO
>(ColumnActionKey.ADD_COLUMN, createNewColumn);

export const moveTaskToTheSameColAsync = createAsyncThunk<
  IColumn,
  MoveTaskToTheSameColDTO
>(ColumnActionKey.MOVE_TASK_IN_THE_SAME_COL, moveTaskInTheSameCol);

export const moveTaskToDiffColAsync = createAsyncThunk<
  IColumn,
  MoveTaskToDiffColumnDTO
>(ColumnActionKey.MOVE_TASK_TO_DIFF_COL, moveTaskToDiffCol);

export const swapBetweenColAsync = createAsyncThunk(
  ColumnActionKey.SWAP_BETWEEN_COLUMN,
  swapBetweenCol
);

export const loadListColumnOfTeamAsync = createAsyncThunk<
  IColumn[],
  LoadAllColOfTeamDTO
>(ColumnActionKey.LOAD_ALL_COLUMN_OF_TEAM, getAllColumnOfTeam);

export const createTaskAsync = createAsyncThunk<ITask, ITaskToCreate>(
  ColumnActionKey.ADD_TASK,
  addTaskToColumn
);

export const useColumnAction = () => {
  const dispatch = useDispatch<any>();
  const teamState = useTeamState();
  const { currentColumn, filter } = useColumnState();

  const onClearColumnFilter = () => {
    dispatch(clearColumnFilter());
  };
  const onChangeFilter = async (
    key: keyof IFilter,
    value: string | IUser[]
  ) => {
    dispatch(
      changeFilter({
        key,
        value,
      })
    );
  };

  const onMoveTaskInTheSameColumn = async (body: {
    activeContainerIndex: number;
    tasks: ITask[];
    columnId: string;
    taskCurrentIndex: number;
    taskNewIndex: number;
  }) => {
    const { columnId, taskCurrentIndex, taskNewIndex } = body;
    await dispatch(moveTaskInTheSameColumn(body));
    dispatch(
      moveTaskToTheSameColAsync({
        columnId,
        taskCurrentIndex: taskCurrentIndex + 1,
        taskNewIndex: taskNewIndex + 1,
      })
    );
  };
  const onMoveTaskInTheDifferentColumn = async (body: {
    activeItemIndex: number;
    overItemIndex: number;
    activeContainerIndex: number;
    overContainerIndex: number;
    columnIdFrom: string;
    columnIdTo: string;
  }) => {
    const { activeItemIndex, overItemIndex, columnIdFrom, columnIdTo } = body;
    await dispatch(moveTaskInTheDifferentColumn(body));
    dispatch(
      moveTaskToDiffColAsync({
        taskCurrentIndex: activeItemIndex + 1,
        taskNewIndex: overItemIndex + 1,
        columnIdFrom,
        columnIdTo,
      })
    );
  };

  const onSwapBetweenColumn = (body: {
    columns: IColumn[];
    colCurrentIndex: number;
    colTargetIndex: number;
  }) => {
    dispatch(swapBetweenColumn(body.columns));
    dispatch(
      swapBetweenColAsync({
        colCurrentIndex: body.colCurrentIndex + 1,
        colTargetIndex: body.colTargetIndex + 1,
      })
    );
  };

  const onCreateNewColumn = async (body: DataToCreateColumnDTO) => {
    await dispatch(createColumnAsync(body));
  };

  const onGetAllColumnOfTeam = async () => {
    await dispatch(
      loadListColumnOfTeamAsync({
        teamId: teamState.currentTeam?.id,
        status: filter.status,
        lstPersonInCharge: filter.members.map((member: IUser) => member.id),
        searchKey: filter.searchKey,
      })
    );
  };

  const onCreateTask = async (body: ITaskToCreate) => {
    if (currentColumn?.id)
      await dispatch(createTaskAsync({ ...body, columnId: currentColumn.id }));
  };

  return {
    onClearColumnFilter,
    onChangeFilter,
    onCreateNewColumn,
    onGetAllColumnOfTeam,
    onCreateTask,
    onMoveTaskInTheSameColumn,
    onMoveTaskInTheDifferentColumn,
    onSwapBetweenColumn,
    changeCurrentColumn: (column: IColumn) => {
      dispatch(changeCurrentColumn(column));
    },
  };
};
