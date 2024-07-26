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
  receiver?: IUser;
  lstReceiver?: IUser[];
  isSingleChat?: boolean;
}

export interface IMessage {
  content: string;
  user: IUser;
  isRead: boolean;
  groupChat: IGroupChat;
}
