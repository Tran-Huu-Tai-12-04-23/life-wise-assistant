/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  acceptInvite,
  markAsRead,
  notificationPagination,
  rejectInvite,
} from 'src/services/notification';
import { useColumnAction } from '../column/action';
import {
  changeNumberTakeNotification,
  changePageNotification,
  useNotificationState,
} from './notificationSlice';

export const NotificationActionKey = {
  NOTIFICATION_PAGINATION: 'notification/pagination',
  TOP_TEN_NOTIFICATION: 'notification/top_ten',
  ACCEPT_INVITE: 'notification/accept_invite',
  REJECT_INVITE: 'notification/reject_invite',
  MASK_AS_READ: 'notification/mas_as_read',
};
export const notificationPaginationAsync = createAsyncThunk(
  NotificationActionKey.NOTIFICATION_PAGINATION,
  notificationPagination
);

export const acceptInviteAsync = createAsyncThunk(
  NotificationActionKey.ACCEPT_INVITE,
  acceptInvite
);
export const rejectInviteAsync = createAsyncThunk(
  NotificationActionKey.REJECT_INVITE,
  rejectInvite
);

export const maskAsReadAsync = createAsyncThunk(NotificationActionKey.MASK_AS_READ, markAsRead);

export const useNotificationAction = () => {
  const dispatch = useDispatch();
  const { onGetAllColumnOfTeam } = useColumnAction();
  const { notificationPage, ...rest } = useNotificationState();

  const onNotificationPagination = async () => {
    await dispatch(
      notificationPaginationAsync({
        page: notificationPage,
        take: rest.numberTake,
      })
    );
  };

  const onChangePageNotification = (page) => {
    dispatch(changePageNotification(page));
    onNotificationPagination();
  };
  const onChangeNumberTakeNotification = async (number) => {
    await dispatch(changeNumberTakeNotification(number));
  };

  const onAcceptInvite = async (teamInviteId) => {
    await dispatch(acceptInviteAsync(teamInviteId));
  };

  const onRejectInvite = async (teamInviteId) => {
    await dispatch(rejectInviteAsync(teamInviteId));
    await onGetAllColumnOfTeam();
  };

  const onMaskAsRead = async (notificationId) => {
    await dispatch(maskAsReadAsync(notificationId));
  };

  useEffect(() => {
    onNotificationPagination();
  }, [notificationPage, rest.numberTake]);

  return {
    onNotificationPagination,
    onAcceptInvite,
    onRejectInvite,
    onMaskAsRead,
    onChangeNumberTakeNotification,
    onChangePageNotification,
  };
};
