/* eslint-disable import/no-cycle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { saveAccessToken } from '../../../helper';
import { getProfileUser, login } from '../../../services/auth';
import { useAuthState } from './authSlice';

export const AuthActionKey = {
  LOGIN: 'auth/login',
  GET_PROFILE: 'auth/get-profile',
};
export const signInAsync = createAsyncThunk(AuthActionKey.LOGIN, login);

export const getProfileAsync = createAsyncThunk(AuthActionKey.GET_PROFILE, getProfileUser);
export const useAuthAction = () => {
  const { currentUser } = useAuthState();
  const dispatch = useDispatch();
  const onLogin = async (loginDTO) => {
    await dispatch(signInAsync(loginDTO));
    await getProfile();
  };

  const getProfile = async () => {
    if (currentUser) dispatch(getProfileAsync());
  };

  const getProfileWithAccessToken = async () => {
    dispatch(getProfileAsync());
  };

  const onLoginWithThirdPlatform = async (accessToken) => {
    await saveAccessToken(accessToken);
    await getProfile();
  };

  return {
    onLogin,
    getProfile,
    onLoginWithThirdPlatform,
    onGetProfileWithAccessToken: getProfileWithAccessToken,
  };
};
