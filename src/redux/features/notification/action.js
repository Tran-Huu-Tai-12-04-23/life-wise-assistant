/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { acceptInvite, notificationPagination, rejectInvite } from 'src/services/notification';
import { useColumnAction } from '../column/action';
import { resetNotificationState, useNotificationState } from './notificationSlice';

export const NotificationActionKey = {
  NOTIFICATION_PAGINATION: 'notification/pagination',
  TOP_TEN_NOTIFICATION: 'notification/top_ten',
  ACCEPT_INVITE: 'notification/accept_invite',
  REJECT_INVITE: 'notification/reject_invite',
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

export const useNotificationAction = () => {
  const dispatch = useDispatch();
  const { onGetAllColumnOfTeam } = useColumnAction();
  const { isHasNextPageNotification, notificationPage } = useNotificationState();

  const onNotificationPagination = async () => {
    if (!isHasNextPageNotification || notificationPage === 0) {
      await dispatch(notificationPaginationAsync(notificationPage));
    }
  };

  const onAcceptInvite = async (teamInviteId) => {
    await dispatch(acceptInviteAsync(teamInviteId));
    await dispatch(resetNotificationState());
    await onNotificationPagination();
    await onGetAllColumnOfTeam();
  };

  const onRejectInvite = async (teamInviteId) => {
    await dispatch(rejectInviteAsync(teamInviteId));
    await dispatch(resetNotificationState());
    await onNotificationPagination();
    await onGetAllColumnOfTeam();
  };

  return {
    onNotificationPagination,
    onAcceptInvite,
    onRejectInvite,
  };
};
