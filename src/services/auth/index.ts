/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginResponse } from "@/dto/dto";
import { IUser } from "@/dto/user.dto";
import { handleErrorApi, saveAccessToken, saveRefreshToken } from "@/helper";
import { LoginDTO } from "@/redux/features/auth/dto";
import { toast } from "react-toastify";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";

export const login = async (
  loginDTO: LoginDTO
): Promise<{
  user: IUser;
  loginResponse: ILoginResponse;
} | null> => {
  return handleErrorApi(async () => {
    const res: ILoginResponse = await rootApi.post(endpoints.sign_in, loginDTO);
    if (!res) {
      toast.error("Login failed! Try again!");
      return null;
    }
    await saveAccessToken(res.accessToken);
    await saveRefreshToken(res.refreshToken);
    await setTimeout(() => {}, 1000);
    const user: IUser = await rootApi.get(endpoints.get_profile);

    return {
      loginResponse: res,
      user,
    };
  });
};

export const getProfileUser = (): Promise<{
  user: IUser;
  enumData: {
    taskStatus: any;
    taskType: any;
    taskPriority: any;
  };
}> => {
  return handleErrorApi(() => rootApi.get(endpoints.get_profile));
};