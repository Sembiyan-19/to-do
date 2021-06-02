var a = -1;
document.getElementsByClassName("fa-plus")[0].onclick = function() {
    var i = document.createElement("Li");
    i.setAttribute("class", "list-element");
    var j = document.getElementById("add-element").value;
    if ("" == j) {
      a++;
      i.innerHTML = "untitled("+a+")";
    } else {
      i.innerHTML = j;
    }
    document.getElementById("left-details").appendChild(i);
}
var input = document.getElementById("add-element");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        
        document.getElementsByClassName("fa-plus")[0].click();
    }
});