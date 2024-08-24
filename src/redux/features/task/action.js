/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { loadTaskDetail, updateTask } from 'src/services/task';
import { useTeamState } from '../team/teamSlice';
// eslint-disable-next-line import/no-cycle

export const TaskActionKey = {
  LOAD_DETAIL: 'task/load_detail',
  UPDATE_TASK: 'task/update_task',
};

export const loadDetailTaskAsync = createAsyncThunk(TaskActionKey.ADD_COLUMN, loadTaskDetail);
export const updateTaskAsync = createAsyncThunk(TaskActionKey.UPDATE_TASK, updateTask);

export const useTaskAction = () => {
  const dispatch = useDispatch();
  const { currentTeam } = useTeamState();

  const onLoadTaskDetail = async (id) => {
    await dispatch(
      loadDetailTaskAsync({
        teamId: currentTeam.id,
        id,
      })
    );
  };

  const onUpdateTask = async (body) => {
    toast.promise(dispatch(updateTaskAsync({ ...body })), {
      loading: 'Update task ...',
      success: 'Update task successfully',
      error: 'Update task failed',
    });
  };

  const onUpdateTaskStatus = async (body) => {
    toast.promise(dispatch(updateTaskAsync({ ...body })), {
      loading: 'Update task status ...',
      success: 'Update task status successfully',
      error: 'Update task status failed',
    });
  };

  return {
    onLoadTaskDetail,
    onUpdateTask,
    onUpdateTaskStatus,
  };
};
