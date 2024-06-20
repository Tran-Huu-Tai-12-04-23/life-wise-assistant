import { TaskDTO } from "./task.dto";

export interface ColumnDTO {
  id: string;
  name: string;
  tasks: TaskDTO[];
}
