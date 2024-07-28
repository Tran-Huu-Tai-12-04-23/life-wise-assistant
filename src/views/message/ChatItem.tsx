import { IMessage } from "@/dto/chat.dto";
import moment from "moment";

function ChatItem({ data }: { data: IMessage }) {
  return (
    <>
      {!data?.isSender && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={data.owner.avatar}
              />
            </div>
          </div>
          <div className="chat-header">
            {/* {data.owner.username} */}
            <time className="text-xs opacity-50">
              {moment(data.createdAt).format("HH:mm DD/MM/YYYY")}
            </time>
          </div>
          <div className="chat-bubble ">{data.content}</div>
          <div className="chat-footer opacity-50">
            Seen at {moment(data.createdAt).format("HH:mm DD/MM/YYYY")}
          </div>
        </div>
      )}

      {data?.isSender && (
        <div className="chat chat-end p-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={data.owner.avatar}
              />
            </div>
          </div>
          <div className="chat-header">
            {/* {data.owner.username} */}
            <time className="text-xs opacity-50">
              {moment(data.createdAt).format("HH:mm DD/MM/YYYY")}
            </time>
          </div>
          <div className="chat-bubble bg-blue-500">{data.content}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      )}
    </>
  );
}

export default ChatItem;
