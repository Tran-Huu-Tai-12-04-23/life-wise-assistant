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
  isGroupChat?: boolean;
}

export interface IMessage extends IBase {
  content: string;
  user: IUser;
  isRead: boolean;
  groupChat: IGroupChat;
  isSender: boolean;
  owner: IUser;
}
