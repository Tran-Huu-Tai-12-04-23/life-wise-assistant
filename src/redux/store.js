import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { clearUserDataFromLocalStorage } from '../helper/index';
import authReducer, { resetAuthState } from './features/auth/authSlice';
import chatReducer, { resetChatState } from './features/chat/chatSlice';
import columnReducer, { resetColumnState } from './features/column/columnSlice';
import taskReducer, { resetTaskState } from './features/task/taskSlice';
import teamReducer, { resetTeamState } from './features/team/teamSlice';

const rootReducer = combineReducers({
  team: teamReducer,
  auth: authReducer,
  column: columnReducer,
  chat: chatReducer,
  task: taskReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const revertAll = createAction('REVERT_ALL');

export const useResetState = () => {
  const dispatch = useDispatch();

  const resetState = async () => {
    try {
      clearUserDataFromLocalStorage();
      dispatch(resetTeamState());
      dispatch(resetAuthState());
      dispatch(resetColumnState());
      dispatch(revertAll());
      dispatch(resetChatState());
      dispatch(resetTaskState());
    } catch (error) {
      console.error('Error resetting state:', error);
    }
  };

  return {
    resetState,
  };
};
