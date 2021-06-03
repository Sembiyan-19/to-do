var untitledListCount = -1;
const listElements = ["My Day", "Important", "Planned", "Assigned to you", "Tasks"];
const listIcons = ["far fa-sun", "far fa-star", "far fa-calendar-alt", "far fa-user", "fas fa-home"];
var list = document.getElementById("left-details");
for (var i = 0; i < listElements.length; i++) {
    var listItem = document.createElement("Li");
    listItem.setAttribute("class", "list-element");
    var listIcon = document.createElement("i");
    listIcon.setAttribute("class", listIcons[i]);
    listItem.appendChild(listIcon);
    var listText = document.createElement("span");
    listItem.appendChild(listText);
    listText.innerHTML = listElements[i];
    list.appendChild(listItem);
} 

function newListElement(event) {
  var key = event.keyCode;
  if (13 == key) {
    var listItem = document.createElement("Li");
    listItem.setAttribute("class", "list-element");
    var listIcon = document.createElement("i");
    listIcon.setAttribute("class", "fas fa-list-ul");
    listItem.appendChild(listIcon);
    var listText = document.createElement("span");
    listItem.appendChild(listText);
    var newListItem = document.getElementById("add-element").value;
    if ("" == newListItem) {
      untitledListCount++;
      listText.innerHTML = "Untitled list (" + untitledListCount + ")";
    } else {
      listText.innerHTML = newListItem;
    }
    list.appendChild(listItem);
  }
}
