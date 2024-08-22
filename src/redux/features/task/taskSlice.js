import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { loadDetailTaskAsync } from './action';

const initialState = {
  currentTask: null,
  isLoadingDetail: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    changeCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    resetTaskState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDetailTaskAsync.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.currentTask = action.payload;
      })
      .addCase(loadDetailTaskAsync.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(loadDetailTaskAsync.rejected, (state) => {
        state.isLoadingDetail = false;
      });
  },
});

export default taskSlice.reducer;

export const { changeCurrentTask, resetTaskState } = taskSlice.actions;

export const selectTask = (state) => state.task;

export const useTaskState = () => useSelector(selectTask);
