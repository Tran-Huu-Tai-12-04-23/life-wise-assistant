import { IGroupChat } from "@/dto/chat.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { createNewChatAsync } from "./action";

interface ChatState {
  lstGroupChat: IGroupChat[];
  isLoadingCreateNew: boolean;
}

const initialState: ChatState = {
  lstGroupChat: [],
  isLoadingCreateNew: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatSlice: any = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addGroupChat: (state, action: PayloadAction<IGroupChat>) => {
      state.lstGroupChat.push(action.payload);
    },
    resetChatState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChatAsync.fulfilled, (state, action) => {
        state.lstGroupChat = [action.payload, ...state.lstGroupChat];
        state.isLoadingCreateNew = false;
      })
      .addMatcher(
        (action) => [createNewChatAsync.pending].includes(action.type),
        (state, action) => {
          state.isLoadingCreateNew =
            action.type === createNewChatAsync.pending.toString();
        }
      )
      .addMatcher(
        (action) => [createNewChatAsync.rejected].includes(action.type),
        (state) => {
          state.isLoadingCreateNew = false;
        }
      );
  },
});

export default chatSlice.reducer;

export const { addGroupChat, resetChatState } = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export const useChatState = () => useSelector(selectChat);
