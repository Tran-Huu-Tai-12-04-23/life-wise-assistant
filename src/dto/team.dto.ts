import { IBase } from "./dto";
import { IUser } from "./user.dto";

export interface ITeam extends IBase {
  id: string;
  name: string;
  thumbnails: string;
  description: string;
  tags: string;
  members: IUser[];
}
