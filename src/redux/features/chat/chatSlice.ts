import { IGroupChat, IMessage } from "@/dto/chat.dto";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  createNewChatAsync,
  fetchNextPageMessagePaginationAsync,
  groupChatPaginationAsync,
  messagePaginationAsync,
} from "./action";

interface ChatState {
  lstGroupChat: IGroupChat[];
  currentGroupChat: IGroupChat | null;
  isHasNextPageGroupChat: boolean;
  isLoadingCreateNew: boolean;
  isLoadingGroupChatPagination: boolean;
  isLoaded: boolean;
  messages: IMessage[];
  isLoadingMessagePagination: boolean;
  isHasNextMessagePagination: boolean;
}

const initialState: ChatState = {
  lstGroupChat: [],
  currentGroupChat: null,
  isLoadingCreateNew: false,
  isLoadingGroupChatPagination: false,
  isHasNextPageGroupChat: true,
  isLoaded: false,
  messages: [],
  isLoadingMessagePagination: false,
  isHasNextMessagePagination: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatSlice: any = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addGroupChat: (state, action: PayloadAction<IGroupChat>) => {
      state.lstGroupChat.push(action.payload);
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const isCheckMessageExist = state.messages.find(
        (item) => item.id === action.payload.id
      );
      if (!isCheckMessageExist) {
        state.messages = [action.payload, ...state.messages];
      }
    },
    changeCurrentGroupChat: (state, action: PayloadAction<IGroupChat>) => {
      state.currentGroupChat = action.payload;
    },
    resetChatState: () => initialState,
    resetIsHasNextMessage: (state) => {
      state.isHasNextMessagePagination = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChatAsync.fulfilled, (state, action) => {
        state.lstGroupChat = [action.payload, ...state.lstGroupChat];
        state.isLoadingCreateNew = false;
      })
      .addCase(groupChatPaginationAsync.fulfilled, (state, action) => {
        if (action.payload.length < 10) {
          state.isHasNextPageGroupChat = false;
        }
        state.lstGroupChat = [...state.lstGroupChat, ...action.payload];
        state.isLoadingGroupChatPagination = false;
        state.isLoaded = true;
      })
      .addCase(messagePaginationAsync.fulfilled, (state, action) => {
        if (action.payload.length < 10) {
          state.isHasNextMessagePagination = false;
        }
        state.messages = [...action.payload];
        state.isLoadingMessagePagination = false;
      })
      .addCase(
        fetchNextPageMessagePaginationAsync.fulfilled,
        (state, action) => {
          state.messages = [...state.messages, ...action.payload];
          state.isLoadingMessagePagination = false;
          state.isHasNextMessagePagination = action.payload.length >= 15;
        }
      )
      .addCase(messagePaginationAsync.pending, (state) => {
        state.isLoadingMessagePagination = true;
      })
      .addCase(fetchNextPageMessagePaginationAsync.pending, (state) => {
        state.isLoadingMessagePagination = true;
      })

      .addCase(groupChatPaginationAsync.pending, (state) => {
        state.isLoadingGroupChatPagination = true;
      })
      .addCase(createNewChatAsync.pending, (state) => {
        state.isLoadingCreateNew = true;
      })
      .addMatcher(
        (action) =>
          [
            createNewChatAsync.rejected,
            groupChatPaginationAsync.rejected,
            messagePaginationAsync.rejected,
            fetchNextPageMessagePaginationAsync.rejected,
          ].includes(action.type),
        (state) => {
          state.isLoadingCreateNew = false;
          state.isLoadingGroupChatPagination = false;
          state.isLoadingMessagePagination = false;
        }
      );
  },
});

export default chatSlice.reducer;

export const {
  addGroupChat,
  resetChatState,
  changeCurrentGroupChat,
  addMessage,
  resetIsHasNextMessage,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export const useChatState = () => useSelector(selectChat);
