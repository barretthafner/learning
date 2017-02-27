
//inputs
var p1Button = document.querySelector("#p1Button");
var p2Button = document.querySelector("#p2Button");
var resetButton	= document.querySelector("#resetButton");
var scoreField = document.querySelector("#scoreField");

//spans
var p1ScoreSpan = document.querySelector("#p1ScoreSpan");
var p2ScoreSpan = document.querySelector("#p2ScoreSpan");
var topScoreSpan = document.querySelector("#topScoreSpan");

//state variables
var p1Score = 0;
var p2Score = 0;
var topScore = 0;
var playing = false;
var gameOver = false;

//initialization
setTopScore(5);



//listen for number change in scoreField
scoreField.addEventListener("change", function(){
	//set topScore
	topScore = Number(this.value);
	//if topScore is invalid set to 1
	if (topScore < 1 || false) {
		setTopScore(1);
	}
	//else update topScoreSpan
	else {
		topScoreSpan.textContent = topScore;
	}
});



// listen for click player one button
p1Button.addEventListener("click", function(){
	if (!playing){
		scoreField.disabled = true;
		playing = true;
	}

	if (gameOver) {
		p1Button.disabled = true;
		p2Button.disabled = true;
	}

	else {
		p1Score++;
		p1ScoreSpan.textContent = p1Score;
		if (p1Score === topScore) {
			p1ScoreSpan.classList.add("winner");
			gameOver = true;
		}
	}
});



// listen for click player two button
p2Button.addEventListener("click", function(){
	if (!playing) {
		scoreField.disabled = true;
		playing = true;
	}

	if (gameOver) {
		p1Button.disabled = true;
		p2Button.disabled = true;
	}

	else {
		p2Score++;
		p2ScoreSpan.textContent = p2Score;

		if (p2Score === topScore) {
			p2ScoreSpan.classList.add("winner");
			gameOver = true;
		}
	}
});




// listen for reset button click
resetButton.addEventListener("click", function() {
		//reset p1
	p1Score = 0;
	p1ScoreSpan.textContent = p1Score;
	p1ScoreSpan.classList.remove("winner");
	p1Button.disabled = false;
	
	//reset p2
	p2Score = 0;
	p2ScoreSpan.textContent = p2Score;
	p2ScoreSpan.classList.remove("winner");
	p2Button.disabled = false;
	
	//reset state
	playing = false;
	gameOver = false;
	scoreField.disabled = false;
});



function setTopScore(num) {
	topScore = num;
	scoreField.value = topScore;
	topScoreSpan.textContent = topScore;
}