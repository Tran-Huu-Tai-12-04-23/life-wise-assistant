import { IGroupChat } from "@/dto/chat.dto";

export interface ICreateChatDTO {
  userTargetId: string;
}

export interface ICreateChatResponse {
  message: string;
  data: IGroupChat;
}
