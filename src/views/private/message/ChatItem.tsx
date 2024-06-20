function ChatItem({
  isOwner,
  isClient,
  text,
}: {
  isOwner?: boolean;
  isClient?: boolean;
  text: string;
}) {
  return (
    <>
      {isOwner && (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">{text}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      )}

      {isClient && (
        <div className="chat chat-start p-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{text}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      )}
    </>
  );
}

export default ChatItem;
