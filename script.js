let untitledListCount = 0;
let categoryId;
let presentTask;
let taskCount = 0;
let importantIconCount = 0;
let taskIconCount = 0;
let categories = new Array();
let isAddTaskClicked = false;
let dummy;

document.getElementById("category-list").addEventListener("click", showTasks);
document.getElementById("add-button").addEventListener("click", createTask);
document.getElementById("task-input").addEventListener("input", displayAddOption);
document.getElementById("task-list").addEventListener("click", handleTaskClick);
document.getElementById("add-step-button").addEventListener("click", createStep)
document.getElementById("step-input").addEventListener("input", displayAddOption);

categories = [createCategoryObject("My Day", "far fa-sun", "my-day"), 
                  createCategoryObject("Important", "far fa-star", "important"), 
                  createCategoryObject("Planned", "far fa-calendar-alt", "planned"), 
                  createCategoryObject("Assigned to you", "far fa-user", "assigned-to-you"), 
                  createCategoryObject("Tasks", "fas fa-home", "tasks")];

/*
 * Create and returns a category object
 */
function createCategoryObject(name, iconClass, elementId) {
  return { element: name,
           icon: iconClass,
           id: elementId,
           tasks: new Array()
         }
}

function init() {
  categories.forEach( (category) =>  {
    addCategory(category);
  });
  categoryId = categories[4].id;
  displayTaskList(categories[4]);
  highlightCurrentCategory(categoryId, categoryId);
}

/*
 * Highights the current category
 */
function highlightCurrentCategory(categoryId, previousCategoryId) {
  document.getElementById(previousCategoryId).setAttribute("class", "list-element");
  document.getElementById(categoryId).setAttribute("class", "list-element current-element");
}

/*
 * Creates a new category object
 */
function createCategory(event) {
  if (13 === event.keyCode) {
    let newListItem = document.getElementById("category-input").value;
    untitledListCount++;
    if ("" === newListItem) {
      newListItem = "Untitled list (" + untitledListCount + ")";
    }
    let addedItem = createCategoryObject(newListItem, "fas fa-list-ul",
        "added-list-item-" + untitledListCount);
    categories.push(addedItem);
    addCategory(addedItem);
    let previousCategoryId = categoryId;
    categoryId = addedItem.id;
    highlightCurrentCategory(categoryId, previousCategoryId);
    displayTaskList(addedItem);
    document.getElementById("category-input").value = "";
  }
}

/*
 * Creates a list element for the category and appends it to the Category list
 */
function addCategory(currentCategory) {
  let list = document.getElementById("category-list");
  let listItem = createNewElement("Li", "list-element", currentCategory.id);
  let listIcon = createNewElement("i", currentCategory.icon, "");
  let listText = createNewElement("div", "category-content", "");
  let count = createNewElement("span", "task-count", currentCategory.id + "-task-count")
  listText.innerHTML = currentCategory.element;
  list.appendChild(listItem).append(listIcon, listText, count);
}

/*
 * Shows the list of tasks
 */
function showTasks(event) {
  
  let elementId = event.target.id;
  categories.forEach( (category) => {
    if (elementId === category.id) {
      let previousCategoryId = categoryId;
      categoryId = elementId;
      document.getElementById("tasks-container").setAttribute("class", "tasks-container full-width");
      document.getElementById("steps-container").style.display = "none";
      highlightCurrentCategory(categoryId, previousCategoryId);
      displayTaskList(category);
    }
  });
}

/*
 * Creates the task list and a empty list in the tasks field
 */
function displayTaskList(currentCategory) {
  document.getElementById("tasks-heading").innerHTML = currentCategory.element;
  displayTasks(currentCategory.tasks);
  displayLines(currentCategory.tasks.length);
}

/*
 * Creates a list element and appends it to the Tasks list of the current category
 */
function displayTasks(tasks) {
  let importantIcon;
  let taskIcon;
  let taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach( (currentTask) => {
    let taskItem = createNewElement("li", "task-element", currentTask.id);
    let taskContent = createNewElement("div", "task-content", currentTask.id + "-content");
    if (true === currentTask.completed) {
      taskIcon = createNewElement("i", "fas fa-check-circle", currentTask.taskIconId);
      taskContent.innerHTML = currentTask.taskName.strike();
    } else {
      taskIcon = createNewElement("i", "far fa-circle", currentTask.taskIconId);
      taskContent.innerHTML = currentTask.taskName;
    }
    if (true === currentTask.important) {
      importantIcon = createNewElement("i", "fas fa-star important-checked", currentTask.importantIconId);
    } else {
      importantIcon = createNewElement("i", "far fa-star", currentTask.importantIconId);
    }
    taskList.appendChild(taskItem).append(taskIcon, taskContent, importantIcon);
  })
}

/*
 * Creates a empty list element  and appends it to the tasks list
 */
function displayLines(numberOfTasks) {
  let taskList = document.getElementById("task-list");
  if (numberOfTasks < 10) {
    let additionalLines = 10 - numberOfTasks;
    for (let i = 0; i < additionalLines; i++) {
      let taskItem = createNewElement("li", "empty-element", "");
      taskList.appendChild(taskItem);
    }
  }
}

/*
 * Creates a new task and adds the task to the current category
 */
function createTask(event) {
  if (13 === event.keyCode || event.target.id === "add-button") {
    document.getElementById("add-button").setAttribute("class", "hide-add-button");
    document.getElementById("add-task-icon").setAttribute("class", "fas fa-plus");
    let inputValue = document.getElementById("task-input").value;
    if ("" != inputValue) {
      let newTask = getTaskObject(inputValue);
      let currentCategory = getCategory(categoryId);
      currentCategory.tasks.unshift(newTask);
      if (categoryId != "tasks") {
        categories[4].tasks.unshift(newTask);
        document.getElementById("tasks-task-count").innerHTML = getIncompleteTaskCount(categories[4].tasks);
      }
      displayTaskList(currentCategory);
      document.getElementById(currentCategory.id + "-task-count").innerHTML = getIncompleteTaskCount(currentCategory.tasks);
    }
    
    document.getElementById("task-input").value = "";
    isAddTaskClicked = false;
  }
}

/*
 * Creates and returns a task object
 */
function getTaskObject(name) {
  taskCount++;
  taskIconCount++;
  importantIconCount++;
  let isImportant = false;
  if (categoryId === "important") {
    isImportant = true;
  }
  return { taskName: name,
           steps: new Array(),
           id: "task-" + taskCount,
           completed: false,
           important: isImportant,
           taskIconId: "task-icon-" + taskIconCount,
           importantIconId: "important-icon-"+importantIconCount,
           stepHeadIcon: "task-" + taskCount + "-check-icon",
           stepImportantIcon: "task-" + taskCount + "-important-icon"
         }
} 

/*
 * Detects which elemeent is clicked (completeed icon, important icon, or task element)
 * and decides which operation to be performed
 */
function handleTaskClick(event) {
  let currentCategory = getCategory(categoryId);
  let elementId = event.target.id;
  for (let i = 0; i < currentCategory.tasks.length; i++) {
    presentTask = currentCategory.tasks[i];
    if (elementId === presentTask.taskIconId || elementId === presentTask.stepHeadIcon) {
      displayStepsContainer(presentTask);
      if (presentTask.completed) {
        markComplete(presentTask, "far fa-circle", presentTask.taskName, false);
      } else {
        markComplete(presentTask, "fas fa-check-circle", presentTask.taskName.strike(), true);
      }
    } else if (elementId === presentTask.importantIconId || elementId === presentTask.stepImportantIcon) {
        displayStepsContainer(presentTask);
        if (presentTask.important) {
          for (let j = 0; j < categories[1].tasks.length; j++) {
            if (elementId === categories[1].tasks[j].importantIconId 
                  || elementId === categories[1].tasks[j].stepImportantIcon) {
              categories[1].tasks.splice(j, 1);
            }
          }
          displayTaskList(getCategory(categoryId));
          markImportant(presentTask, "far fa-star", false, getIncompleteTaskCount(categories[1].tasks));
        } else {
          categories[1].tasks.push(presentTask);
          markImportant(presentTask, "fas fa-star important-checked", true, getIncompleteTaskCount(categories[1].tasks));
        }
    } else if (elementId === presentTask.id) {
      document.getElementById("tasks-container").setAttribute("class", "tasks-container half-width");
      document.getElementById("steps-container").style.display = "inline-block";
      displayStepsContainer(presentTask);
    }
  }
}

/*
 * Marks the task as important/non-important
 */
function markImportant(currentTask, className, isImportant, importantTaskCount) {
  currentTask.important = isImportant;
  document.getElementById("important-task-count").innerHTML = importantTaskCount;
  document.getElementById(currentTask.importantIconId).setAttribute("class", className);
  document.getElementById(currentTask.stepImportantIcon).setAttribute("class", className);
}

/*
 * Marks the task as comleted/incomplete
 */
function markComplete(currentTask, className, taskName, isCompleted) {
    let currentCategory = getCategory(categoryId);
    currentTask.completed = isCompleted;
    document.getElementById(currentTask.taskIconId).setAttribute("class", className);
    document.getElementById(currentTask.id + "-content").innerHTML = taskName;  
    document.getElementById(currentTask.stepHeadIcon).setAttribute("class", className);
    document.getElementById(currentTask.id + "-heading").innerHTML = taskName;
    document.getElementById(currentCategory.id + "-task-count").innerHTML = getIncompleteTaskCount(currentCategory.tasks);
    document.getElementById(categories[4].id + "-task-count").innerHTML = getIncompleteTaskCount(categories[4].tasks);
}

/*
 * Displays the steps container
 */
function displayStepsContainer(currentTask) {
  let importantIcon;
  let headerIcon;
  let headElement = document.getElementById("steps-header");
  headElement.innerHTML = "";
  let taskHeader = createNewElement("h4", "task-heading", currentTask.id + "-heading");
  if (currentTask.completed === true) {
    headerIcon = createNewElement("i", "fas fa-check-circle", currentTask.stepHeadIcon);
    taskHeader.innerHTML = currentTask.taskName.strike();
  } else {
    headerIcon = createNewElement("i", "far fa-circle", currentTask.stepHeadIcon);
    taskHeader.innerHTML = currentTask.taskName;
  }
  if (currentTask.important === true) {
    importantIcon = createNewElement("i", "fas fa-star important-checked", currentTask.stepImportantIcon);
  } else {
    importantIcon = createNewElement("i", "far fa-star", currentTask.stepImportantIcon);
  }
  headerIcon.setAttribute("onclick", "handleTaskClick(event)");
  importantIcon.setAttribute("onclick", "handleTaskClick(event)");
  headElement.append(headerIcon, taskHeader, importantIcon);
  displaySteps(currentTask.steps);
}

/*
 * Adds a new step to the current task
 */
function createStep(event) {
  if (13 === event.keyCode || event.target.id == "add-step-button") {
    document.getElementById("add-step-button").setAttribute("class", "hide-add-button");
    document.getElementById("add-step-icon").setAttribute("class", "fas fa-plus");
    let newStep = document.getElementById("step-input").value;
    if (newStep != "") {
      presentTask.steps.push(newStep);
      displaySteps(presentTask.steps);
    }
    document.getElementById("step-input").value = "";
  }
}

/*
 * Creates a list element and appends it to the steps list
 */
function displaySteps(steps) {
  let stepList = document.getElementById("steps-list");
  stepList.innerHTML = "";
  steps.forEach ( (step) => {
    let stepItem = createNewElement("li", "step-element", "");
    let stepIcon = createNewElement("i", "far fa-circle", "");
    let stepContent = createNewElement("div", "step-content", "")
    stepContent.innerHTML = step;
    stepList.appendChild(stepItem).append(stepIcon, stepContent);
  })
}

function displayAddOption(event) {
  if (event.target.id === "task-input") {
    setAddButtonProperty("task-input", "add-button", "add-task-icon", "display-add-button  add-task-button",
         "hide-add-button  add-task-button");
  } else if (event.target.id === "step-input") {
    setAddButtonProperty("step-input", "add-step-button", "add-step-icon", "display-add-button  add-step-button", 
         "hide-add-button  add-step-button");
  }
}

function setAddButtonProperty(inputId, addButtonId, addTaskIcon, displayAddClass, hideAddClass) {
  if (document.getElementById(inputId).value === "") {
    document.getElementById(addButtonId).setAttribute("class", hideAddClass);
    document.getElementById(addTaskIcon).setAttribute("class", "fas fa-plus");
  } else {
    document.getElementById(addButtonId).setAttribute("class", displayAddClass);
    document.getElementById(addTaskIcon).setAttribute("class", "far fa-circle",);
  }
}

/*
 * Returns the present category
 */
function getCategory(idOfCategory) {
  for (let i = 0; i < categories.length; i++) {
    if (idOfCategory === categories[i].id) {
      return categories[i];
    }
  }
}

/*
 * Creates and returns a new HTML element
 */
createNewElement = (element, className, id) => {
  let createdElement = document.createElement(element);
  createdElement.setAttribute("class", className);
  if ("" != id) {
    createdElement.setAttribute("id", id);
  }
  return createdElement;
}

function getIncompleteTaskCount(tasks) {
  let count = 0;
  tasks.forEach( (task) => {
    if (task.completed === false) {
      count++;
    }
  });
  return count;
}

init();
