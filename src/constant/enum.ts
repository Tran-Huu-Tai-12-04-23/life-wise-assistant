export const enumData = {
  taskStatus: {
    PENDING: {
      code: "PENDING",
      name: "Pending",
      color: "rgba(33, 224, 97, 1)",
      background: "rgba(33, 224, 97, 0.2)",
    },
    IN_PROGRESS: {
      code: "IN_PROGRESS",
      name: "In Progress",
      color: "rgba(255, 193, 7, 01)",
      background: "rgba(255, 193, 7, 0.2)",
    },
    COMPLETED: {
      code: "COMPLETED",
      name: "Completed",
      color: "rgba(66, 133, 244, 1)",
      background: "rgba(66, 133, 244, 0.2)",
    },
    TOASSIGN: {
      code: "TOASSIGN",
      name: "Postponed",
      color: "rgba(186, 104, 200,1)",
      background: "rgba(186, 104, 200, 0.2)",
    },
    CANCELED: {
      code: "CANCELED",
      name: "Canceled",
      color: "rgba(255, 61, 61, 01)",
      background: "rgba(255, 61, 61, 0.2)",
    },
    BLOCKED: {
      code: "BLOCKED",
      name: "Blocked",
      color: "rgba(128, 128, 128, 1)",
      background: "rgba(128, 128, 128, 0.2)",
    },
    NEEDS_REVIEW: {
      code: "NEEDS_REVIEW",
      name: "Needs Review",
      color: "rgba(244, 180, 0, 01)",
      background: "rgba(244, 180, 0, 0.2)",
    },
    WAITING: {
      code: "WAITING",
      name: "Waiting",
      color: "rgba(238, 130, 238, 01)",
      background: "rgba(238, 130, 238, 0.2)",
    },
  },
  priority: {
    HIGH: {
      name: "High",
      code: "HIGH",
      color: "rgba(255, 61, 61, 01)",
      background: "rgba(255, 61, 61, 0.2)",
    },
    NORMAL: {
      name: "Normal",
      code: "NORMAL",
      color: "rgba(244, 180, 0, 01)",
      background: "rgba(244, 180, 0, 0.2)",
    },
    LOW: {
      name: "Low",
      code: "LOW",
      color: "rgba(128, 128, 128, 1)",
      background: "rgba(128, 128, 128, 0.2)",
    },
  },
};

export const tags = ["Dev", "Backend", "Front-end", "DevOps", "DB", "Design"];
export const tagsColor = [
  {
    color: "rgba(33, 224, 97, 1)",
    background: "rgba(33, 224, 97, 0.2)",
  },
  {
    color: "rgba(255, 193, 7, 01)",
    background: "rgba(255, 193, 7, 0.2)",
  },
  {
    color: "rgba(66, 133, 244, 1)",
    background: "rgba(66, 133, 244, 0.2)",
  },
  {
    color: "rgba(186, 104, 200,1)",
    background: "rgba(186, 104, 200, 0.2)",
  },
  {
    color: "rgba(255, 61, 61, 01)",
    background: "rgba(255, 61, 61, 0.2)",
  },
  {
    color: "rgba(128, 128, 128, 1)",
    background: "rgba(128, 128, 128, 0.2)",
  },
];
