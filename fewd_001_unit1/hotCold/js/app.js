
$(document).ready(function(){

  /*--- Display information modal box ---*/
    $(".what").click(function(){
      $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });

    newGame();

});

// global
var correctValue;
var numGuesses;


// newGame

function newGame() {
  // is this right for 1 - 100??????
  correctValue = Math.floor(Math.random() * 100 + 1);
  console.log("New Game, CorrectValue: ", correctValue);
  numGuesses = 0;
  setFeedback("Make your Guess!");
  $("#guessButton").show();
  $("#userGuess").val("").focus();
}

function checkGuess(num) {
  var diff = Math.abs(correctValue - num);
  if ( diff >= 50 ) {
    return "Icy Cold!";
  } else if ( diff < 50 && diff >= 30) {
    return "Cold! BRRRR!";
  } else if ( diff < 30 && diff >= 20 ) {
    return "Getting warm!";
  } else if ( diff < 20 && diff >= 10 ) {
    return "Hotttt!";
  } else if (diff < 10 && diff >= 1 ) {
    return "Very Hot! Ouch!";
  } else if (diff === 0) {
    return "Bingo!";
  } else {
    throw new Error("Please input a number between 1 and 100.");
  }
}


function setFeedback(str) {
  $('#feedback').text(str);
}





//Game logic
$("#guessButton").on('click', function(event) {
  event.preventDefault();
  var guess = $("#userGuess").val();
//  console.log("Guess:", guess);
  var result = checkGuess(guess);
  console.log(result);
  setFeedback(result);
  $("#count").text(++numGuesses);
  if ( result === "Bingo!") {
    $("#guessButton").hide();
  }
});

//new game button
$(".new").on('click', function(event) {
  event.preventDefault();
  newGame();
});
