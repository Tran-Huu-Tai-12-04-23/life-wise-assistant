import { useEffect, useRef, useState } from "react";
import { dummyDataTaskOfDay } from "./data";
import TaskListItem from "@/components/drop/TaskListItem";
import { TaskDTO } from "@/dto/task.dto";

function MainSchedule() {
  const [currentTime] = useState(new Date().getHours());
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to current time + 0.5 hours when refContainer is available
    if (refContainer.current) {
      refContainer.current.scrollTo({
        left: (currentTime + 0.5) * 175, // Adjust as per your layout needs
        top: 0,
        behavior: "smooth", // Optional: Smooth scroll
      });
    }
  }, [refContainer, currentTime]);

  return (
    <div className="grid grid-cols-2 gap-10 p-4 pt-0">
      {Object.keys(dummyDataTaskOfDay).map((key, index) => (
        <LstTaskOfTime
          key={key}
          data={dummyDataTaskOfDay[key as keyof unknown]}
          name={key}
          isHasLine={index < Object.keys(dummyDataTaskOfDay).length - 2}
        />
      ))}
    </div>
  );
}

// LstTaskOfTime component
const LstTaskOfTime = ({
  data,
  name,
  isHasLine,
}: {
  data: never[];
  name: string;
  isHasLine: boolean;
}) => {
  return (
    <div className="flex justify-start items-start gap-10 w-full relative">
      <div className="flex mt-6 min-w-[5rem] justify-start items-center gap-2">
        <div className="p-[4px]  rounded-full bg-primary" />
        <h5 className="font-bold text-sm">{name}</h5>
      </div>

      <div
        style={{ borderColor: isHasLine ? "" : "transparent" }}
        className="h-full absolute top-14 left-1  p-[1px] rounded-full border-l-[1px] border-dashed border-primary"
      ></div>

      <div className="flex gap-4 flex-col">
        {data.map((task: TaskDTO) => (
          <TaskListItem key={task?.id} data={task} />
        ))}
      </div>
    </div>
  );
};

export default MainSchedule;
