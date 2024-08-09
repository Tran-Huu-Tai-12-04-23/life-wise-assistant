import { IColumn } from "@/dto/column.dto";
import { handleErrorApi } from "@/helper";
import { toast } from "react-toastify";
import { IBaseResponse } from "../dto";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";
import {
  DataToCreateColumnDTO,
  ITaskToCreate,
  LoadAllColOfTeamDTO,
  MoveTaskToDiffColumnDTO,
  MoveTaskToTheSameColDTO,
  SwapBetweenColDTO,
} from "./dto";

export const createNewColumn = async (body: DataToCreateColumnDTO) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn> = await rootApi.post(
      endpoints.create_column,
      body
    );
    toast.success(res.message);
    return res.data;
  });
};

export const getAllColumnOfTeam = async (
  loadAllColOfTeamDTO: LoadAllColOfTeamDTO
) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn[]> = await rootApi.post(
      endpoints.all_column_of_team,
      loadAllColOfTeamDTO
    );
    return res;
  });
};

export const addTaskToColumn = async (taskToCreateDTO: ITaskToCreate) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn> = await rootApi.post(
      endpoints.add_task_to_column,
      taskToCreateDTO
    );
    toast.success(res.message);
    return res.data;
  });
};

export const moveTaskInTheSameCol = async (
  moveTaskInTheSameCol: MoveTaskToTheSameColDTO
) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn> = await rootApi.post(
      endpoints.move_task_in_the_same_col,
      moveTaskInTheSameCol
    );
    return res.data;
  });
};

export const moveTaskToDiffCol = async (
  moveTaskToDiffColDTO: MoveTaskToDiffColumnDTO
) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn> = await rootApi.post(
      endpoints.move_task_to_diff_col,
      moveTaskToDiffColDTO
    );
    toast.success(res.message);
    return res.message;
  });
};

export const swapBetweenCol = async (swapBetweenColDTO: SwapBetweenColDTO) => {
  return await handleErrorApi(async () => {
    const res: IBaseResponse<IColumn> = await rootApi.post(
      endpoints.swap_between_col,
      swapBetweenColDTO
    );
    console.log(res);
    return res.message;
  });
};
