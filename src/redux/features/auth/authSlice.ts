/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { IUser } from "@/dto/user.dto";
import { getProfileAsync, signInAsync } from "./action";

interface AuthState {
  currentUser: IUser | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  enumData: {
    taskStatus: any;
    taskType: any;
    taskPriority: any;
  } | null;
}

const initialState: AuthState = {
  currentUser: null,
  isLoading: false,
  isError: false,
  error: "",
  enumData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState, isLoading: true },
  reducers: {
    resetAuthState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.currentUser = action.payload.user;
        }
      })
      .addCase(getProfileAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.currentUser = action.payload.user;
          state.enumData = action.payload.enumData;
        }
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export const selectTask = (state: RootState) => state.auth;

export const useAuthState = () => {
  const authState = useSelector(selectTask);
  return authState;
};

export default authSlice.reducer;
