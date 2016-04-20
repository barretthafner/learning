//        Program requirements:
//
//        Requires the user to answer a number of questions >= 5,
//        Questions are answered one at a time (prevent skipping)
//        Give the user a way to answer
//        Compare the answer to the correct answer
//        When all questions are answered display score




// Attach quiz function to jQuery.fn object
$.fn.quiz = function (options) {

  // define default configurations
  // can we move this out of the this.each???????
  var config = {
    templateSelector:         null,
    quizSeed:                 null,
    titleSelector:            '.quiz-title',
    answeringViewSelector:    '.quiz-answering-view',
    questionSelector:         '.quiz-question',
    answerBoxSelector:        '.quiz-answer-box',
    answerSelector:           '.quiz-answer',
    submitSelector:           '.quiz-submit',
    questionCounterSelector:  '.quiz-question-counter',
    completeViewSelector:     '.quiz-complete-view',
    scoreSelector:            '.quiz-final-score',
    finalMessageSlector:      '.quiz-final-message',
    newQuizSelector:          '.quiz-new'
  };

  $.extend(config, options);

  //if no quizSeed was passed throw and error
  if(!config.quizSeed) {
    throw 'No Quiz Seed!';
  }

  var seed = config.quizSeed;

  //  For each jQuery object -------------------------------------------------------------------

  // this === jQuery object that contains an array of html elements
  return this.each(function() {

    // this === an html elment returned from this.each above
    // uses jQuery to access the element and then applies it to a local variable $container
    var $container = $(this);

    var questionNumber;
//    var selected;
    var score;

    //apply template if one exists
    if (config.templateSelector) {
      $container.html($(config.templateSelector).html());
    }


    initQuiz();


    // add click listener to each answer individualy
    $container.find(config.answerSelector).on("click", function() {
      setSelected($(this).attr('data-answer'));
    });


    $container.find(config.submitSelector).on("click", function() {
      if(checkAnswer()) {
        questionNumber++;
        buildQuestion(questionNumber);
      }
    });

    $container.find(config.newQuizSelector).on("click", function() {
      initQuiz();
    })




//  Private functions -------------------------------------------------------------------

    function initQuiz() {

      // reset state variables
      questionNumber = 0;
//      selected = [false, false, false, false];
      score = 0;
      // inject beginning
      $container.find(config.titleSelector).text(seed.title);
      buildQuestion(questionNumber);

      $container.find(config.completeViewSelector).hide();
      $container.find(config.answeringViewSelector).show();
    }


    function buildQuestion(index) {
      //if no more questions finish game
      if (index >= seed.questions.length) {
        finishGame();
        return;
      }
      // clear selected
//      setSelected(-1);

      // write question
      $container.find(config.questionSelector).text(seed.questions[index].question);

      // write answers
      seed.questions[index].answers.forEach(function(item, index) {

        $container.find("[data-answer='" + index + "']").text(item);
      })

      // set question counter
      $container.find(config.questionCounterSelector).text("Question: " + (questionNumber + 1)  + " / " + seed.questions.length );
    }

//    function setSelected(index) {
//
//      // clear selected
//      selected = [false, false, false, false];
//      selected.forEach(function(value, index) {
//        $container.find("[data-answer='" + index + "']").removeClass("selected");
//      });
//
//      // add selected
//      if (index >=0 || index <=3 ) {
//        selected[index] = true;
//        $container.find("[data-answer='" + index + "']").addClass("selected");
//      }
//    }

    function checkAnswer() {
      var answer = [];

      // get answer selected
      selected.forEach(function(item, index) {
        if (item) {
          answer.push(index);
        }
      });

      // if only one answer
      if (answer.length === 1){
        // if correct answer increment score
        if (answer[0] === seed.questions[questionNumber].correctAnswer) {
          score++;
        }
        console.log(score);

        // return true
        return true;
      }
      //if no answer (or more than one) selected return false
      return false;
    }

    function finishGame() {

      var message = "";
      switch (score) {
        case 0:
          message = "Jesus, George, it was a wonder I was ever born.";
          break;
        case 1:
          message = "That's heavy man...";
          break;
        case 2:
          message = "Hmmm, better check your flux-capacitor.";
          break;
        case 3:
          message = "Where we are going, we don't need roads.";
          break;
        case 4:
          message = "Great Scott!";
          break;
        case 5:
          message = "1.21 GIGAWATTS!!!";
          break;
        default:
          message = "What the hell is a gigawatt?!?"
      }

      $container.find(config.scoreSelector).text("Your score: " + score + " of " + seed.questions.length);
      $container.find(config.finalMessageSlector).text(message);
      $container.find(config.answeringViewSelector).hide();
      $container.find(config.completeViewSelector).show();
    }


  }); // this.each
}; // $.fn.quiz


