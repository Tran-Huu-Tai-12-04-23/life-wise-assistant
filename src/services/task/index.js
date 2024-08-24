import { handleErrorApi } from '../../helper/index';
import { endpoints } from '../endpoints';
import rootApi from '../root-api';

export const loadTaskDetail = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.get(`${endpoints.task}${body.id}/${body.teamId}`);
    return res;
  });

export const updateTask = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${endpoints.task}`, body);
    return res;
  });

export const taskCommentPagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.task_comment_pagination}`, body);
    return res;
  });

export const subTaskPagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.sub_task_pagination}`, body);
    return res;
  });

export const taskFilePagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.task_file_pagination}`, body);
    return res;
  });

export const taskHistoryPagination = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.task_history_pagination}`, body);
    return res;
  });

export const addSubTask = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${endpoints.add_sub_task}`, body);
    return res;
  });

export const toggleSubTask = async (subTaskId) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${`${endpoints.toggle_subtask}/${subTaskId}`}`);
    return res;
  });

export const deleteSubTask = async (subTaskId) =>
  handleErrorApi(async () => {
    const res = await rootApi.delete(`${`${endpoints.delete_sub_task}/${subTaskId}`}`);
    return res;
  });

export const addTaskComment = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${`${endpoints.add_task_comment}`}`, body);
    return res;
  });

export const editTaskComment = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.put(`${`${endpoints.edit_task_comment}`}`, body);
    return res;
  });

export const deleteTaskComment = async (taskCommentId) =>
  handleErrorApi(async () => {
    const res = await rootApi.delete(`${`${`${endpoints.delete_task_comment}/${taskCommentId}`}`}`);
    return res;
  });

export const addTaskFile = async (body) =>
  handleErrorApi(async () => {
    const res = await rootApi.post(`${`${endpoints.add_task_file}`}`, body);
    return res;
  });

export const deleteTaskFile = async (taskFileId) =>
  handleErrorApi(async () => {
    const res = await rootApi.delete(`${`${`${endpoints.delete_task_file}/${taskFileId}`}`}`);
    return res;
  });
