import { IGroupChat } from "@/dto/chat.dto";
import { useChatState } from "@/redux/features/chat/chatSlice";
import { BiSolidMessageAdd } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import ReceiverItem from "./ReceiverItem";

function SideBarMessage() {
  const { lstGroupChat } = useChatState();
  const handleOpenNewGroupChat = () => {
    const modal = document.getElementById(
      "modal_new_group_chat"
    ) as HTMLDialogElement;

    if (modal) {
      modal?.show();
    }
  };
  return (
    <div className="w-1/4  h-full flex flex-col border-r">
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
      </div>
    </div>
  );
}

export default SideBarMessage;
