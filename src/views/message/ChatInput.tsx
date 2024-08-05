import { useAuthState } from "@/redux/features/auth/authSlice";
import { useChatState } from "@/redux/features/chat/chatSlice";
import { MessageDTO, sendMessage } from "@/services/socketService";
import { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { MdKeyboardVoice } from "react-icons/md";

const ChatInput = ({ onInputFocus }: { onInputFocus: () => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatInputRef = useRef<any>(null);

  const [message, setMessage] = useState("");
  const { currentUser } = useAuthState();
  const { currentGroupChat } = useChatState();
  const handleSendMessage = () => {
    setMessage("");
    if (!currentUser || !currentGroupChat) return;
    const body: MessageDTO = {
      message,
      senderId: currentUser?.id,
      groupId: currentGroupChat?.id,
    };
    sendMessage(body);
  };

  useEffect(() => {
    if (chatInputRef && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [chatInputRef]);

  return (
    <div className="bg-content-primary/10 absolute right-0 center w-full h-[6rem] backdrop-blur-3xl bottom-0">
      <div className="flex gap-2 rounded-xl w-full border border-dashed border-primary/10 ml-2 mr-2 p-2 backdrop-blur-3xl shadow-3xl flex-nowrap">
        <input
          onFocus={onInputFocus}
          ref={chatInputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
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
        <button className="btn btn-outline " onClick={handleSendMessage}>
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
