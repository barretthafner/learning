//jQuery Exercise.js

//select all divs and set background to purple
$("div").css("background", "purple");
//select divs with class highlight, set width to 200px
$("div.highlight").css("width", "200px");
//select div with id third and give orange border
$("#third").css("border", "orange solid 1px")
//select 1st div and set color to pink, not very jQuery-y
$("div")[0].style.color = "pink";
//or
$("div:first-of-type").css("color", "pink");
//or, but slower b/c it's a jQuery shortcut
$("div:first").css("color", "pink");
