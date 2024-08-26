/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  addSubTaskAsync,
  addTaskCommentAsync,
  addTaskFileAsync,
  deleteTaskCommentAsync,
  deleteTaskFileAsync,
  editTaskCommentAsync,
  loadDetailTaskAsync,
  removeSubTaskAsync,
  subTaskPaginationAsync,
  taskCommentPaginationAsync,
  taskFilePaginationAsync,
  taskHistoryPaginationAsync,
  toggleSubTaskAsync,
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

      .addCase(addSubTaskAsync.fulfilled, (state, action) => {
        const { newSubTask, newHistory } = action.payload.data;
        state.subTask = [newSubTask, ...state.subTask];
        state.history = [newHistory, ...state.history];
        state.isLoadingSubTask = false;
      })
      .addCase(toggleSubTaskAsync.fulfilled, (state, action) => {
        const { newSubTask, newHistory } = action.payload.data;
        const subTaskExits = state.subTask.find((subTask) => subTask.id === newSubTask.id);
        if (subTaskExits) {
          state.subTask = state.subTask.map((subTask) =>
            subTask.id === newSubTask.id ? newSubTask : subTask
          );
          state.history = [newHistory, ...state.history];
        }
        state.isLoadingSubTask = false;
      })
      .addCase(removeSubTaskAsync.fulfilled, (state, action) => {
        const { newHistory, previousSubTask } = action.payload.data;
        const subTaskExits = state.subTask.find((subTask) => subTask.id === previousSubTask.id);
        if (subTaskExits) {
          state.subTask = state.subTask.filter((subTask) => subTask.id !== previousSubTask.id);
          state.history = [newHistory, ...state.history];
        }
        state.isLoadingSubTask = false;
      })
      .addCase(addTaskFileAsync.fulfilled, (state, action) => {
        const { newTaskFile, newHistory } = action.payload.data;
        state.taskFile = [newTaskFile, ...state.taskFile];
        state.history = [newHistory, ...state.history];
        state.isLoadingTaskFile = false;
      })
      .addCase(deleteTaskFileAsync.fulfilled, (state, action) => {
        const { newHistory, previousTaskFile } = action.payload.data;
        const taskFileExits = state.taskFile.find(
          (taskFile) => taskFile.id === previousTaskFile.id
        );
        if (taskFileExits) {
          state.taskFile = state.taskFile.filter((taskFile) => taskFile.id !== previousTaskFile.id);
          state.history = [newHistory, ...state.history];
        }
        state.isLoadingTaskFile = false;
      })
      .addCase(addTaskCommentAsync.fulfilled, (state, action) => {
        const { newTaskComment, newHistory } = action.payload.data;
        state.comment = [newTaskComment, ...state.comment];
        state.history = [newHistory, ...state.history];
        state.isLoadingTaskComment = false;
      })
      .addCase(editTaskCommentAsync.fulfilled, (state, action) => {
        const { newTaskComment, newHistory } = action.payload.data;
        const taskCommentExits = state.comment.find(
          (taskComment) => taskComment.id === newTaskComment.id
        );
        if (taskCommentExits) {
          state.comment = state.comment.map((taskComment) =>
            taskComment.id === newTaskComment.id ? newTaskComment : taskComment
          );
          state.history = [newHistory, ...state.history];
        }
        state.isLoadingTaskComment = false;
      })
      .addCase(deleteTaskCommentAsync.fulfilled, (state, action) => {
        const { newHistory, previousTaskComment } = action.payload.data;
        const taskCommentExits = state.comment.find(
          (taskComment) => taskComment.id === previousTaskComment.id
        );
        if (taskCommentExits) {
          state.comment = state.comment.filter(
            (taskComment) => taskComment.id !== previousTaskComment.id
          );
          state.history = [newHistory, ...state.history];
        }
        state.isLoadingTaskComment = false;
      })
      .addCase(addSubTaskAsync.pending, (state, action) => {
        state.isLoadingSubTask = true;
      })
      .addCase(addSubTaskAsync.rejected, (state, action) => {
        state.isLoadingSubTask = false;
      })
      .addCase(toggleSubTaskAsync.pending, (state, action) => {
        state.isLoadingSubTask = true;
      })
      .addCase(toggleSubTaskAsync.rejected, (state, action) => {
        state.isLoadingSubTask = false;
      })
      .addCase(removeSubTaskAsync.pending, (state, action) => {
        state.isLoadingSubTask = true;
      })
      .addCase(removeSubTaskAsync.rejected, (state, action) => {
        state.isLoadingSubTask = false;
      })
      .addCase(addTaskFileAsync.pending, (state, action) => {
        state.isLoadingTaskFile = true;
      })
      .addCase(addTaskFileAsync.rejected, (state, action) => {
        state.isLoadingTaskFile = false;
      })
      .addCase(deleteTaskFileAsync.pending, (state, action) => {
        state.isLoadingTaskFile = true;
      })
      .addCase(deleteTaskFileAsync.rejected, (state, action) => {
        state.isLoadingTaskFile = false;
      })
      .addCase(addTaskCommentAsync.pending, (state, action) => {
        state.isLoadingTaskComment = true;
      })
      .addCase(addTaskCommentAsync.rejected, (state, action) => {
        state.isLoadingTaskComment = false;
      })
      .addCase(editTaskCommentAsync.pending, (state, action) => {
        state.isLoadingTaskComment = true;
      })
      .addCase(editTaskCommentAsync.rejected, (state, action) => {
        state.isLoadingTaskComment = false;
      })
      .addCase(deleteTaskCommentAsync.pending, (state, action) => {
        state.isLoadingTaskComment = true;
      })
      .addCase(deleteTaskCommentAsync.rejected, (state, action) => {
        state.isLoadingTaskComment = false;
      });
  },
});

export default taskSlice.reducer;

export const { changeCurrentTask, resetTaskState } = taskSlice.actions;

export const selectTask = (state) => state.task;

export const useTaskState = () => useSelector(selectTask);
