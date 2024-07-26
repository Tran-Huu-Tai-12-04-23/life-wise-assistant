/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/UI/Avatar";
import {
  connect,
  disconnect,
  sendMessage,
  subscribeToChat,
} from "@/services/socketService";
import { useEffect, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { MdKeyboardVoice } from "react-icons/md";
import ChatItem from "./ChatItem";

function ContentMessage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    subscribeToChat((message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="w-3/4 relative h-full overflow-auto pb-0 bg-primary-content/10">
      <div className="w-full sticky top-0 z-10 backdrop-blur-3xl border-b h-[5rem] p-4 flex justify-start items-center">
        <Avatar
          isOnline={true}
          isStatus
          url="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
        />
        <h1 className="font-bold text-sm">Simla huu taio</h1>
      </div>
      {/* chat */}
      <div className="flex flex-col gap-2 h-[80%]">
        {messages?.map((message, index) => (
          <ChatItem key={index} text={message} isClient />
        ))}
      </div>

      <div className="bg-content-primary/10 shadow-xl center sticky w-full h-[6rem] backdrop-blur-3xl bottom-0">
        <div className="flex gap-2 rounded-xl w-full border border-dashed border-primary/10 ml-2 mr-2 p-2 backdrop-blur-3xl shadow-3xl flex-nowrap">
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
    </div>
  );
}

export default ContentMessage;
