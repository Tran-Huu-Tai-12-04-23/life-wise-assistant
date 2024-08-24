/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  addSubTask,
  addTaskComment,
  addTaskFile,
  deleteSubTask,
  deleteTaskComment,
  deleteTaskFile,
  editTaskComment,
  loadTaskDetail,
  subTaskPagination,
  taskCommentPagination,
  taskFilePagination,
  taskHistoryPagination,
  toggleSubTask,
  updateTask,
} from 'src/services/task';
import { useColumnAction } from '../column/action';
import { useTeamState } from '../team/teamSlice';
import { useTaskState } from './taskSlice';
// eslint-disable-next-line import/no-cycle

export const TaskActionKey = {
  LOAD_DETAIL: 'task/load_detail',
  UPDATE_TASK: 'task/update_task',
  TASK_HISTORY_PAGINATION: 'task/task_history_pagination',
  SUBTASK_PAGINATION: 'task/subtask_pagination',
  TASK_COMMENT_PAGINATION: 'task/task_comment_pagination',
  TASK_FILE_PAGINATION: 'task/task_file_pagination',

  ADD_SUBTASK: 'task/add_subtask',
  TOGGLE_SUB_TASK: 'task/toggle_subtask',
  REMOVE_SUBTASK: 'task/remove_subtask',
  ADD_TASK_COMMENT: 'task/add_task_comment',
  REMOVE_TASK_COMMENT: 'task/remove_task_comment',
  EDIT_TASK_COMMENT: 'task/edit_task_comment',
  ADD_TASK_FILE: 'task/add_task_file',
  REMOVE_TASK_FILE: 'task/remove_task_file',
};

export const loadDetailTaskAsync = createAsyncThunk(TaskActionKey.ADD_COLUMN, loadTaskDetail);
export const updateTaskAsync = createAsyncThunk(TaskActionKey.UPDATE_TASK, updateTask);
export const subTaskPaginationAsync = createAsyncThunk(
  TaskActionKey.SUBTASK_PAGINATION,
  subTaskPagination
);
export const taskFilePaginationAsync = createAsyncThunk(
  TaskActionKey.TASK_FILE_PAGINATION,
  taskFilePagination
);
export const taskHistoryPaginationAsync = createAsyncThunk(
  TaskActionKey.TASK_HISTORY_PAGINATION,
  taskHistoryPagination
);
export const taskCommentPaginationAsync = createAsyncThunk(
  TaskActionKey.TASK_COMMENT_PAGINATION,
  taskCommentPagination
);

/// /
export const addSubTaskAsync = createAsyncThunk(TaskActionKey.ADD_SUBTASK, addSubTask);
export const toggleSubTaskAsync = createAsyncThunk(TaskActionKey.TOGGLE_SUB_TASK, toggleSubTask);
export const removeSubTaskAsync = createAsyncThunk(TaskActionKey.REMOVE_SUBTASK, deleteSubTask);
export const addTaskCommentAsync = createAsyncThunk(TaskActionKey.ADD_TASK_COMMENT, addTaskComment);
export const editTaskCommentAsync = createAsyncThunk(
  TaskActionKey.EDIT_TASK_COMMENT,
  editTaskComment
);
export const deleteTaskCommentAsync = createAsyncThunk(
  TaskActionKey.REMOVE_TASK_COMMENT,
  deleteTaskComment
);
export const addTaskFileAsync = createAsyncThunk(TaskActionKey.ADD_TASK_FILE, addTaskFile);
export const deleteTaskFileAsync = createAsyncThunk(TaskActionKey.REMOVE_TASK_FILE, deleteTaskFile);

export const useTaskAction = () => {
  const dispatch = useDispatch();
  const { currentTask, taskHistoryPage, taskCommentPage, subTaskPage, taskFilePage } =
    useTaskState();
  const { currentTeam } = useTeamState();
  const { onGetAllColumnOfTeam } = useColumnAction();

  const onLoadTaskDetail = async (id) => {
    await dispatch(
      loadDetailTaskAsync({
        teamId: currentTeam.id,
        id,
      })
    );
  };

  const onUpdateTask = async (body) => {
    await toast.promise(dispatch(updateTaskAsync({ ...body })), {
      loading: 'Update task ...',
      success: 'Update task successfully',
      error: 'Update task failed',
    });
    await onGetAllColumnOfTeam();
  };

  const onUpdateTaskStatus = async (body) => {
    await toast.promise(dispatch(updateTaskAsync({ ...body })), {
      loading: 'Update task status ...',
      success: 'Update task status successfully',
      error: 'Update task status failed',
    });
    await Promise.all([onLoadTaskDetail(currentTask.id), onGetAllColumnOfTeam()]);
  };

  const onTaskCommentPagination = async () => {
    if (!currentTask) return;
    const take = 10;
    const skip = taskCommentPage * take;
    await dispatch(
      taskCommentPaginationAsync({
        where: {
          taskId: currentTask.id,
        },
        skip,
        take,
      })
    );
  };

  const onTaskHistoryPagination = async () => {
    if (!currentTask) return;
    const take = 10;
    const skip = taskHistoryPage * take;
    await dispatch(
      taskHistoryPaginationAsync({
        where: {
          taskId: currentTask.id,
        },
        skip,
        take,
      })
    );
  };

  const onTaskFilePagination = async () => {
    if (!currentTask) return;
    const take = 10;
    const skip = taskFilePage * take;
    await dispatch(
      taskFilePaginationAsync({
        where: {
          taskId: currentTask.id,
        },
        skip,
        take,
      })
    );
  };

  const onSubTaskPagination = async () => {
    if (!currentTask) return;
    const take = 10;
    const skip = subTaskPage * take;
    await dispatch(
      subTaskPaginationAsync({
        where: {
          taskId: currentTask.id,
        },
        skip,
        take,
      })
    );
  };

  const onAddSubTask = async (body) => {
    await dispatch(addSubTaskAsync({ ...body })).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onToggleSubTask = async (subTaskId) => {
    await dispatch(toggleSubTaskAsync(subTaskId)).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onRemoveSubTask = async (subTaskId) => {
    await dispatch(removeSubTaskAsync(subTaskId)).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onAddTaskComment = async (body) => {
    await dispatch(addTaskCommentAsync({ ...body })).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onEditTaskComment = async (body) => {
    await dispatch(editTaskCommentAsync({ ...body })).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onRemoveTaskComment = async (taskCommentId) => {
    await dispatch(deleteTaskCommentAsync(taskCommentId)).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onAddTaskFile = async (body) => {
    await dispatch(addTaskFileAsync({ ...body })).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  const onRemoveTaskFile = async (taskFileID) => {
    await dispatch(deleteTaskFileAsync(taskFileID)).then(async () => {
      await Promise.all(onGetAllColumnOfTeam(), onLoadTaskDetail(currentTask.id));
    });
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        onTaskCommentPagination(),
        onTaskHistoryPagination(),
        onSubTaskPagination(),
        onTaskFilePagination(),
      ]);
    };
    if (currentTask) loadData();
  }, [currentTask]);

  return {
    onLoadTaskDetail,
    onUpdateTask,
    onUpdateTaskStatus,
    onSubTaskPagination,
    onTaskFilePagination,
    onTaskCommentPagination,
    onTaskHistoryPagination,
    onAddSubTask,
    onToggleSubTask,
    onRemoveSubTask,
    onAddTaskComment,
    onEditTaskComment,
    onRemoveTaskComment,
    onAddTaskFile,
    onRemoveTaskFile,
  };
};
