/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/UI/Avatar";
import { CiImageOn } from "react-icons/ci";
import { MdKeyboardVoice } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";
import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import {
  subscribeToChat,
  sendMessage,
  connect,
  disconnect,
} from "@/services/socketService";

function ContentMessage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    connect();

    subscribeToChat((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

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
      {messages?.map((message, index) => (
        <ChatItem key={index} text={message} isClient />
      ))}
      <div className="flex gap-2 sticky rounded-xl border border-dashed border-primary/10 bottom-0 ml-6 mr-6 right-6 left-6 p-2 backdrop-blur-3xl shadow-3xl flex-nowrap">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
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
        <button className="btn btn-outline " onClick={handleSendMessage}>
          <BiSolidSend />
        </button>
      </div>
    </div>
  );
}

export default ContentMessage;
