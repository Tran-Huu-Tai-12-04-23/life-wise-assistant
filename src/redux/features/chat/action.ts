/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroupChat } from "@/dto/chat.dto";
import { createNewChat, groupChatPagination } from "@/services/chat";
import { ICreateChatDTO } from "@/services/chat/dto";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentGroupChat } from "./chatSlice";

export const ChatActionKey = {
  CREATE_NEW_CHAT: "chat/create_new_chat",
  GROUP_CHAT_PAGINATION: "chat/group_chat_pagination",
} as const;
export const createNewChatAsync = createAsyncThunk<IGroupChat, ICreateChatDTO>(
  ChatActionKey.CREATE_NEW_CHAT,
  createNewChat
);

export const groupChatPaginationAsync = createAsyncThunk<
  IGroupChat[],
  {
    where: {
      name: string;
    };
    page: number;
  }
>(ChatActionKey.GROUP_CHAT_PAGINATION, groupChatPagination);

export const useChatAction = () => {
  const dispatch = useDispatch<any>();
  const [pageOfGroupChat, setPageOfGroupChat] = useState<number>(0);
  const onCreateNewChat = useCallback(async (body: ICreateChatDTO) => {
    await dispatch(createNewChatAsync(body));
  }, []);

  const groupChatPagination = useCallback(
    async (name?: string) => {
      await dispatch(
        groupChatPaginationAsync({
          where: {
            name: name || "",
          },
          page: pageOfGroupChat,
        })
      );
      setPageOfGroupChat(pageOfGroupChat + 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [pageOfGroupChat]
  );

  const onChangeCurrentGroupChat = (groupChat: IGroupChat) => {
    dispatch(changeCurrentGroupChat(groupChat));
  };
  return {
    onCreateNewChat,
    onChangeCurrentGroupChat,
    groupChatPagination,
    fetchNextPageGroupChat: groupChatPagination,
  };
};
