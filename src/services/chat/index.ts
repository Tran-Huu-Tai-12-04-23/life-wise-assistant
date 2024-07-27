import { IGroupChat } from "@/dto/chat.dto";
import { handleErrorApi } from "@/helper";
import { toast } from "sonner";
import { endpoints } from "../endpoints";
import rootApi from "../root-api";
import { ICreateChatDTO } from "./dto";

export const createNewChat = async (
  body: ICreateChatDTO
): Promise<IGroupChat> => {
  const res = await handleErrorApi(() =>
    rootApi.post(endpoints.create_new_chat, body)
  );
  toast.success(res.message);
  return res.data;
};

export const groupChatPagination = async (body: {
  page: number;
  where: {
    name: string;
  };
}): Promise<IGroupChat[]> => {
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
