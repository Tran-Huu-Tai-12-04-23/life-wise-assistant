import { IoChatboxEllipsesSharp } from "react-icons/io5";

function EmptyChat() {
  return (
    <div
      style={{
        width: "calc( 100% - 18rem )",
      }}
      className="h-full center flex-col min-h-32 gap-4"
    >
      <div className="p-4 rounded-full bg-primary/10">
        <IoChatboxEllipsesSharp size={32} />
      </div>
      <h4>Start new conversation</h4>
    </div>
  );
}

export default EmptyChat;
