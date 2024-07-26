import { IBase } from "./dto";
import { IUser } from "./user.dto";

export interface IGroupChat extends IBase {
  type: string;
  name?: string;
  status: boolean;
  owner?: IUser;
  socketID: string;
  lstMember: IUser[];
  messages: IMessage[];
}

export interface IMessage {
  content: string;
  user: IUser;
  isRead: boolean;
  groupChat: IGroupChat;
}
