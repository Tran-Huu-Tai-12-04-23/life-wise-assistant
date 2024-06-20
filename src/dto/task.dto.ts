import { UserDTO } from "./user.dto";

export interface TaskDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  lstMember: UserDTO[];
  priority: string;
}
