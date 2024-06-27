import Avatar from "@/components/UI/Avatar";
import { CiImageOn } from "react-icons/ci";
import { MdKeyboardVoice } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import ChatItem from "./ChatItem";

function ContentMessage() {
  return (
    <div className="w-3/4 relative h-full overflow-auto pb-5 bg-primary-content/10">
      <div className="w-full sticky top-0 z-[100000] backdrop-blur-3xl border-b h-[5rem] p-4 flex justify-start items-center">
        <Avatar
          isOnline={true}
          isStatus
          url="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
        />
        <h1 className="font-bold text-sm">Simla huu taio</h1>
      </div>
      {/* chat */}
      <ChatItem text={"But I love u!"} isClient />
      <ChatItem text={"I hate you!"} isClient />
      <ChatItem text={"I hate you!"} isClient />
      <ChatItem text={"I hate you!"} isClient />
      <ChatItem text={"I hate you!"} isClient />
      <ChatItem text={"But I love u!"} isOwner />
      <ChatItem text={"But I love u!"} isOwner />
      <ChatItem text={"But I love u!"} isOwner />
      <ChatItem text={"But I love u!"} isOwner />
      <div className="flex gap-2 sticky rounded-xl border border-dashed border-primary/10 bottom-0 ml-6 mr-6 right-6 left-6 p-2 backdrop-blur-3xl shadow-3xl flex-nowrap">
        <input
          type="text"
          placeholder="Type here"
          className="input outline-none bg-transparent ring-0 w-full"
        />
        <div className="join">
          <button className="btn join-item">
            <CiImageOn />
          </button>
          <button className="btn join-item">
            <MdKeyboardVoice />
          </button>
          <button className="btn join-item">😂</button>
        </div>
        <button className="btn btn-outline ">
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
}

export default ContentMessage;
