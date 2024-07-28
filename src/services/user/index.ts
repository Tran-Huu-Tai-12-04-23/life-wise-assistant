import { IUser } from "@/dto/user.dto";
import { handleErrorApi } from "@/helper";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";

export const getLstUserToInvite = (): Promise<{
  data: IUser[];
}> => {
  return handleErrorApi(() => rootApi.get(endpoints.lst_user_to_invite_team));
};
