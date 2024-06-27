import Avatar from "@/components/UI/Avatar";

function MessageUser() {
  return (
    <div className="w-full border-b flex flex-col gap-2 p-2 hover:bg-primary/5 cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="justify-start items-center flex gap-2">
          <Avatar
            isStatus
            isOnline={true}
            url="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
          />
          <h1 className="font-bold text-sm">Simla huu taio</h1>
        </div>
        <h1 className=" text-sm text-primary/50">2 days ago</h1>
      </div>
      <h1 className=" text-sm text-primary/50 truncate">
        Den nha tao chua may
      </h1>
    </div>
  );
}

export default MessageUser;
