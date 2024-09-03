import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const createNewTeam = async (team) => {
  const idToast = toast.loading('Create new board...');
  try {
    return await handleErrorApi(async () => {
      const res = await rootApi.post(`${endpoints.create_team}`, team);
      toast.update(idToast, {
        render: res.message,
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
      return res.data;
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

export const getLstUserToInviteTeam = async (data, page) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.lst_user_to_invite_team, {
      where: {
        ...data,
      },
      skip: 0,
      take: 1000000,
    });

    return res[0];
  });

export const paginationTeamOfUser = async (page) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.team_of_user_pagination, {
      skip: 10 * page,
      take: 10,
    });
    return res[0];
  });

export const generateInviteLink = async (teamId) =>
  handleErrorApi(async () => {
    const res = await rootApi.get(`${endpoints.generate_invite_link}/${teamId}`);
    toast.success(res.message);
    return res.inviteLink;
  });

// eslint-disable-next-line consistent-return
export const inviteUserToTeam = async (body) => {
  const idToast = toast.loading('Inviting user to team...');
  try {
    await handleErrorApi(async () => {
      const res = await rootApi.post(`${endpoints.invite_user}`, body);
      toast.update(idToast, {
        render: 'Invite user successfully!',
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

export const teamHistoryPagination = async (data) => {
  const skip = data.page * data.take;
  const { take, teamId } = data;
  return handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.team_history_pagination}/${teamId}`, {
      skip,
      take,
    });
    return res;
  });
};

export const loadTeamPermissionOfUser = async (data) =>
  handleErrorApi(async () => {
    const res = await rootApi.get(`${endpoints.team_permission}/${data.teamId}/${data.userId}`);
    return res;
  });

export const updateTeamPermissionOfUser = async (data) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${endpoints.team_permission}`, { ...data });
    return res;
  });
