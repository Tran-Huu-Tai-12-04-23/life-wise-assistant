function LstChatItemSkeleton() {
  return (
    <div className="w-full gap-4 flex flex-col p-2">
      {[...Array(12)].map((_, index) => (
        <ChatItemSkeleton key={index} />
      ))}
    </div>
  );
}

const ChatItemSkeleton = () => {
  return (
    <div className="flex w-full min-w-[16rem] justify-between gap-4">
      <div className="skeleton h-12 w-12 rounded-full"></div>
      <div className="flex flex-col gap-2 w-52">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-8 w-full"></div>
      </div>
    </div>
  );
};
export default LstChatItemSkeleton;
