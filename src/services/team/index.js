import { toast } from 'react-toastify';
import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const createNewTeam = async (team) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.create_team, team);
    toast.success(res.message);
    return res.data;
  });

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
