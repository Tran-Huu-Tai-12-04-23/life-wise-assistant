/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroupChat } from "@/dto/chat.dto";
import { createNewChat } from "@/services/chat";
import { ICreateChatDTO } from "@/services/chat/dto";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const ChatActionKey = {
  CREATE_NEW_CHAT: "chat/create_new_chat",
} as const;
export const createNewChatAsync = createAsyncThunk<IGroupChat, ICreateChatDTO>(
  ChatActionKey.CREATE_NEW_CHAT,
  createNewChat
);

export const useChatAction = () => {
  const dispatch = useDispatch<any>();
  const onCreateNewChat = useCallback(async (body: ICreateChatDTO) => {
    await dispatch(createNewChatAsync(body));
  }, []);
  return { onCreateNewChat };
};
