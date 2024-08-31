import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import {
  acceptInviteAsync,
  maskAsReadAsync,
  notificationPaginationAsync,
  rejectInviteAsync,
} from './action';

const initialState = {
  isLoadNotification: false,
  notifications: [],
  currentNotification: null,
  pageOneNotification: [],
  isHasNextPageNotification: false,
  notificationPage: 0,
  numberTake: 5,
  totalUnread: 0,
  totalNotification: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeCurrentNotification: (state, action) => {
      state.currentNotification = action.payload;
    },
    changePageNotification: (state, action) => {
      state.notificationPage = action.payload;
    },
    changeNumberTakeNotification: (state, action) => {
      state.numberTake = action.payload;
    },
    resetNotificationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(notificationPaginationAsync.fulfilled, (state, action) => {
        if (state.notificationPage === 0) {
          state.notifications = action.payload[0];
          state.pageOneNotification = action.payload[0];
        } else {
          state.notifications = action.payload[0];
        }
        state.totalUnread = action.payload[3];
        state.totalNotification = action.payload[1];
        state.isHasNextPageNotification = action.payload[2];
        state.isLoadNotification = false;
      })
      .addCase(notificationPaginationAsync.pending, (state) => {
        state.isLoadNotification = true;
      })
      .addCase(notificationPaginationAsync.rejected, (state) => {
        state.isLoadNotification = false;
      })
      .addCase(acceptInviteAsync.fulfilled, (state, action) => {
        state.isLoadNotification = false;
        const { lstNotificationIdRead } = action.payload;
        if (!lstNotificationIdRead) return;
        state.notifications = state.notifications.map((item) => {
          if (lstNotificationIdRead.includes(item.id)) {
            if (!item.isRead) state.totalUnread -= 1;
            return { ...item, isRead: true };
          }
          return item;
        });
        state.pageOneNotification = state.pageOneNotification.map((item) => {
          if (lstNotificationIdRead.includes(item.id)) {
            return { ...item, isRead: true };
          }
          return item;
        });
        state.totalUnread -= 1;
      })
      .addCase(acceptInviteAsync.pending, (state) => {
        state.isLoadNotification = true;
      })
      .addCase(acceptInviteAsync.rejected, (state) => {
        state.isLoadNotification = false;
      })
      .addCase(rejectInviteAsync.fulfilled, (state, action) => {
        state.isLoadNotification = false;
        const { lstNotificationIdRead } = action.payload;
        if (!lstNotificationIdRead) return;
        state.notifications = state.notifications.map((item) => {
          if (lstNotificationIdRead.includes(item.id)) {
            if (!item.isRead) state.totalUnread -= 1;
            return { ...item, isRead: true };
          }
          return item;
        });
        state.pageOneNotification = state.pageOneNotification.map((item) => {
          if (lstNotificationIdRead.includes(item.id)) {
            return { ...item, isRead: true };
          }
          return item;
        });
        state.totalUnread -= 1;
      })
      .addCase(rejectInviteAsync.pending, (state) => {
        state.isLoadNotification = true;
      })
      .addCase(rejectInviteAsync.rejected, (state) => {
        state.isLoadNotification = false;
      })
      .addCase(maskAsReadAsync.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((item) => {
          if (item.id === action.payload.id) {
            if (!item.isRead) state.totalUnread -= 1;
            return { ...item, isRead: true };
          }
          return item;
        });
        state.pageOneNotification = state.pageOneNotification.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, isRead: true };
          }
          return item;
        });
      });
  },
});

export default notificationSlice.reducer;

export const {
  changePageNotification,
  changeNumberTakeNotification,
  changeCurrentNotification,
  resetNotificationState,
  resetNotification,
} = notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export const useNotificationState = () => useSelector(selectNotification);
