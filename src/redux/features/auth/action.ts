/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { getProfileUser, login } from "@/services/auth";
import { LoginDTO } from "./dto";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@/dto/user.dto";
import { ILoginResponse } from "@/dto/dto";

export const AuthActionKey = {
  LOGIN: "auth/login",
  LOGIN_GOOGLE: 'auth/loginGoogle',
  LOGIN_GITHUB: 'auth/loginGithub',
  GET_PROFILE: "auth/get-profile",
} as const;

// Đăng nhập mặc định
export const signInAsync = createAsyncThunk<
  { user: IUser; loginResponse: ILoginResponse } | null,
  LoginDTO
>(AuthActionKey.LOGIN, async (loginDTO: LoginDTO) => {
  return await login(loginDTO, 'default');
});

// Đăng nhập bằng Google
export const signInGoogleAsync = createAsyncThunk<
  { user: IUser; loginResponse: ILoginResponse } | null,
  LoginDTO
>(AuthActionKey.LOGIN_GOOGLE, async (loginDTO: LoginDTO) => {
  return await login(loginDTO, 'google');
});

// Đăng nhập bằng GitHub
export const signInGithubAsync = createAsyncThunk<
  { user: IUser; loginResponse: ILoginResponse } | null,
  LoginDTO
>(AuthActionKey.LOGIN_GITHUB, async (loginDTO: LoginDTO) => {
  return await login(loginDTO, 'github');
});

export const getProfileAsync = createAsyncThunk<{
  user: IUser;
  enumData: {
    taskStatus: any;
    taskType: any;
    taskPriority: any;
  };
}>(AuthActionKey.GET_PROFILE, getProfileUser);


export const useAuthAction = () => {
  const dispatch = useDispatch<any>();

  const login = async (loginDTO: LoginDTO, platform: 'default' | 'google' | 'github') => {
    switch (platform) {
      case 'google':
        await dispatch(signInGoogleAsync(loginDTO));
        break;
      case 'github':
        await dispatch(signInGithubAsync(loginDTO));
        break;
      default:
        await dispatch(signInAsync(loginDTO));
    }
    await getProfile();
  };

  const getProfile = async () => {
    dispatch(getProfileAsync());
  };

  return {
    login,
    getProfile,
  };
};
