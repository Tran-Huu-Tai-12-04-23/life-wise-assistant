import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { notificationPaginationAsync } from './action';

const initialState = {
  isLoadNotification: false,
  notifications: [],
  currentNotification: null,
  pageOneNotification: [],
  isHasNextPageNotification: false,
  notificationPage: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeCurrentNotification: (state, action) => {
      state.currentNotification = action.payload;
    },
    resetNotificationState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(notificationPaginationAsync.fulfilled, (state, action) => {
        if (state.notificationPage === 0) {
          state.notifications = action.payload[0];
          state.pageOneNotification = action.payload[0];
        } else {
          state.notifications = [...state.notifications, ...action.payload[0]];
        }
        state.notificationPage += 1;
        state.isHasNextPageNotification = action.payload[2];
        state.isLoadNotification = false;
      })
      .addCase(notificationPaginationAsync.pending, (state) => {
        state.isLoadNotification = true;
      })
      .addCase(notificationPaginationAsync.rejected, (state) => {
        state.isLoadNotification = false;
      });
  },
});

export default notificationSlice.reducer;

export const { changeCurrentNotification, resetNotificationState } = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export const useNotificationState = () => useSelector(selectNotification);
