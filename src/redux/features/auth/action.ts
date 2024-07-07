import { useDispatch } from "react-redux";
import { getProfileUser, login } from "@/services/auth";
import { LoginDTO } from "./dto";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const AuthActionKey = {
  LOGIN: "auth/login",
  GET_PROFILE: "auth/get-profile",
} as const;
export const signInAsync = createAsyncThunk(AuthActionKey.LOGIN, login);

export const getProfileAsync = createAsyncThunk(
  AuthActionKey.GET_PROFILE,
  getProfileUser
);
export const useAuthAction = () => {
  const dispatch = useDispatch();
  const login = async (loginDTO: LoginDTO) => {
    await dispatch(signInAsync(loginDTO));
    await getProfile();
  };

  const getProfile = async () => {
    await dispatch(getProfileAsync());
  };

  return {
    login,
    getProfile,
  };
};
