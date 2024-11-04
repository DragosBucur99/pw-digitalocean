module.exports.testCases = [
  {
    title: "should add food",
    prerequisites: "none",
    steps: [
      "Click on the add food button",
      "Type the name of a valid food e.g. pizza",
      "Click on the add meal button",
    ],
    expectedOutput: "The food should be successfully added to the list.",
    options: [
      {
        name: "What food do you want to add?",
        type: "searchbox",
        label: "FOOD",
      },
      {
        name: "Amount (grams)",
        type: "number",
        label: "FOOD_AMOUNT",
      },
    ],
  },
  {
    title: "should edit food",
    prerequisites: "Have a valid food added to the list.",
    steps: [
      "Click on the menu button",
      "Click on the Edit menu button",
      "Select food you wish to edit",
      "Change the value default weight value",
      "Click on the EDIT button to confirm the action",
    ],
    expectedOutput: "The values for weight and nutrients should be updated.",
    options: [
      {
        name: "What food do you want to add?",
        type: "searchbox",
        label: "FOOD",
      },
      {
        name: "Amount (grams)",
        type: "number",
        label: "FOOD_AMOUNT",
      },
      {
        name: "New amount (grams)",
        type: "number",
        label: "NEW_FOOD_AMOUNT",
      },
    ],
  },
  {
    title: "should delete food",
    prerequisites: "Have a valid food added to the list.",
    steps: [
      "Click on the menu button",
      "Click on the Delete menu button",
      "Select food you wish to delete",
      "Click on the DELETE button to confirm the action",
    ],
    expectedOutput: "The food should be removed from the list.",
    options: [
      {
        name: "What food do you want to add?",
        type: "searchbox",
        label: "FOOD",
      },
      {
        name: "Amount (grams)",
        type: "number",
        label: "FOOD_AMOUNT",
      },
    ],
  },
  {
    title: "should create task",
    prerequisites: "none",
    steps: [
      "Click on CREATE TASK button",
      "Pick a due date",
      "Write a task name e.g. test",
      "Choose the priorty level of the task",
      "Click on Create to-do",
    ],
    expectedOutput: "The task should be correctly added to the list.",
    options: [
      {
        name: "Name of the task",
        type: "searchbox",
        label: "TASK_NAME",
      },
      {
        name: "Task due date",
        type: "date",
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
  {
    title: "should mark task as done",
    prerequisites: "Have a valid task added to the list.",
    steps: ["Click on the done button"],
    expectedOutput:
      "Should mark task as done and the remaining tasks should be 0.",
    options: [
      {
        name: "Name of the task",
        type: "searchbox",
        label: "TASK_NAME",
      },
      {
        name: "Task due date",
        type: "date",
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
  {
    title: "should delete task",
    prerequisites: "Have a valid task added to the list.",
    steps: ["Click on the task's trash icon"],
    expectedOutput: "Task should be removed from the list.",
    options: [
      {
        name: "Name of the task",
        type: "searchbox",
        label: "TASK_NAME",
      },
      {
        name: "Task due date",
        type: "date",
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
