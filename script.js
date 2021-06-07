var untitledListCount = -1;
var newListItemsCount = 0;
let elementId;
let taskId;
let presentElement;
let presentTask;
let taskCount = 0;
let myDay = { element: "My Day",
              icon: "far fa-sun",
              id: "my-day",
              tasks: new Array()
            };
let important = { element: "Important",
                  icon: "far fa-star",
                  id: "important",
                  tasks: new Array()
                };
let planned = { element: "Planned",
                icon: "far fa-calendar-alt",
                id: "planned",
                tasks: new Array()
              };
let assignedToYou = { element: "Assigned to you",
                      icon: "far fa-user",
                      id: "assigned-to-you",
                      tasks: new Array()
                    };
let tasks = { element: "Tasks",
              icon: "fas fa-home",
              id: "tasks",
              tasks: new Array()
            };
let listElements = [myDay, important, planned, assignedToYou, tasks];
var list = document.getElementById("left-details");
for (var i = 0; i < listElements.length; i++) {
    var listElement = listElements[i];
    createListElement(listElement);
} 
function createListElement(listElement) {
  var listItem = document.createElement("Li");
  listItem.setAttribute("class", "list-element");
  listItem.setAttribute("id", listElement.id);
  var listIcon = document.createElement("i");
  listIcon.setAttribute("class", listElement.icon);
  listItem.appendChild(listIcon);
  var listText = document.createElement("span");
  listItem.appendChild(listText);
  listText.innerHTML = listElement.element;
  list.appendChild(listItem);
}

function newListElement(event) {
  if (13 == event.keyCode) {
    var newListItem = document.getElementById("add-element").value;
    if ("" == newListItem) {
      untitledListCount++;
      newListItem = "Untitled list (" + untitledListCount + ")";
    }
    newListItemsCount++;
    var addedItem = { element: newListItem,
                        icon: "fas fa-list-ul",
                        id: "added-list-item-" + newListItemsCount,
                        tasks: new Array()
                      };
    listElements.push(addedItem);
    createListElement(addedItem);
  }
}
var centerDiv = document.getElementById("center-div");
document.getElementById("left-details").addEventListener("click", showTasks); 
function showTasks(event) {
  elementId = event.target.id;
  centerDiv.setAttribute("class", "center-div full-width");
  for (var i = 0; i < listElements.length; i++) {
    if (elementId == listElements[i].id) {
      presentElement = listElements[i];
      document.getElementById("heading").innerHTML = presentElement.element;
      displayTasks(presentElement.tasks);
      displayLines(presentElement.tasks.length);
    }
  }
}
function addTask() {
    taskCount++;
    let newTask = { taskName: document.getElementById("add-task").value,
                    steps: new Array(),
                    id: "task-" + taskCount
                  }
    presentElement.tasks.unshift(newTask);
    displayTasks(presentElement.tasks);
    displayLines(presentElement.tasks.length);
}
function newTask(event) {
  if (13 == event.keyCode) {
    addTask();
  }
}
let taskList = document.getElementById("task-list");
function displayTasks(tasks) {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    var taskItem = document.createElement("li");
    taskItem.setAttribute("class", "task-element");
    taskItem.setAttribute("id", tasks[i].id)
    taskItem.innerHTML = tasks[i].taskName;
    taskList.appendChild(taskItem);
  }
}

function displayLines(numberOfTasks) {
  if (numberOfTasks < 9) {
    let additionalLines = 9 - numberOfTasks;
    for (let i = 0; i < additionalLines; i++) {
      var taskItem = document.createElement("li");
      taskItem.setAttribute("class", "empty-element");
      taskList.appendChild(taskItem);
    }
  }
}

var taskInupt = document.getElementById("add-task");
taskInupt.addEventListener("input", displayAddOption);
document.getElementById("add-button").addEventListener("click", addTask)
function displayAddOption() {
  if (taskInupt.value != "") {
    document.getElementById("add-button").setAttribute("class", "show-add");
  } else {
    document.getElementById("add-button").setAttribute("class", "remove-add");
  }
}

taskList.addEventListener("click", showSteps);
let rightDiv = document.getElementById("right-div");
function showSteps(event) {
  centerDiv.setAttribute("class", "center-div half-width");
  rightDiv.style.display = "inline-block";
  taskId = event.target.id;
  for (let i = 0; i < presentElement.tasks.length; i++) {
    if (taskId == presentElement.tasks[i].id) {
      presentTask = presentElement.tasks[i];
      document.getElementById("task-heading").innerHTML = presentTask.taskName;
      displaySteps(presentTask.steps);
    }
  }
}
let stepList = document.getElementById("step-list");
function displaySteps(steps) {
  stepList.innerHTML = "";
  for (let i = 0; i < steps.length; i++) {
    let stepItem = document.createElement("li");
    stepItem.innerHTML = steps[i];
    stepList.appendChild(stepItem);
  }
}
