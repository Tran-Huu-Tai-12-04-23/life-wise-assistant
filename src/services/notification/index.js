import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const notificationPagination = async (page) => {
  const skip = 10 * page;
  const take = 10;
  return handleErrorApi(async () => {
    const res = await rootApi.post(endpoints.notification_pagination, {
      skip,
      take,
    });
    return res;
  });
};
