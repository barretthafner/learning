// 140_colorGame.js
// alert("connected");





var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay")
var h1 = document.querySelector("h1");

var colors = generateRandomColorArray(squares.length);

var pickedColor = pickRandomSquare();
colorDisplay.textContent = pickedColor;

for (var i = 0; i < squares.length; i++) {
	//add colors to squares
	squares[i].style.background = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//get cliked color
		var clickedColor = this.style.background;
		
		//compare clickedColor to pickedColor
		// console.log(clickedColor+" "+pickedColor)
		if(clickedColor == pickedColor){
			messageDisplay.textContent = "Correct";
			changeAllToColor(clickedColor);
			h1.style.background = clickedColor;

		} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again"
		}
	});

}

function changeAllToColor(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	};
}

function pickRandomSquare() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColorArray(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		//push a random color into the array
		arr.push(generateRandomColor());
	};
	//return array of num length
	return arr;
}

function generateRandomColor() {
		//pick a red from 0 - 255
		var r = Math.floor(Math.random() * 256);
		//pick a green from 0 - 255
		var g = Math.floor(Math.random() * 256);
		//pick a blue from 0 - 255
		var b = Math.floor(Math.random() * 256);
		return "rgb("+ r +", "+ g +", "+ b +")";
}