import { Helper } from "@/helper";
import { IoCalendarClearOutline } from "react-icons/io5";

function UpComingTask() {
  return (
    <div className="flex flex-col h-full ">
      <h5 className="font-bold text-xl mt-auto">Upcoming Tasks</h5>
      <div className="flex flex-col gap-2 justify-end mt-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Item key={item} />
        ))}
      </div>
    </div>
  );
}

const Item = () => {
  return (
    <div className="border-primary/5 hover:bg-primary/5 cursor-pointer border-[1px] border-solid rounded-md p-2">
      <div className="flex justify-start items-center gap-2">
        <IoCalendarClearOutline />
        <h4 className="text-md">{Helper.formatDate(new Date())}</h4>
      </div>
      <h5 className="text-sm font-bold">Achieve more together</h5>
    </div>
  );
};

export default UpComingTask;
