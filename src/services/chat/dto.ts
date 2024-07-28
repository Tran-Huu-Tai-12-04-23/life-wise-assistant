import { IGroupChat } from "@/dto/chat.dto";

export interface ICreateChatDTO {
  userTargetId: string;
}

export interface ICreateChatResponse {
  message: string;
  data: IGroupChat;
}

export interface MessagePaginationDTO {
  page: number;
  where: {
    groupChatId: string;
  };
}

export interface GroupChatPaginationDTO {
  page: number;
  where: {
    name: string;
  };
}
