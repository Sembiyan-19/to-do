var untitledListCount = 0;
let presentElement;
let presentTask;
let taskCount = 0;
let importantIconCount = 0;
let taskIconCount = 0;
let listElements = new Array();
let important;
let tasksHead;

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
tasksHead = { element: "Tasks",
              icon: "fas fa-home",
              id: "tasks",
              tasks: new Array()
            };
listElements = [myDay, important, planned, assignedToYou, tasksHead];
  for (var i = 0; i < listElements.length; i++) {
      var listElement = listElements[i];
    createListElement(listElement);
  }
presentElement = listElements[4];
displayTaskList(presentElement);
})();

function newListElement(event) {
  if (13 == event.keyCode) {
    var newListItem = document.getElementById("input-element").value;
    if ("" == newListItem) {
      untitledListCount++;
      newListItem = "Untitled list (" + untitledListCount + ")";
    }
    var addedItem = { element: newListItem,
                        icon: "fas fa-list-ul",
                        id: "added-list-item-" + untitledListCount,
                        tasks: new Array()
                      };
    listElements.push(addedItem);
    createListElement(addedItem);
  }
}

function createListElement(listElement) {
  var list = document.getElementById("elements-list");
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

let centerDiv = document.getElementById("center-div");
document.getElementById("elements-list").addEventListener("click", showTasks);

function showTasks(event) {
  let elementId = event.target.id;
  centerDiv.setAttribute("class", "center-div full-width");
  for (var i = 0; i < listElements.length; i++) {
    if (elementId == listElements[i].id) {
      presentElement = listElements[i];
      displayTaskList(presentElement);
    }
  }
}

function displayTaskList(currentElement) {
  document.getElementById("heading").innerHTML = currentElement.element;
  displayTasks(currentElement.tasks);
  displayLines(currentElement.tasks.length);
}

function newTask(event) {
  if (13 == event.keyCode) {
    addTask();
  }
}

function addTask() {
  document.getElementById("add-button").setAttribute("class", "hide-add-button");
    let inputValue = document.getElementById("task-input").value;
    if ("" != inputValue) {
      taskCount++;
      taskIconCount++;
      importantIconCount++;
      let importantElement = "no"
      if (presentElement.id == "important") {
        importantElement = "yes";
      }
      let newTask = { taskName: inputValue,
                      steps: new Array(),
                      id: "task-" + taskCount,
                      completed: "no",
                      important: importantElement,
                      taskIconId: "task-icon-" + taskIconCount,
                      importantIconId: "important-icon-"+importantIconCount
                    }
      presentElement.tasks.unshift(newTask);
      if (presentElement.id != "tasks") {
        tasksHead.tasks.unshift(newTask);
      }
      displayTasks(presentElement.tasks);
      displayLines(presentElement.tasks.length);
    }
    document.getElementById("task-input").value = "";
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
    let taskContent = document.createElement("span");
    taskContent.setAttribute("id", tasks[i].id + "-content");
    if (tasks[i].completed == "yes") {
      taskIcon.setAttribute("class", "fas fa-check-circle");
      taskContent.innerHTML = tasks[i].taskName.strike();
    } else {
      taskIcon.setAttribute("class", "far fa-circle");
      taskContent.innerHTML = tasks[i].taskName;
    }
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

var taskInupt = document.getElementById("task-input");
taskInupt.addEventListener("input", displayAddOption);
document.getElementById("add-button").addEventListener("click", addTask);

function displayAddOption() {
  if (taskInupt.value != "") {
    document.getElementById("add-button").setAttribute("class", "display-add-button");
    document.getElementById("add-task-icon").setAttribute("class", "far fa-circle");
  } else {
    document.getElementById("add-button").setAttribute("class", "hide-add-button");
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
      markComplete(presentTask, elementId);
    } else if (elementId == presentElement.tasks[i].importantIconId) {
      markImportant(presentTask, elementId, i);
    } else if (elementId == presentElement.tasks[i].id) {
      displayStepsContainer(presentTask);
    }
  }
}

function markComplete(currentTask, elementId) {
  if ("no" == currentTask.completed) {
    currentTask.completed = "yes";
    document.getElementById(elementId).setAttribute("class", "fas fa-check-circle");
    document.getElementById(currentTask.id + "-content").innerHTML = currentTask.taskName.strike();
    document.getElementById(currentTask.id + "-check-icon").setAttribute("class", "fas fa-check-circle");
    document.getElementById(currentTask.id + "-heading").innerHTML = currentTask.taskName.strike();
  } else if ("yes" == currentTask.completed) {
    currentTask.completed = "no";
    document.getElementById(elementId).setAttribute("class", "far fa-circle");
    document.getElementById(currentTask.id + "-content").innerHTML = currentTask.taskName;
    document.getElementById(currentTask.id + "-check-icon").setAttribute("class", "far fa-circle");
    document.getElementById(currentTask.id + "-heading").innerHTML = currentTask.taskName;
  }
}

function markImportant(currentTask, elementId, index) {
  if ("no" == currentTask.important) {
    currentTask.important = "yes"
    document.getElementById(elementId).setAttribute("class", "fas fa-star important-checked");
    important.tasks.push(currentTask);
    document.getElementById(currentTask.id + "-important-icon").setAttribute("class", "fas fa-star important-checked");
  } else if ("yes" == currentTask.important) {
    currentTask.important = "no"
    document.getElementById(elementId).setAttribute("class", "far fa-star");
    important.tasks.splice(index, 1);
    displayTaskList(presentElement);
    document.getElementById(currentTask.id + "-important-icon").setAttribute("class", "far fa-star");
  }
}

function displayStepsContainer(currentTask) {
  centerDiv.setAttribute("class", "center-div half-width");
  rightDiv.style.display = "inline-block";
  let headElement = document.getElementById("steps-header");
  headElement.innerHTML = "";
  var headerIcon = document.createElement("i");
  headerIcon.setAttribute("id", currentTask.id + "-check-icon");
  let taskHeader = document.createElement("h4");
  taskHeader.setAttribute("id", currentTask.id + "-heading");
  taskHeader.setAttribute("class", "task-heading");
  if (currentTask.completed == "yes") {
    headerIcon.setAttribute("class", "fas fa-check-circle");
    taskHeader.innerHTML = currentTask.taskName.strike();
  } else {
    headerIcon.setAttribute("class", "far fa-circle");
    taskHeader.innerHTML = currentTask.taskName;
  }
  let importantIcon = document.createElement("i");
  importantIcon.setAttribute("id", currentTask.id + "-important-icon");
  if (currentTask.important == "yes") {
    importantIcon.setAttribute("class", "fas fa-star important-checked");
  } else {
    importantIcon.setAttribute("class", "far fa-star");
  }
  headElement.appendChild(headerIcon);
  headElement.appendChild(taskHeader);
  headElement.appendChild(importantIcon);
  displaySteps(currentTask.steps);
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

document.getElementById("add-step-button").addEventListener("click", addStep)

function newStep(event) {
  if (13 == event.keyCode) {
    addStep();
  }
}

function addStep() {
  document.getElementById("add-step-button").setAttribute("class", "hide-add-button");
  let newStep = document.getElementById("step-input").value;
  if (newStep != "") {
    presentTask.steps.push(newStep);
    displaySteps(presentTask.steps);
  }
  document.getElementById("step-input").value = "";
}

var taskStep = document.getElementById("step-input");
taskStep.addEventListener("input", displayStepAddOption);

function displayStepAddOption() {
  if (taskStep.value != "") {
    document.getElementById("add-step-button").setAttribute("class", "display-add-button");
    document.getElementById("add-step-icon").setAttribute("class", "far fa-circle");
  } else {
    document.getElementById("add-step-button").setAttribute("class", "hide-add-button");
    document.getElementById("add-step-icon").setAttribute("class", "fas fa-plus");
  }
}

