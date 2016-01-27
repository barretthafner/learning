console.log("Connected!");

// .click(function)
// for creating click event listeners
$("h1").click(function() {
  console.log("h1 clicked!");
});

//$(this) is the jquery version of this
$("button").click(function() {
  var text = $(this).text();
  console.log("You clicked " + text);
});

$("button:first-of-type").click(function() {
  $(this).css("background", "pink");
});

//.keypress(function)
//good SO post:
// http://stackoverflow.com/questions/12827408/whats-the-theory-behind-jquery-keypress-keydown-keyup-black-magic-on-macs
$("input[type='text']").keypress(function(event) {
  //"Enter" is keycode 13
  if(event.which === 13){
    $(this).val("");
  }
});

// .on("type", function)
// similar to addEventListener in js
// lots of type options - click, dblclick, dragstart, keypress, mouseover, mouseleave

// IMPORTANT!!!
// click() only adds listeners for existing elements
// on() adds listeners for all potential future elements

$("h1").on("click", function() {
  $(this).css("color", "purple");
});

$("input").on("keypress", function() {
  console.log("Keypressed!");
})

$("button").on("mouseover", function() {
  // console.log("Mouse Enter");
  $(this).css("font-weight", "bold");
});

$("button").on("mouseleave", function() {
  // console.log("Mouse Enter");
  $(this).css("font-weight", "normal");
});
