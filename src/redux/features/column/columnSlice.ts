import { IColumn } from "@/dto/column.dto";
import { ITask } from "@/dto/task.dto";
import { IUser } from "@/dto/user.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  createColumnAsync,
  createTaskAsync,
  loadListColumnOfTeamAsync,
} from "./action";
export interface IFilter {
  searchKey: string;
  status: string;
  members: IUser[];
}
const initFilter: IFilter = {
  searchKey: "",
  status: "",
  members: [],
};
interface IColumnState {
  columns: IColumn[];
  isLoading: boolean;
  isLoadingCreateNewColumn: boolean;
  isLoadingCreateNewTask: boolean;
  currentColumn: IColumn | null;
  filter: IFilter;
}

const initialState: IColumnState = {
  columns: [],
  isLoading: false,
  isLoadingCreateNewColumn: false,
  isLoadingCreateNewTask: false,
  currentColumn: null,
  filter: initFilter,
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    changeFilter: (
      state,
      action: PayloadAction<{ key: keyof IFilter; value: string | IUser[] }>
    ) => {
      state.filter = {
        ...state.filter,
        [action.payload.key]: action.payload.value,
      };
      state.isLoading = true;
    },
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns = [action.payload, ...state.columns];
    },
    changeCurrentColumn: (state, action: PayloadAction<IColumn>) => {
      state.currentColumn = action.payload;
    },
    moveTaskInTheSameColumn: (
      state,
      action: PayloadAction<{
        activeContainerIndex: number;
        tasks: ITask[];
      }>
    ) => {
      const { activeContainerIndex, tasks } = action.payload;
      state.columns[activeContainerIndex].tasks = tasks;
    },

    swapBetweenColumn: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
    },
    moveTaskInTheDifferentColumn: (
      state,
      action: PayloadAction<{
        activeItemIndex: number;
        overItemIndex: number;
        activeContainerIndex: number;
        overContainerIndex: number;
      }>
    ) => {
      const {
        activeItemIndex,
        overItemIndex,
        activeContainerIndex,
        overContainerIndex,
      } = action.payload;
      const removedItem = state.columns[activeContainerIndex].tasks.splice(
        activeItemIndex,
        1
      )[0];
      if (state.columns[overContainerIndex].tasks.length > 0) {
        state.columns[overContainerIndex].tasks.splice(overItemIndex, 0, {
          ...removedItem,
          status: state.columns[overContainerIndex].statusCode,
        });
      } else {
        const task: ITask = {
          ...removedItem,
          status: state.columns[overContainerIndex].statusCode,
        };
        state.columns[overContainerIndex].tasks = [task];
      }
    },
    resetColumnState: () => initialState,
    clearColumnFilter: (state) => {
      state.filter = initFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createColumnAsync.fulfilled, (state, action) => {
        state.isLoadingCreateNewColumn = false;
        state.columns = [...state.columns, action.payload];
      })
      .addCase(loadListColumnOfTeamAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentColumn) {
          const colIndex = state.columns.findIndex(
            (column) => column.id === state.currentColumn?.id
          );
          if (colIndex !== -1) {
            const newCol = {
              ...state.columns[colIndex],
              tasks: [
                ...(state.columns[colIndex]?.tasks || []),
                action.payload,
              ],
            };
            state.columns = [
              ...state.columns.slice(0, colIndex),
              newCol,
              ...state.columns.slice(colIndex + 1),
            ];
          }
          state.currentColumn = null;
        }
      })
      .addCase(createTaskAsync.pending, (state) => {
        state.isLoadingCreateNewTask = true;
      })
      .addCase(createColumnAsync.pending, (state) => {
        state.isLoadingCreateNewColumn = false;
      })
      .addMatcher(
        (action) =>
          [
            createColumnAsync.rejected,
            loadListColumnOfTeamAsync.rejected,
          ].includes(action.type),
        (state) => {
          state.isLoadingCreateNewColumn = false;
          state.isLoading = false;
        }
      );
  },
});

export default columnSlice.reducer;

export const {
  addColumn,
  moveTaskInTheSameColumn,
  resetColumnState,
  changeCurrentColumn,
  moveTaskInTheDifferentColumn,
  swapBetweenColumn,
  changeFilter,
  clearColumnFilter,
} = columnSlice.actions;

export const selectColumn = (state: RootState) => state.column;

export const useColumnState = () => useSelector(selectColumn);
