import { IUser } from "./user.dto";

export interface ITask {
  id: string;
  title: string;
  description: string;
  dateExpire: Date;
  priority: string;
  type: string;
  status: string;
  fileLink: string;
  sourceCodeLink: string;
  lstMember: IUser[];
}
