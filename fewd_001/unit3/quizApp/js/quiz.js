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
    this.initQuiz();



    //apply template if one exists
    if (config.templateSelector) {
      var template = $(config.templateSelector).html();
      $container.html(template);
    }

    // inject begining state
    $container.find(config.titleSelector).text(seed.title);
    $container.find(config.submitSelector).text("Submit Answer");
    buildQuestion(questionNumber);


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



  }); // this.each

//  Private functions -------------------------------------------------------------------

  this.prototype.initQuiz = function() {
    var questionNumber = 0;
    var selected = [false, false, false, false];
    var score = 0;

  }


  function buildQuestion(index) {
    //if no more questions finish game
    if (index >= seed.questions.length) {

      finishGame();
      return;
    }
    // clear selected
    setSelected(-1);

    // write question
    $container.find(config.questionSelector).text(seed.questions[index].question);

    // write answers
    seed.questions[index].answers.forEach(function(item, index) {
      $container.find("[data-answer='" + index + "']").text(item);
    })

    // set question counter
    $container.find(config.questionCounterSelector).text("Question: " + (questionNumber + 1)  + " / " + seed.questions.length );
  }

  function setSelected(index) {

    // clear selected
    selected = [false, false, false, false];
    selected.forEach(function(value, index) {
      $container.find("[data-answer='" + index + "']").removeClass("selected");
    });

    // add selected
    if (index >=0 || index <=3 ) {
      selected[index] = true;
      $container.find("[data-answer='" + index + "']").addClass("selected");
    }
  }

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

    $container.find(".finishScore").text(score);

    $container.find(".quiz-answering-view").hide();
    $container.find(".quiz-complete-view").show();
  }


}; // $.fn.quiz


