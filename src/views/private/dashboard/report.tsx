import { useState } from "react";

interface ReportItem {
  name: string;
  count: number;
}

interface Report {
  [key: string]: ReportItem;
}

function Report() {
  const [report] = useState<Report>({
    totalTasks: {
      name: "totalTasks",
      count: 1820,
    },
    dueTasks: {
      name: "dueTasks",
      count: 650,
    },
    inProgressTask: {
      name: "In progress tasks",
      count: 250,
    },
    cancelTask: {
      name: "Cancel task",
      count: 920,
    },
    assignedTask: {
      name: "Assigned task",
      count: 120,
    },
  });
  return (
    <div className="bg-primary/10 p-4 backdrop-blur-lg w-full rounded-md flex justify-around items-center">
      {Object.keys(report).map((key) => {
        const item = report[key as keyof Report];
        return (
          <div className="flex flex-col justify-center items-center" key={key}>
            <h6 className="text-primary/50">{item.name}</h6>
            <h6 className="text-primary text-2xl font-bold">{item.count}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default Report;
