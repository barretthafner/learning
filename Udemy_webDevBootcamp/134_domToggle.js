
var button = document.querySelector("button");

var body = document.querySelector("body");
var isWhite = true;


// button.addEventListener("click", function() {
// 	document.body.style.background = "purple";
// });


button.addEventListener("click", toggleBG);


function toggleBG() {
	if (isWhite === true) {
		body.classList.toggle("pinkBG");
		isWhite = false;
	}

	else {
		body.classList.toggle("pinkBG");
		body.classList.toggle("greenBG");
	}
}

