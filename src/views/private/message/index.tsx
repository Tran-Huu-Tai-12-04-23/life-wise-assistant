import ContentMessage from "./ContentMessage";
import SideBarMessage from "./SideBarMessage";

function Message() {
  return (
    <div className="h-full flex w-full justify-between items-start">
      <SideBarMessage />
      <ContentMessage />
    </div>
  );
}

export default Message;
