/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/UI/Avatar";
import Button from "@/components/UI/Button";
import Spinner from "@/components/UI/Spinner";
import { IMessage } from "@/dto/chat.dto";
import { useChatAction } from "@/redux/features/chat/action";
import { useChatState } from "@/redux/features/chat/chatSlice";
import { connect, disconnect, subscribeToChat } from "@/services/socketService";
import { useEffect, useMemo, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatItem from "./ChatItem";
import EmptyChat from "./EmptyChat";

function ContentMessage() {
  const {
    currentGroupChat,
    isHasNextMessagePagination,
    messages,
    isLoadingMessagePagination,
  } = useChatState();
  const { onFetchNextPagePagination, onAddMessage } = useChatAction();
  const contentRef = useRef<any>(null);

  const chatMessages = useMemo(() => {
    return Array.isArray(messages) ? [...messages].reverse() : [];
  }, [messages]);
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);
  const scroll = () => {
    console.log("scroll");
    if (contentRef && contentRef?.current) {
      contentRef?.current?.scrollTo({
        top: contentRef?.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    let timeOutId: any = 0;
    if (currentGroupChat) {
      return subscribeToChat((message: any) => {
        if (currentGroupChat?.id === message.groupChat.id) {
          onAddMessage(message);
          timeOutId = setTimeout(scroll, 300);
        }
      });
    }
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupChat]);

  useEffect(() => {
    const timeout = setTimeout(scroll, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!currentGroupChat) return <EmptyChat />;
  return (
    <div
      style={{
        width: "calc( 100% - 18rem )",
      }}
      className="relative h-full pb-0 bg-primary-content/10"
    >
      <div className="gap-2 w-full sticky top-0 z-10 backdrop-blur-3xl border-b h-[3rem] p-4 flex justify-start items-center">
        <Avatar
          isOnline={true}
          isStatus
          url={currentGroupChat?.receiver?.avatar}
        />
        <h1 className="font-bold text-sm">
          {currentGroupChat?.receiver?.username}
        </h1>
      </div>
      {/* chat */}
      <div
        ref={contentRef}
        className="flex flex-col gap-2 h-[80%]  overflow-auto pl-4 pr-4"
      >
        {isHasNextMessagePagination && (
          <div className="p-4 center flex">
            <Button
              type={"link"}
              onClick={onFetchNextPagePagination}
              name="More"
            />
          </div>
        )}
        {isLoadingMessagePagination && (
          <div className="w-full center flex ">
            <Spinner />
          </div>
        )}
        {chatMessages?.map((message: IMessage) => (
          <ChatItem key={message.id} data={message} />
        ))}
        {isLoadingMessagePagination && (
          <div className="w-full center flex ">
            <Spinner />
          </div>
        )}
      </div>

      <ChatInput
        onInputFocus={() => {
          if (contentRef && contentRef?.current) {
            contentRef?.current?.scrollTo({
              top: contentRef?.current?.scrollHeight,
              behavior: "smooth",
            });
          }
        }}
      />
    </div>
  );
}

export default ContentMessage;
