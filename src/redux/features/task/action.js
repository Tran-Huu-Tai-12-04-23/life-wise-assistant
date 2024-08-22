/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { loadTaskDetail } from 'src/services/task';
import { useTeamState } from '../team/teamSlice';
// eslint-disable-next-line import/no-cycle

export const TaskActionKey = {
  LOAD_DETAIL: 'task/load_detail',
};

export const loadDetailTaskAsync = createAsyncThunk(TaskActionKey.ADD_COLUMN, loadTaskDetail);

export const useTaskAction = () => {
  const dispatch = useDispatch();
  const { currentTeam } = useTeamState();

  const onLoadTaskDetail = async (id) => {
    dispatch(
      loadDetailTaskAsync({
        teamId: currentTeam.id,
        id,
      })
    );
  };

  return {
    onLoadTaskDetail,
  };
};
