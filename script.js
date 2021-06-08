var untitledListCount = -1;
var newListItemsCount = 0;
let elementId;
let taskId;
let presentTask;
let taskCount = 0;
let stepCount = 0;
let listElements = new Array();
let presentElement;
let important;
(function init() { 
  let myDay = { element: "My Day",
              icon: "far fa-sun",
              id: "my-day",
              tasks: new Array()
            };
important = { element: "Important",
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
listElements = [myDay, important, planned, assignedToYou, tasks];
  for (var i = 0; i < listElements.length; i++) {
      var listElement = listElements[i];
    createListElement(listElement);
  }
presentElement = listElements[4];
displayCenter(presentElement);
})();


function createListElement(listElement) {
  var list = document.getElementById("left-details");
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
      displayCenter(presentElement);
    }
  }
}
function displayCenter(currentElement) {
  document.getElementById("heading").innerHTML = currentElement.element;
  displayTasks(currentElement.tasks);
  displayLines(currentElement.tasks.length);
}
let impIconCount = 0;
let taskIconCount = 0;

function addTask() {
    taskCount++;
    taskIconCount++;
    impIconCount++;
    let newTask = { taskName: document.getElementById("add-task").value,
                    steps: new Array(),
                    id: "task-" + taskCount,
                    completed: "no",
                    important: "no",
                    taskIconId: "task-icon-" + taskIconCount,
                    importantIconId: "important-icon-"+impIconCount
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

function displayTasks(tasks) {
  let taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    var taskItem = document.createElement("li");
    taskItem.setAttribute("class", "task-element");
    taskItem.setAttribute("id", tasks[i].id);
    let taskIcon = document.createElement("i");
    taskIcon.setAttribute("id", tasks[i].taskIconId);
    if (tasks[i].completed == "yes") {
      taskIcon.setAttribute("class", "fas fa-check-circle");
    } else {
      taskIcon.setAttribute("class", "far fa-circle");
    }
    let taskContent = document.createElement("span");
    taskContent.innerHTML = tasks[i].taskName;
    let importantIcon = document.createElement("i");
    importantIcon.setAttribute("id", tasks[i].importantIconId);
    if (tasks[i].important == "yes") {
      importantIcon.setAttribute("class", "fas fa-star important-checked");
    } else {
      importantIcon.setAttribute("class", "far fa-star");
    }
    taskItem.appendChild(taskIcon);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(importantIcon)
    taskList.appendChild(taskItem);
  }
}

function displayLines(numberOfTasks) {
  let taskList = document.getElementById("task-list");
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
    document.getElementById("add-task-icon").setAttribute("class", "far fa-circle");
  } else {
    document.getElementById("add-button").setAttribute("class", "remove-add");
    document.getElementById("add-task-icon").setAttribute("class", "fas fa-plus");
  }
}
document.getElementById("task-list").addEventListener("click", showSteps);
let rightDiv = document.getElementById("right-div");

function showSteps(event) {
  let elementId = event.target.id;
  for (let i = 0; i < presentElement.tasks.length; i++) {
    presentTask = presentElement.tasks[i];
    if (elementId == presentTask.taskIconId) {
      presentTask.completed = "yes";
      document.getElementById(elementId).setAttribute("class", "fas fa-check-circle");
      document.getElementById(presentTask.taskName + "check-icon").setAttribute("class", "fas fa-check-circle");
    } else if (elementId == presentElement.tasks[i].importantIconId) {
      document.getElementById(elementId).setAttribute("class", "fas fa-star important-checked");
      important.tasks.push(presentTask);
      document.getElementById(presentTask.taskName + "important-icon").setAttribute("class", "fas fa-star important-checked");
      presentTask.important = "yes";
    } else if (elementId == presentElement.tasks[i].id) {
      centerDiv.setAttribute("class", "center-div half-width");
      rightDiv.style.display = "inline-block";
      taskId = elementId;
      presentTask = presentElement.tasks[i];
      let headElement = document.getElementById("steps-header");
      headElement.innerHTML = "";
      var headerIcon = document.createElement("i");
      headerIcon.setAttribute("id", presentTask.taskName + "check-icon");
      if (presentTask.completed == "yes") {
        headerIcon.setAttribute("class", "fas fa-check-circle");
      } else {
        headerIcon.setAttribute("class", "far fa-circle");
      }
      var taskHeader = document.createElement("h4");
      taskHeader.setAttribute("id", "task-heading");
      let importantIcon = document.createElement("i");
      importantIcon.setAttribute("id", presentTask.taskName + "important-icon");
      if (presentTask.important == "yes") {
        importantIcon.setAttribute("class", "fas fa-star important-checked");
      } else {
        importantIcon.setAttribute("class", "far fa-star");
      }
      headElement.appendChild(headerIcon);
      headElement.appendChild(taskHeader);
      headElement.appendChild(importantIcon);
      var taskHead = document.getElementById("task-heading");
      taskHead.innerHTML = presentTask.taskName;
      displaySteps(presentTask.steps);
    }
  }
  
}

function displaySteps(steps) {
  let stepList = document.getElementById("steps-list");
  stepList.innerHTML = "";
  for (let i = 0; i < steps.length; i++) {
    let stepItem = document.createElement("li");
    stepItem.setAttribute("class", "step-element");
    let stepIcon = document.createElement("i");
    stepIcon.setAttribute("class", "far fa-circle");
    let stepContent = document.createElement("div");
    stepContent.setAttribute("class", "step-content")
    stepContent.innerHTML = steps[i];
    stepItem.appendChild(stepIcon);
    stepItem.appendChild(stepContent);
    stepList.appendChild(stepItem);
  }
}
function addStep() {
  stepCount++;
  let newStep = document.getElementById("add-step").value;
  presentTask.steps.push(newStep);
  displaySteps(presentTask.steps);
}
function newStep(event) {
  if (13 == event.keyCode) {
    addStep();
  }
}

var taskStep = document.getElementById("add-step");
taskStep.addEventListener("input", displayAddOption2);
function displayAddOption2() {
  if (taskStep.value != "") {
    document.getElementById("add-step-button").setAttribute("class", "show-add");
    document.getElementById("add-step-icon").setAttribute("class", "far fa-circle");
  } else {
    document.getElementById("add-step-button").setAttribute("class", "remove-add");
    document.getElementById("add-step-icon").setAttribute("class", "fas fa-plus");
  }
}
document.addEventListener("click", imp);
function imp(event) {
  if(event.target.id == "imp-icon-1") {
    document.getElementById(event.target.id).setAttribute("class", "fas fa-star");
  }
}