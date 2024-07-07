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
  GET_PROFILE: "auth/get-profile",
} as const;
export const signInAsync = createAsyncThunk<
  {
    user: IUser;
    loginResponse: ILoginResponse;
  } | null,
  LoginDTO
>(AuthActionKey.LOGIN, login);

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
  const login = async (loginDTO: LoginDTO) => {
    await dispatch(signInAsync(loginDTO));
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
