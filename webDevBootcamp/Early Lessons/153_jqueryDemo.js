
//$("").text();
//selects all of the text content of that element including children
//.text("Add this Text");
//changes text of element
$("li:first-of-type").text("Changed with jQuery");

//$("").html();
//gets the inner html of the element
//.html("<p>Add this.</p>");
//replaces html with new html
$("li:nth-of-type(3)").html("<strong>STRONG TAGGGG!</strong>");

//if you are letting the user input something treat it as text and not html or they might throw in some javascript on you

//.attr()
//get the attribute of the first element in a set of matched elements
$('img').css("width", "200px");
$('img:first-of-type').attr("src", "https://c1.staticflickr.com/3/2418/2243463214_f32ab004af_b.jpg");

$("input").attr("type", "color");
// $("input").attr("type", "text");


// .last()
// returns the last element from a given selector
$("img").last().attr("src", "https://s-media-cache-ak0.pinimg.com/736x/65/4e/de/654ede67e2f5ac547c7c6c9c1b10f1ae.jpg");

// .val()
// returns the values of inputs selected
// adding input changes the value of the input
document.querySelector("button").addEventListener("click", function(){
  console.log($("input").val());
  $("input").val("#000000");
  console.log($("select").val());
});

// .addClass - adds a class
// .removeClass - removes a class
// .toggleClass - toggles a class
$("h1").addClass("correct");
$("h1").removeClass("correct");
$("li").toggleClass("done");
$("strong").toggleClass("wrong");
//$("strong").toggleClass("done");
