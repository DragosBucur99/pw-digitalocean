module.exports.testCases = [
  {
    title: "should add food",
    steps: ["Visit", "Click", "Assert"],
    expectedOutput: "Should add food to list.",
    options: [
      {
        name: "What food do you want to add?",
        type: "searchbox",
        label: "FOOD",
      },
    ],
  },
  {
    title: "should create a task",
    steps: ["Visit", "Click", "Assert"],
    expectedOutput: "Should add task to list.",
    options: [
      {
        name: "Name of the task",
        type: "searchbox",
        label: "TASK_NAME",
      },
      {
        name: "Task due date",
        type: "searchbox",
        label: "TASK_DUE_DATE",
      },
      {
        name: "Task priority level",
        type: "dropdown",
        dropdownValues: ["Low", "Medium", "High"],
        label: "TASK_PRIORITY_LEVEL",
      },
    ],
  },
];
