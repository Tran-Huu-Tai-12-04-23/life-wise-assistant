import { ColumnDTO } from "@/dto/column.dto";
import { UserDTO } from "@/dto/user.dto";
import { getUUid } from "@/helper";

export const users: UserDTO[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&s",
  },
];

export const exampleColumnsData: ColumnDTO[] = [
  {
    id: getUUid(),
    name: "To Do",
    tasks: [
      {
        id: getUUid(),
        name: "Task 1",
        description: "Description of Task 1",
        status: "PENDING",
        priority: "LOW",
        lstMember: [users[0]],
      },
      {
        id: getUUid(),
        name: "Task 2",
        priority: "HIGH",
        description: "Description of Task 2",
        status: "PENDING",
        lstMember: [users[1]],
      },
    ],
  },
  {
    id: getUUid(),
    name: "In Progress",
    tasks: [
      {
        id: getUUid(),
        priority: "HIGH",
        name: "Task 3",
        description: "Description of Task 3",
        status: "IN_PROGRESS",
        lstMember: [users[0], users[1]],
      },
      {
        id: getUUid(),
        priority: "NORMAL",
        name: "Task 4",
        description: "Description of Task 4",
        status: "IN_PROGRESS",
        lstMember: [users[1]],
      },
    ],
  },
  {
    id: getUUid(),
    name: "Completed",
    tasks: [
      {
        id: getUUid(),
        priority: "HIGH",
        name: "Task 5",
        description: "Description of Task 5",
        status: "COMPLETED",
        lstMember: [users[1], users[1]],
      },
      {
        id: getUUid(),
        name: "Task 6",
        priority: "HIGH",
        description: "Description of Task 6",
        status: "COMPLETED",
        lstMember: [users[0]],
      },
    ],
  },
  {
    id: getUUid(),
    name: "Postponed",
    tasks: [],
  },
  {
    id: "5",
    name: "Canceled",
    tasks: [],
  },
  {
    id: "6",
    name: "Blocked",
    tasks: [],
  },
];

export const exampleTask = [
  {
    id: getUUid(),
    name: "Task 1",
    description: "Description of Task 1",
    status: "PENDING",
    priority: "LOW",
    lstMember: [users[0]],
  },
  {
    id: getUUid(),
    name: "Task 2",
    priority: "HIGH",
    description: "Description of Task 2",
    status: "PENDING",
    lstMember: [users[1]],
  },
  {
    id: getUUid(),
    priority: "HIGH",
    name: "Task 5",
    description: "Description of Task 5",
    status: "COMPLETED",
    lstMember: [users[1], users[1]],
  },
  {
    id: getUUid(),
    name: "Task 6",
    priority: "HIGH",
    description: "Description of Task 6",
    status: "COMPLETED",
    lstMember: [users[0]],
  },
];

export default exampleColumnsData;
