export const endpoints = {
  sign_in: "/auth/sign-in",
  get_profile: "/auth/profile",

  //#region team CRUD
  create_team: "/team",
  team_of_user_pagination: "/team/pagination",
  lst_user_to_invite_team: "/auth/lst-user-to-invite-team",
  //#endregion

  //#region column CRUD
  create_column: "/column",
  all_column_of_team: "/column/team",
  swap_between_col: "/column/swap-between-col",
  add_task_to_column: "/task",
  move_task_in_the_same_col: "/task/move-task-in-the-same-column",
  move_task_to_diff_col: "/task/move-task-to-diff-column",
  //#endregion

  //#region chat
  create_new_chat: "/chat/create-new-chat",
  group_chat_pagination: "/chat/group-chat-pagination",
  //#endregion
};
