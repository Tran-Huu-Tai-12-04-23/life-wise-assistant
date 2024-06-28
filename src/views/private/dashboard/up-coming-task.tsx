import { exampleTask } from "../task/dumy";
import TaskListItem from "@/components/drop/TaskListItem";

function UpComingTask() {
  return (
    <div className="flex flex-col h-full ">
      <h5 className="font-bold text-xl mt-auto">Upcoming Tasks</h5>
      <div className="flex flex-col gap-4 mt-5 justify-end mt-2">
        {exampleTask.map((item) => (
          <TaskListItem data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default UpComingTask;
