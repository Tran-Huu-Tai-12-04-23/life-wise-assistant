/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginResponse } from "@/dto/dto";
import { LoginDTO } from "@/redux/features/auth/dto";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";
import { IUser } from "@/dto/user.dto";
import { handleErrorApi, saveAccessToken, saveRefreshToken } from "@/helper";
import { toast } from "sonner";

export const login = async (
  loginDTO: LoginDTO,
  platform: 'default' | 'google' | 'github'
): Promise<{
  user: IUser;
  loginResponse: ILoginResponse;
} | null> => {
  const getSignInEndpoint = () => {
    switch (platform) {
      case 'google':
        return endpoints.sign_in_gg;
      case 'github':
        return endpoints.sign_in_github;
      default:
        return endpoints.sign_in;
    }
  };
  return handleErrorApi(async () => {
    const endpoint = getSignInEndpoint();
    const res: ILoginResponse = await rootApi.post(endpoint, loginDTO);
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
