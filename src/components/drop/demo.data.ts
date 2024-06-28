import { getUUid } from "@/helper";

export const cols_demo = [
  {
    id: getUUid(),
    name: "Col1",
    tasks: [
      {
        id: getUUid(),
        name: "Task1",
      },
      {
        id: getUUid(),
        name: "Task2",
      },
      {
        id: getUUid(),
        name: "Task3",
      },
    ],
  },
  {
    id: getUUid(),
    name: "Col2",
    tasks: [
      {
        id: getUUid(),
        name: "Task4",
      },
      {
        id: getUUid(),
        name: "Task5",
      },
    ],
  },
  {
    id: getUUid(),
    name: "Col3",
    tasks: [],
  },
  {
    id: getUUid(),
    name: "Col4",
    tasks: [],
  },
  {
    id: getUUid(),
    name: "Col5",
    tasks: [],
  },
];
