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
