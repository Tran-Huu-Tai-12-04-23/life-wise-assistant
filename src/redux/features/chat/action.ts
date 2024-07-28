/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroupChat, IMessage } from "@/dto/chat.dto";
import {
  createNewChat,
  messagePagination,
  onGroupChatPagination,
} from "@/services/chat";
import {
  GroupChatPaginationDTO,
  ICreateChatDTO,
  MessagePaginationDTO,
} from "@/services/chat/dto";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addMessage,
  changeCurrentGroupChat,
  resetIsHasNextMessage,
  useChatState,
} from "./chatSlice";

export const ChatActionKey = {
  CREATE_NEW_CHAT: "chat/create_new_chat",
  GROUP_CHAT_PAGINATION: "chat/group_chat_pagination",
  MESSAGE_PAGINATION: "chat/message_pagination",
  FETCH_MESSAGE_PAGINATION: "chat/fetch_next_message_pagination",
} as const;
export const createNewChatAsync = createAsyncThunk<IGroupChat, ICreateChatDTO>(
  ChatActionKey.CREATE_NEW_CHAT,
  createNewChat
);

export const groupChatPaginationAsync = createAsyncThunk<
  IGroupChat[],
  GroupChatPaginationDTO
>(ChatActionKey.GROUP_CHAT_PAGINATION, onGroupChatPagination);

export const messagePaginationAsync = createAsyncThunk<
  IMessage[],
  MessagePaginationDTO
>(ChatActionKey.MESSAGE_PAGINATION, messagePagination);

export const fetchNextPageMessagePaginationAsync = createAsyncThunk<
  IMessage[],
  MessagePaginationDTO
>(ChatActionKey.FETCH_MESSAGE_PAGINATION, messagePagination);

export const useChatAction = () => {
  const dispatch = useDispatch<any>();
  const { currentGroupChat } = useChatState();
  const [pageOfGroupChat, setPageOfGroupChat] = useState<number>(0);
  const [pageOfMessage, setPageOfMessage] = useState<number>(1);

  const onCreateNewChat = useCallback(async (body: ICreateChatDTO) => {
    await dispatch(createNewChatAsync(body));
  }, []);

  const onAddMessage = useCallback(async (message: IMessage) => {
    dispatch(addMessage(message));
  }, []);

  const onGroupChatPagination = useCallback(
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
    },
    [pageOfGroupChat]
  );

  //  message pagination
  const onMessagePagination = useCallback(async () => {
    if (!currentGroupChat) return;
    setPageOfMessage(1);
    dispatch(resetIsHasNextMessage());
    await dispatch(
      messagePaginationAsync({
        where: {
          groupChatId: currentGroupChat.id,
        },
        page: 0,
      })
    );
  }, [currentGroupChat]);

  const onFetchNextPagePagination = async () => {
    if (!currentGroupChat) return;
    await dispatch(
      fetchNextPageMessagePaginationAsync({
        where: {
          groupChatId: currentGroupChat.id,
        },
        page: pageOfMessage,
      })
    );
    setPageOfMessage(pageOfMessage + 1);
  };

  const onChangeCurrentGroupChat = (groupChat: IGroupChat) => {
    dispatch(changeCurrentGroupChat(groupChat));
  };

  //  init message
  useEffect(() => {
    if (!currentGroupChat) return;
    onMessagePagination();
  }, [currentGroupChat]);

  return {
    onAddMessage,
    onCreateNewChat,
    onChangeCurrentGroupChat,
    onGroupChatPagination,
    onMessagePagination,
    onFetchNextPageGroupChat: onGroupChatPagination,
    onFetchNextPagePagination: onFetchNextPagePagination,
  };
};
