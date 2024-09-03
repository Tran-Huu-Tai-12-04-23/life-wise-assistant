import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const getLstUserToInvite = () =>
  handleErrorApi(() => rootApi.get(endpoints.lst_user_to_invite_team));

export const getProfile = () => handleErrorApi(() => rootApi.get(endpoints.user.profile));

export const updateProfile = (editData) =>
  handleErrorApi(() => rootApi.put(endpoints.user.profile, editData));
