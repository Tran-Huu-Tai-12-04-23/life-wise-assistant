/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  loadDetailTaskAsync,
  subTaskPaginationAsync,
  taskCommentPaginationAsync,
  taskFilePaginationAsync,
  taskHistoryPaginationAsync,
} from './action';

const initialState = {
  currentTask: null,
  isLoadingDetail: false,
  taskHistoryPage: 0,
  taskCommentPage: 0,
  subTaskPage: 0,
  taskFilePage: 0,
  isHasNextTaskCommentPage: false,
  isHasNextTaskHistoryPage: false,
  isHasNextSubTaskPage: false,
  isHasNextTaskFilePage: false,
  isLoadingTaskComment: false,
  isLoadingTaskHistory: false,
  isLoadingSubTask: false,
  isLoadingTaskFile: false,
  history: [],
  comment: [],
  subTask: [],
  taskFile: [],
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
        state.taskHistoryPage = 0;
        state.taskCommentPage = 0;
        state.subTaskPage = 0;
        state.taskFilePage = 0;
        state.history = [];
        state.comment = [];
        state.subTask = [];
        state.taskFile = [];
      })
      .addCase(loadDetailTaskAsync.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(loadDetailTaskAsync.rejected, (state) => {
        state.isLoadingDetail = false;
      })
      .addCase(taskCommentPaginationAsync.fulfilled, (state, action) => {
        state.isLoadingTaskComment = false;
        const newTaskCommentMap = new Map();

        if (state.taskCommentPage === 0) {
          action.payload[0].forEach((comment) => newTaskCommentMap.set(comment.id, comment));
        } else {
          state.comment.forEach((comment) => newTaskCommentMap.set(comment.id, comment));
          action.payload[0].forEach((comment) => newTaskCommentMap.set(comment.id, comment));
        }

        state.comment = Array.from(newTaskCommentMap.values());
        state.taskCommentPage += 1;
        state.isHasNextTaskCommentPage = action.payload[2];
      })
      .addCase(taskCommentPaginationAsync.pending, (state) => {
        state.isLoadingTaskComment = true;
      })
      .addCase(taskCommentPaginationAsync.rejected, (state) => {
        state.isLoadingTaskComment = false;
      })
      .addCase(taskHistoryPaginationAsync.fulfilled, (state, action) => {
        state.isLoadingTaskHistory = false;
        const newTaskHistoryMap = new Map();

        if (state.taskHistoryPage === 0) {
          action.payload[0].forEach((task) => newTaskHistoryMap.set(task.id, task));
        } else {
          state.history.forEach((task) => newTaskHistoryMap.set(task.id, task));
          action.payload[0].forEach((task) => newTaskHistoryMap.set(task.id, task));
        }

        state.history = Array.from(newTaskHistoryMap.values());
        state.taskHistoryPage += 1;
        state.isHasNextTaskHistoryPage = action.payload[2];
      })
      .addCase(taskHistoryPaginationAsync.pending, (state) => {
        state.isLoadingTaskHistory = true;
      })
      .addCase(taskHistoryPaginationAsync.rejected, (state) => {
        state.isLoadingTaskHistory = false;
      })
      .addCase(subTaskPaginationAsync.fulfilled, (state, action) => {
        state.isLoadingSubTask = false;
        const newSubTaskMap = new Map();

        if (state.subTaskPage === 0) {
          action.payload[0].forEach((subTask) => newSubTaskMap.set(subTask.id, subTask));
        } else {
          state.subTask.forEach((subTask) => newSubTaskMap.set(subTask.id, subTask));
          action.payload[0].forEach((subTask) => newSubTaskMap.set(subTask.id, subTask));
        }

        state.subTask = Array.from(newSubTaskMap.values());
        state.subTaskPage += 1;
        state.isHasNextSubTaskPage = action.payload[2];
      })
      .addCase(subTaskPaginationAsync.pending, (state) => {
        state.isLoadingSubTask = true;
      })
      .addCase(subTaskPaginationAsync.rejected, (state) => {
        state.isLoadingSubTask = false;
      })
      .addCase(taskFilePaginationAsync.fulfilled, (state, action) => {
        state.isLoadingTaskFile = false;
        const newTaskFileMap = new Map();
        if (state.taskFilePage === 0) {
          action.payload[0].forEach((file) => newTaskFileMap.set(file.id, file));
        } else {
          state.taskFile.forEach((file) => newTaskFileMap.set(file.id, file));
          action.payload[0].forEach((file) => newTaskFileMap.set(file.id, file));
        }

        state.taskFile = Array.from(newTaskFileMap.values());
        state.taskFilePage += 1;
        state.isHasNextTaskFilePage = action.payload[2];
      })
      .addCase(taskFilePaginationAsync.pending, (state) => {
        state.isLoadingTaskFile = true;
      })
      .addCase(taskFilePaginationAsync.rejected, (state) => {
        state.isLoadingTaskFile = false;
      });
  },
});

export default taskSlice.reducer;

export const { changeCurrentTask, resetTaskState } = taskSlice.actions;

export const selectTask = (state) => state.task;

export const useTaskState = () => useSelector(selectTask);
