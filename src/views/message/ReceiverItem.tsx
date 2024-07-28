import Avatar from "@/components/UI/Avatar";
import { IGroupChat } from "@/dto/chat.dto";
import { useChatAction } from "@/redux/features/chat/action";

function ReceiverItem({ data }: { data: IGroupChat }) {
  const { onChangeCurrentGroupChat } = useChatAction();
  return (
    <div
      onClick={() => onChangeCurrentGroupChat(data)}
      className="w-full scale-animation border-b flex flex-col gap-2 p-2 hover:bg-primary/5 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        {data?.isSingleChat && (
          <div className="justify-start items-center flex gap-2">
            <Avatar isStatus isOnline={true} url={data?.receiver?.avatar} />
            <h1 className="font-bold text-sm">
              {data?.receiver?.userDetail
                ? data?.receiver?.userDetail?.fullName
                : data?.receiver?.username}
            </h1>
          </div>
        )}

        {/* <h1 className=" text-sm text-primary/50">2 days ago</h1> */}
      </div>
      {/* <h1 className=" text-sm text-primary/50 truncate">
        Den nha tao chua may
      </h1> */}
    </div>
  );
}

export default ReceiverItem;
