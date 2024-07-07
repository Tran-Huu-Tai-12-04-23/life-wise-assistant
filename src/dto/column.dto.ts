import { ITask } from "./task.dto";

export interface IColumn {
  id: string;
  name: string;
  statusCode: string;
  tasks: ITask[];
}
