import Button from "@/components/UI/Button";
import { IGroupChat } from "@/dto/chat.dto";
import { useChatAction } from "@/redux/features/chat/action";
import { useChatState } from "@/redux/features/chat/chatSlice";
import { useEffect } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import ReceiverItem from "./ReceiverItem";
import LstChatItemSkeleton from "./skeleton/ChatItemSkeleton";

function SideBarMessage() {
  const { isLoadingGroupChatPagination, isLoaded, isHasNextPageGroupChat } =
    useChatState();
  const { onGroupChatPagination, onFetchNextPageGroupChat } = useChatAction();
  const { lstGroupChat } = useChatState();
  const handleOpenNewGroupChat = () => {
    const modal = document.getElementById(
      "modal_new_group_chat"
    ) as HTMLDialogElement;

    if (modal) {
      modal?.show();
    }
  };

  useEffect(() => {
    !isLoaded && onGroupChatPagination();
  }, []);
  return (
    <div className="w-[18rem] h-full flex flex-col border-r flex-1">
      <div className="w-full flex  h-[5rem] justify-between items-center p-4 border-b">
        <h6 className="text-sm">All messages</h6>

        <div className="join">
          <button className="btn join-item scale-animation">
            <BsSearch size={20} className="cursor-pointer " />
          </button>
          <button className="btn join-item" onClick={handleOpenNewGroupChat}>
            <BiSolidMessageAdd size={20} className="cursor-pointer " />
          </button>
        </div>
      </div>

      <div
        className="flex flex-col w-full overflow-auto"
        style={{ height: "calc(100% - 4rem)" }}
      >
        {lstGroupChat.map((groupChat: IGroupChat, index: number) => {
          return <ReceiverItem key={index} data={groupChat} />;
        })}
        {isLoadingGroupChatPagination && <LstChatItemSkeleton />}

        {isHasNextPageGroupChat && (
          <Button
            name="Load more"
            type={"link"}
            onClick={onFetchNextPageGroupChat}
          />
        )}
      </div>
    </div>
  );
}

export default SideBarMessage;
