/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/order
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNewTeam,
  generateInviteLink,
  getLstUserToInviteTeam,
  paginationTeamOfUser,
} from '../../../services/team';
// eslint-disable-next-line import/no-cycle
import { resetColumnState } from '../column/columnSlice';
import { changeCurrentTeams } from './teamSlice';

export const TeamActionKey = {
  ADD_TEAM: 'team/add_team',
  LST_USER_TO_INVITE_TEAM: 'team/lst_user_to_invite_team',
  LST_TEAM_OF_USER: 'team/lst_team_of_user',
  GENERATE_INVITE_LINK: 'team/generate_invite_link',
};
export const addTeamAsync = createAsyncThunk(TeamActionKey.ADD_TEAM, createNewTeam);
export const getLstUserToInviteTeamAsync = createAsyncThunk(
  TeamActionKey.LST_USER_TO_INVITE_TEAM,
  getLstUserToInviteTeam
);

export const paginationTeamOfUserAsync = createAsyncThunk(
  TeamActionKey.LST_TEAM_OF_USER,
  paginationTeamOfUser
);

export const generateInviteLinkAsync = createAsyncThunk(
  TeamActionKey.GENERATE_INVITE_LINK,
  generateInviteLink
);

export const useTeamAction = () => {
  const dispatch = useDispatch();
  const [page] = useState(0);
  const [pageOfTeam, setPageOfTeam] = useState(0);
  const changeCurrent = (team) => {
    dispatch(changeCurrentTeams(team));
    dispatch(resetColumnState());
  };
  const getLstUserToInvite = useCallback(
    async (lstUserExist, name) => {
      dispatch(
        getLstUserToInviteTeamAsync(
          {
            lstUserExist,
            name,
          },
          page
        )
      );
    },
    [page]
  );

  const paginationTeamOfUserCallback = useCallback(async () => {
    dispatch(paginationTeamOfUserAsync(pageOfTeam));
    setPageOfTeam(pageOfTeam + 1);
  }, [pageOfTeam]);
  const createNewTeamCallBack = async (team) => {
    dispatch(addTeamAsync(team));
  };

  const handleGenerateInviteLink = async (teamId) => {
    dispatch(generateInviteLinkAsync(teamId));
  };

  useEffect(() => {
    paginationTeamOfUser();
  }, []);

  return {
    paginationTeamOfUser: paginationTeamOfUserCallback,
    createNewTeam: createNewTeamCallBack,
    changeCurrent,
    onGetLstUserToInvite: getLstUserToInvite,
    onGenerateInviteLink: handleGenerateInviteLink,
  };
};
