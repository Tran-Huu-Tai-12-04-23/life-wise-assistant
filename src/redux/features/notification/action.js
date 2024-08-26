/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { notificationPagination } from 'src/services/notification';
import { useNotificationState } from './notificationSlice';

export const NotificationActionKey = {
  NOTIFICATION_PAGINATION: 'notification/pagination',
  TOP_TEN_NOTIFICATION: 'notification/top_ten',
};
export const notificationPaginationAsync = createAsyncThunk(
  NotificationActionKey.NOTIFICATION_PAGINATION,
  notificationPagination
);

export const useNotificationAction = () => {
  const dispatch = useDispatch();
  const { isHasNextPageNotification, notificationPage } = useNotificationState();

  const onNotificationPagination = async () => {
    if (!isHasNextPageNotification) {
      dispatch(notificationPaginationAsync(notificationPage));
    }
  };

  useEffect(() => {
    onNotificationPagination();
  }, []);

  return {
    onNotificationPagination,
  };
};
