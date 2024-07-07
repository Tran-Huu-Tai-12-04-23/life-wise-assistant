import { TbCalendarClock } from "react-icons/tb";
import { FaCommentAlt } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
const notifySettings = [
  {
    name: "Reminder",
    icon: <TbCalendarClock />,
    description: "Notification for u when u have a reminder",
  },
  {
    name: "Comments",
    icon: <PiTextTBold />,
    description: "Comments for u when u have a reminder",
  },
  {
    name: "Message",
    icon: <FaCommentAlt />,
    description: "Message for u when u have a reminder",
  },
];
function Notification() {
  return (
    <div className="p-4 w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2 justify-start ">
        {notifySettings.map((item, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center rounded-md h-[1px] bg-primary/5 p-2"
            style={{ flex: 1 }}
          >
            <div className="flex flex-col gap-2">
              <h6 className="text-sm">{item.name}</h6>
              <h6 className="text-sm text-primary/50">{item.description}</h6>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              defaultChecked
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-[44%] h-[1px] bg-primary/10" />
        <h6 className="text-sm font-thin text-primary/50">
          Notification setting
        </h6>
        <div className="w-[44%] h-[1px] bg-primary/10" />
      </div>
    </div>
  );
}

export default Notification;
