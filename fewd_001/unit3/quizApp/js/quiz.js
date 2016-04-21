//        Program requirements:
//
//        Requires the user to answer a number of questions >= 5,
//        Questions are answered one at a time (prevent skipping)
//        Give the user a way to answer
//        Compare the answer to the correct answer
//        When all questions are answered display score




// Attach quiz function to jQuery.fn object
$.fn.quiz = function (options) {

  //if no quizSeed was passed throw and error
  if(!options || !options.quizSeed) {
    throw 'No Quiz Seed!';
  }

  //  For each jQuery object -------------------------------------------------------------------

  // var quiz = new Quiz(document.getElementById('quiz'), {
  //    // config
  //  })
  //
  //quiz.finishGame();

  // this === jQuery object that contains an array of html elements
  return this.each(function () {
    new Quiz(this, options);
  }); // this.each
}; // $.fn.quiz


function Quiz(el, options) {
  // define default configurations
  // can we move this out of the this.each???????

  $.extend(this.config, options);

  console.log(this);
  console.log(this.config);

  this.seed = this.config.quizSeed;

  // this === an html element returned from this.each above
  // uses jQuery to access the element and then applies it to a local variable $container
  this.$container = $(el);
  this.questionNumber = null;
  this.score = null;

  //apply template if one exists
  if (this.config.templateSelector) {
    this.$container.html($(this.config.templateSelector).html());
  }


  this.initQuiz();


  this.$container.find(this.config.submitSelector).on("click", function(event) {
    event.preventDefault();
    if(this.checkAnswer()) {
      this.questionNumber++;
      this.buildQuestion(this.questionNumber);
    }
  }.bind(this));

  this.$container.find(this.config.newQuizSelector).on("click", function() {
    this.initQuiz();
  }.bind(this));

  return this;
};

Quiz.prototype = {

  config: {
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
  },

  initQuiz: function () {
    // reset state variables
    this.questionNumber = 0;
    this.score = 0;
    // inject beginning
    this.$container.find(this.config.titleSelector).text(this.seed.title);
    this.buildQuestion(this.questionNumber);

    this.$container.find(this.config.completeViewSelector).hide();
    this.$container.find(this.config.answeringViewSelector).show();
  },

  checkAnswer: function () {

    // get answer selected
    var answer = this.$container.find('input[name=quiz-answers]:checked').val();

    // if there is an answer
    if (answer){
      if (Number(answer) === this.seed.questions[this.questionNumber].correctAnswer) {
        this.score++;
      }
      // return true
      return true;
    }

    //if no answer (or more than one) selected return false
    return false;
  },

  buildQuestion: function (index) {
    //if no more questions finish game
    if (index >= this.seed.questions.length) {
      this.finishGame();
      return;
    }

    // clear checked
    this.$container.find("input:radio").attr("checked", false);


    // write question
    this.$container.find(this.config.questionSelector).text(this.seed.questions[index].question);

    // write answers
    this.seed.questions[index].answers.forEach(function(item, index) {
      this.$container.find("[data-answer='" + index + "']").text(item);
    }.bind(this));

    // set question counter
    this.$container.find(this.config.questionCounterSelector).text("Question: " + (this.questionNumber + 1)  + " / " + this.seed.questions.length );
  },

  finishGame: function () {

    var message = "";
    switch (this.score) {
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

    this.$container.find(this.config.scoreSelector).text("Your score: " + this.score + " of " + this.seed.questions.length);
    this.$container.find(this.config.finalMessageSlector).text(message);
    this.$container.find(this.config.answeringViewSelector).hide();
    this.$container.find(this.config.completeViewSelector).show();
  }

};
