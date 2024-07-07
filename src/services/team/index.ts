import { ITeam } from "@/dto/team.dto";
import { IBaseResponse } from "../dto";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";
import { handleErrorApi } from "@/helper";
import { IUser } from "@/dto/user.dto";
import { toast } from "sonner";
import { ITeamToCreate } from "@/Layouts/PrivateLayout/ModalUtil/ModalCreateNewTeam";

export const createNewTeam = async (team: ITeamToCreate): Promise<ITeam> => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<ITeam> = await rootApi.post(
      endpoints.create_team,
      team
    );
    toast.success(res.message);
    return res.data;
  });
};

export const getLstUserToInviteTeam = async (data: {
  lstUserExist: string[];
  page: number;
}): Promise<IUser[]> => {
  return await handleErrorApi(async () => {
    const res: [IUser[], number] = await rootApi.post(
      endpoints.lst_user_to_invite_team,
      {
        lstUserTeamExist: data.lstUserExist,
        skip: 10 * data.page,
        take: 10,
      }
    );
    return res[0];
  });
};

export const paginationTeamOfUser = async (page: number): Promise<ITeam[]> => {
  return await handleErrorApi(async () => {
    const res: [IUser[], number] = await rootApi.post(
      endpoints.team_of_user_pagination,
      {
        skip: 10 * page,
        take: 10,
      }
    );
    return res[0];
  });
};
