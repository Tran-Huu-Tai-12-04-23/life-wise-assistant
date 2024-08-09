import { ITeam } from "@/dto/team.dto";
import { IUser } from "@/dto/user.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addTeamAsync,
  getLstUserToInviteTeamAsync,
  paginationTeamOfUserAsync,
} from "./action";

interface TeamState {
  teams: ITeam[];
  currentTeam: ITeam | null;
  lstUser: IUser[];
  isLoading: boolean;
  isLoadingCreateNew: boolean;
  isLoadingPagination: boolean;
  isHasNextPage: boolean;
}

const initialState: TeamState = {
  teams: [],
  lstUser: [],
  currentTeam: null,
  isLoading: false,
  isLoadingCreateNew: false,
  isLoadingPagination: false,
  isHasNextPage: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const teamSlice: any = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITeam>) => {
      state.teams.push(action.payload);
    },
    changeCurrentTeams: (state, action: PayloadAction<ITeam>) => {
      state.currentTeam = action.payload;
    },
    resetTeamState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams = [action.payload, ...state.teams];
        state.isLoadingCreateNew = false;
      })
      .addCase(getLstUserToInviteTeamAsync.fulfilled, (state, action) => {
        state.lstUser = action.payload;
        state.isLoading = false;
      })
      .addCase(paginationTeamOfUserAsync.fulfilled, (state, action) => {
        action.payload.forEach((newTeam) => {
          if (!state.teams.some((team) => team.id === newTeam.id)) {
            state.teams.push(newTeam);
          }
        });
        state.isHasNextPage = action.payload.length === 10;
        state.isLoadingPagination = false;
      })
      .addCase(addTeamAsync.pending, (state) => {
        state.isLoadingCreateNew = true;
      })
      .addCase(getLstUserToInviteTeamAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(paginationTeamOfUserAsync.pending, (state) => {
        state.isLoadingPagination = true;
      })
      .addMatcher(
        (action) =>
          [
            addTeamAsync.rejected,
            getLstUserToInviteTeamAsync.rejected,
            paginationTeamOfUserAsync.rejected,
          ].includes(action.type),
        (state) => {
          state.isLoadingPagination = false;
          state.isLoading = false;
          state.isLoadingCreateNew = false;
        }
      );
  },
});

export default teamSlice.reducer;

export const { addTask, changeCurrentTeams, resetTeamState } =
  teamSlice.actions;

export const selectTask = (state: RootState) => state.team;

export const useTeamState = () => useSelector(selectTask);
