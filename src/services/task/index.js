import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const loadTaskDetail = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.get(`${endpoints.task}${body.id}/${body.teamId}`);
    return res;
  });

export const updateTask = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${endpoints.task}`, body);
    return res;
  });
