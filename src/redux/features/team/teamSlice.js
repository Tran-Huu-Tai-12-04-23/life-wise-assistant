import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import {
  addTeamAsync,
  generateInviteLinkAsync,
  getLstUserToInviteTeamAsync,
  paginationTeamOfUserAsync,
  teamHistoryPaginationAsync,
} from './action';

// interface TeamState {
//   teams: ITeam[];
//   currentTeam: ITeam | null;
//   lstUser: IUser[];
//   isLoading: boolean;
//   isLoadingCreateNew: boolean;
//   isLoadingPagination: boolean;
//   isHasNextPage: boolean;
// }

const initialState = {
  teams: [],
  lstUser: [],
  currentTeam: null,
  isLoading: false,
  isLoadingCreateNew: false,
  isLoadingPagination: false,
  isHasNextPage: false,
  isLoadingGenerateInviteLink: false,
  inviteLink: '',
  teamHistory: [],
  isLoadTeamHistory: false,
  isHasNextPageTeamHistory: false,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.teams.push(action.payload);
    },
    changeCurrentTeams: (state, action) => {
      state.currentTeam = action.payload;
      const isExpiredInviteToken = action.payload?.isExpiredInviteToken;
      if (!isExpiredInviteToken) {
        state.inviteLink = action.payload?.inviteToken;
      }
      state.inviteLink = '';
      state.teamHistory = [];
      state.isLoadTeamHistory = false;
      state.isHasNextPageTeamHistory = false;
    },
    resetTeamHistory: (state) => {
      state.teamHistory = [];
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
      .addCase(generateInviteLinkAsync.fulfilled, (state, action) => {
        state.isLoadingGenerateInviteLink = false;
        state.inviteLink = action.payload;
      })
      .addCase(generateInviteLinkAsync.pending, (state) => {
        state.isLoadingCreateNew = false;
      })
      .addCase(generateInviteLinkAsync.rejected, (state) => {
        state.isLoadingCreateNew = false;
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
      .addCase(addTeamAsync.rejected, (state) => {
        state.isLoadingPagination = false;
        state.isLoading = false;
        state.isLoadingCreateNew = false;
      })
      .addCase(getLstUserToInviteTeamAsync.rejected, (state) => {
        state.isLoadingPagination = false;
        state.isLoading = false;
        state.isLoadingCreateNew = false;
      })
      .addCase(paginationTeamOfUserAsync.rejected, (state) => {
        state.isLoadingPagination = false;
        state.isLoading = false;
        state.isLoadingCreateNew = false;
      })
      .addCase(teamHistoryPaginationAsync.fulfilled, (state, action) => {
        state.teamHistory = [...state.teamHistory, ...action.payload[0]];
        state.isHasNextPageTeamHistory = action.payload[2];
        state.isLoadTeamHistory = false;
      })
      .addCase(teamHistoryPaginationAsync.pending, (state) => {
        state.isLoadTeamHistory = true;
      })
      .addCase(teamHistoryPaginationAsync.rejected, (state) => {
        state.isLoadTeamHistory = false;
        state.teamHistory = [];
        state.isHasNextPageTeamHistory = false;
      });
  },
});

export default teamSlice.reducer;

export const { addTask, changeCurrentTeams, resetTeamState, resetTeamHistory } = teamSlice.actions;

export const selectTask = (state) => state.team;

export const useTeamState = () => useSelector(selectTask);
