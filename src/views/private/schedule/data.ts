import { getUUid } from "@/helper";

const dayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const getTask = (index: number) => {
  const status = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
    "TOASSIGN",
    "CANCELED",
  ];

  return {
    id: getUUid(),
    name: `Task ${index + 1}`,
    description: `Description of Task ${index + 1}`,
    status: status[Math.ceil((Math.random() * 10) % 4)],
    priority: "LOW",
    lstMember: [],
    startTime: new Date(
      new Date(new Date().setHours(4 + index)).setMinutes(index * 30)
    ),
    endTime: new Date(
      new Date(new Date().setHours(7 + index)).setMinutes(index + 1 * 30)
    ),
  };
};
const getTaskFrom = (index: number, number: number) => {
  return Array.from({ length: number - index }, (_, i) => getTask(index + i));
};

const dummyDataTaskOfDay = {
  "8:00 AM": getTaskFrom(0, 2),
  "11:00 AM": getTaskFrom(3, 4),
  "13:00 PM": getTaskFrom(5, 9),
  "17:00 PM": getTaskFrom(12, 15),
  "19:00 PM": getTaskFrom(15, 17),
  "22:00 PM": getTaskFrom(17, 22),
};

export { dayOfWeek, dummyDataTaskOfDay };
