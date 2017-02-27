
// create secretNumber
var secretNumber = 4;

//ask user for guess
var stringGuess = undefined;
var guess = undefined;
var done = false;

//check if guess is right

while (!done) {

	stringGuess = prompt("Guess a number");
	guess = Number(stringGuess);

	if (guess === secretNumber){
		alert("YOU GOT IT RIGHT!");
		done = true;
	}

	else if (guess < secretNumber){
		alert("TOO LOW! Guess Again");
	}

	else {
		alert("TOO HIGH! Guess Again!");
	}
}