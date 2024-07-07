import Badge from "@/components/UI/Badge";
import { getUUid } from "@/helper";
import { FaBell } from "react-icons/fa";

interface NotificationDTO {
  id: string;
  title: string;
  description: string;
  notifyAt: Date;
  isRead: boolean;
}
const notification: { [key: string]: NotificationDTO[] } = {
  Today: [
    {
      id: getUUid(),
      title: "Notification 1",
      description: "Notification 1 description ....",
      notifyAt: new Date(),
      isRead: false,
    },
    {
      id: getUUid(),
      title: "Notification 2",
      description: "Notification 2 description ....",
      notifyAt: new Date(),
      isRead: true,
    },
  ],
  Yesterday: [
    {
      id: getUUid(),
      title: "Notification 5",
      description: "Notification 5 description ....",
      notifyAt: new Date(),
      isRead: true,
    },
    {
      id: getUUid(),
      title: "Notification 6",
      description: "Notification 6 description ....",
      notifyAt: new Date(),
      isRead: false,
    },
    {
      id: getUUid(),
      title: "Notification 5",
      description: "Notification 5 description ....",
      notifyAt: new Date(),
      isRead: true,
    },
    {
      id: getUUid(),
      title: "Notification 6",
      description: "Notification 6 description ....",
      notifyAt: new Date(),
      isRead: false,
    },
    {
      id: getUUid(),
      title: "Notification 5",
      description: "Notification 5 description ....",
      notifyAt: new Date(),
      isRead: true,
    },
    {
      id: getUUid(),
      title: "Notification 6",
      description: "Notification 6 description ....",
      notifyAt: new Date(),
      isRead: false,
    },
  ],
};
function Notification() {
  return (
    <div className="dropdown dropdown-left dropdown-bottom">
      <div tabIndex={10000} role="button">
        <Badge
          name={notification.Today.filter(
            (item) => !item.isRead
          ).length.toString()}
        >
          <FaBell className="text-primary" size={24} />
        </Badge>
      </div>
      <ul
        tabIndex={10000}
        className="dropdown-content bg-base-300 pt-4 flex flex-col  backdrop-blur-3xl menu z-[100000000] rounded-box min-w-[25rem] p-0 m-0   shadow-2xl"
      >
        {Object.keys(notification).map((key) => (
          <NotificationGroup data={notification[key]} key={key} name={key} />
        ))}

        <button className="btn btn-text">Watch all</button>
      </ul>
    </div>
  );
}

const NotificationGroup = ({
  data,
  name,
}: {
  data: NotificationDTO[];
  name: string;
}) => {
  return (
    <div className="flex-col flex">
      <div className="w-full  flex justify-between items-center">
        <div className="w-[44%] h-[1px] bg-primary/10" />
        <h6 className="text-sm font-thin text-primary/50">{name}</h6>
        <div className="w-[44%] h-[1px] bg-primary/10" />
      </div>
      {data.map((item: NotificationDTO) => (
        <NotificationItem data={item} key={item.id} />
      ))}
    </div>
  );
};

const NotificationItem = ({ data }: { data: NotificationDTO }) => {
  return (
    <div
      className={`border-l-[2px] hover:bg-primary/10  p-4 border-solid ${
        data?.isRead ? " border-transparent opacity-60" : "border-primary"
      } flex justify-between items-center`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <h3 className="font-bold text-">{data.title}</h3>
          <p className="text-sm ">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
