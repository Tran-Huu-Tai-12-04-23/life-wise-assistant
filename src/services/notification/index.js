import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const notificationPagination = async (
  data = {
    page: 0,
    take: 10,
  }
) => {
  const { take } = data;
  const skip = take * data.page;

  return handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.notification_pagination, {
      skip,
      take,
    });
    return res;
  });
};

export const acceptInvite = async (teamInviteId) => {
  const idToast = toast.loading('Joining to team');
  try {
    return await handleErrorApi(async () => {
      const res = await rootApi.put(`${endpoints.accept_invite}/${teamInviteId}`);
      toast.update(idToast, {
        render: 'Joint to team successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      return res;
    });
  } catch (error) {
    toast.update(idToast, {
      render: error.message,
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    throw new Error(error);
  }
};

export const rejectInvite = async (teamInviteId) => {
  const idToast = toast.loading('Joining to team');
  try {
    return await handleErrorApi(async () => {
      const res = await rootApi.put(`${endpoints.reject_invite}/${teamInviteId}`);
      toast.update(idToast, {
        render: 'Joint to team successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      return res;
    });
  } catch (error) {
    toast.update(idToast, {
      render: error.message,
      type: 'error',
      isLoading: false,
      autoClose: 2000,
    });
    throw new Error(error);
  }
};

export const markAsRead = async (notificationId) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${endpoints.mask_as_read}/${notificationId}`);
    return res;
  });
