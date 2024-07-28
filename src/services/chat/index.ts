import { IGroupChat, IMessage } from "@/dto/chat.dto";
import { handleErrorApi } from "@/helper";
import { toast } from "sonner";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";
import {
  GroupChatPaginationDTO,
  ICreateChatDTO,
  MessagePaginationDTO,
} from "./dto";

export const createNewChat = async (
  body: ICreateChatDTO
): Promise<IGroupChat> => {
  const res = await handleErrorApi(() =>
    rootApi.post(endpoints.create_new_chat, body)
  );
  toast.success(res.message);
  return res.data;
};

export const onGroupChatPagination = async (
  body: GroupChatPaginationDTO
): Promise<IGroupChat[]> => {
  return await handleErrorApi(async () => {
    const res: [IGroupChat[], number] = await rootApi.post(
      endpoints.group_chat_pagination,
      {
        where: body.where,
        skip: 10 * body.page,
        take: 10,
      }
    );
    return res[0];
  });
};

export const messagePagination = async (
  body: MessagePaginationDTO
): Promise<IMessage[]> => {
  return await handleErrorApi(async () => {
    console.log(body.page);
    const res: [IMessage[], number] = await rootApi.post(
      endpoints.message_pagination,
      {
        where: body.where,
        skip: 15 * body.page,
        take: 15,
      }
    );
    return res[0];
  });
};
