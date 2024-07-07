/* eslint-disable react-hooks/exhaustive-deps */
import { changeCurrentTeams } from "@/redux/features/team/teamSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ITeam } from "@/dto/team.dto";
import {
  createNewTeam,
  getLstUserToInviteTeam,
  paginationTeamOfUser,
} from "@/services/team";
import { useCallback, useState } from "react";
import { ITeamToCreate } from "@/Layouts/PrivateLayout/ModalUtil/ModalCreateNewTeam";

export const TeamActionKey = {
  ADD_TEAM: "team/add_team",
  LST_USER_TO_INVITE_TEAM: "team/lst_user_to_invite_team",
  LST_TEAM_OF_USER: "team/lst_team_of_user",
} as const;
export const addTeamAsync = createAsyncThunk(
  TeamActionKey.ADD_TEAM,
  createNewTeam
);
export const getLstUserToInviteTeamAsync = createAsyncThunk(
  TeamActionKey.LST_USER_TO_INVITE_TEAM,
  getLstUserToInviteTeam
);

export const paginationTeamOfUserAsync = createAsyncThunk(
  TeamActionKey.LST_TEAM_OF_USER,
  paginationTeamOfUser
);

export const useTeamAction = () => {
  const dispatch = useDispatch();
  const [page] = useState<number>(0);
  const [pageOfTeam, setPageOfTeam] = useState<number>(0);
  const changeCurrent = (team: ITeam) => {
    dispatch(changeCurrentTeams(team));
  };
  const getLstUserToInvite = useCallback(
    async (lstUserExist: string[]) => {
      await dispatch(getLstUserToInviteTeamAsync({ lstUserExist, page: page }));
    },
    [page]
  );

  const paginationTeamOfUser = useCallback(async () => {
    await dispatch(paginationTeamOfUserAsync(pageOfTeam));
    setPageOfTeam(pageOfTeam + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOfTeam]);
  const createNewTeam = async (team: ITeamToCreate) => {
    await dispatch(addTeamAsync(team));
  };
  return {
    paginationTeamOfUser,
    createNewTeam,
    changeCurrent,
    getLstUserToInvite,
  };
};
