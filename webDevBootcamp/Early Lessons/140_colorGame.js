// 140_colorGame.js
// alert("connected");




//select DOM objects
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay")
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");

//initialize colors and select first random color
var hardMode = true;
var colors;
var pickedColor;
var playing;
generateNewGame(hardMode);

// resetButton click listener
resetButton.addEventListener("click", function(){
	h1.style.background = "steelblue";
	this.textContent = "New Colors";
	messageDisplay.textContent = "";
	easyButton.disabled = false;
	hardButton.disabled = false;
	generateNewGame(hardMode);
});

//easyButton click listener
easyButton.addEventListener("click", function() {
	if(hardMode) {
		this.classList.add("selected");
		hardButton.classList.remove("selected");
		hardMode = false;
		generateNewGame(hardMode);
	}
});

//hardButton click listener
hardButton.addEventListener("click", function() {
	if (!hardMode) {
		this.classList.add("selected");
		easyButton.classList.remove("selected");
		hardMode = true;
		generateNewGame(hardMode);
	}
});

//add click listeners to squares
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function(){
		if(!playing) {
			easyButton.disabled = true;
			hardButton.disabled = true;
			playing = true;
		}
		var clickedColor = this.style.background;
		if(clickedColor == pickedColor){
			messageDisplay.textContent = "CORRECT!";
			changeAllToColor(clickedColor);
			resetButton.textContent = "Play Again?"
			easyButton.disabled = false;
			hardButton.disabled = false;
		} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again"
		}
	});

}


//generate a new game
function generateNewGame(isHard) {
	playing = false;
	if (isHard){
		colors = generateRandomColorArray(squares.length);
		pickedColor = pickRandomSquare(squares.length);
		colorDisplay.textContent = pickedColor;
		for (var i = 0; i < squares.length; i++) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		}
	} else {
		colors = generateRandomColorArray(3);
		pickedColor = pickRandomSquare(3);
		colorDisplay.textContent = pickedColor;
		for (var i = 0; i < squares.length; i++) {
			if (colors[i]){
				squares[i].style.background = colors[i];
			}	else {
				squares[i].style.display = "none";
			}//if-else
		}//for
	}//if-else
} //function

function changeAllToColor(color){
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
		h1.style.background = color;
	}
}

function pickRandomSquare(num) {
	var random = Math.floor(Math.random() * num);
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
