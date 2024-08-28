export const endpoints = {
  sign_in: '/auth/sign-in',
  sign_in_gg: '/auth/google',
  sign_in_github: '/auth/github',
  sign_in_gg_callback: '/auth/google/callback',
  sign_in_github_callback: '/auth/github/authorized',
  get_profile: '/auth/profile',

  // #region team CRUD
  create_team: '/team',
  team_of_user_pagination: '/team/pagination',
  lst_user_to_invite_team: '/auth/lst-user-to-invite-team',
  generate_invite_link: '/team/generate-invite-token',
  invite_user: '/team/invite-member-to-team',
  accept_invite: '/team/accept-invite',
  reject_invite: '/team/reject-invite',
  // #endregion

  // #region column CRUD
  create_column: '/column',
  all_column_of_team: '/column/team',
  filter_data: '/column/filter-data',
  swap_between_col: '/column/swap-between-col',
  add_task_to_column: '/task',
  move_task_in_the_same_col: '/task/move-task-in-the-same-column',
  move_task_to_diff_col: '/task/move-task-to-diff-column',
  // #endregion

  // #region chat
  create_new_chat: '/chat/create-new-chat',
  group_chat_pagination: '/chat/group-chat-pagination',
  message_pagination: '/chat/message-pagination',
  // #endregion

  // #region task
  task: '/task/',
  task_history_pagination: '/task/task-history-pagination',
  task_comment_pagination: '/task/task-comment-pagination',
  sub_task_pagination: '/task/sub-task-pagination',
  task_file_pagination: '/task/task-file-pagination',
  add_sub_task: 'task/add-sub-task',
  toggle_subtask: 'task/toggle-sub-task',
  delete_sub_task: 'task/delete-sub-task',
  add_task_comment: 'task/add-comment',
  edit_task_comment: 'task/edit-comment',
  delete_task_comment: 'task/delete-comment',
  add_task_file: 'task/add-task-file',
  delete_task_file: 'task/delete-task-file',
  // #endregion

  // #region notification
  notification_pagination: '/notification/pagination',

  // #endregion
};
