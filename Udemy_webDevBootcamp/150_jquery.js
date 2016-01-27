
//Returns list of all h1 tags
$("h1");

//Returns list of all li tags
$("li");

//returns list of all #fish id (list length = 1)
$("#fish")

$("a")
//or
$("li a")
//you get it

$("h1").css("color", "yellow");


var styles = {
  color: "red",
  background: "pink",
  border: "2px solid purple"
}

$("h1").css(styles);

$("li").css("color", "blue");

//without jQuery
var lis = document.querySelectorAll("li");
for (var i = 0; i < lis.length; i++) {
  lis[i].style.color = "green";
}

$("a").css("font-size", "40px");

$("li").css({
  fontSize: "10px",
  border: "3px dashed purple",
  background: "rgba(89, 45, 20, 0.5)"
});
