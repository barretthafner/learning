

// Attach quiz function to jQuery.fn object
$.fn.quiz = function (options) {

  // define default configurations
  // can we move this out of the this.each???????
  var config = {
    titleSelector:      '#quiz-title',
    questionSelector:   '#quiz-question',
    answerBoxSelector:  '.quiz-answer-box',
    answer1Selector:    '#quiz-answer1',
    answer2Selector:    '#quiz-answer2',
    answer3Selector:    '#quiz-answer3',
    answer4Selector:    '#quiz-answer4',
    submitSelector:     '#quiz-submit',
    templateSelector:   null

  };

  $.extend(config, options);

  //if no quizSeed was passed throw and error
  if(!config.quizSeed) {
    throw 'No Quiz Seed!';
  }

  var seed = config.quizSeed;

  //  For each jQuery object -------------------------------------------------------------------

  // this === jQuery object that contains an array of html elements
  this.each(function() {

    // this === an html elment returned from this.each above
    // uses jQuery to access the element and then applies it to a local variable $container
    var $container = $(this);
    var questionNumber = 0;
    var selected = [false, false, false, false];


    //apply template if one exists
    if (config.templateSelector) {
      var template = $(config.templateSelector).html();
      $container.html(template);
    }

    // inject begining state
    $container.find(config.titleSelector).text(seed.title);
    $container.find(config.submitSelector).text("Submit Answer");
    buildQuestion(0);



    $container.find(config.answer1Selector).on("click", function() {
      setSelected(0);
    });
    $container.find(config.answer2Selector).on("click", function() {
      setSelected(1);
    });
    $container.find(config.answer3Selector).on("click", function() {
      setSelected(2);
    });
    $container.find(config.answer4Selector).on("click", function() {
      setSelected(3);
    });




//  Private functions -------------------------------------------------------------------
    function buildQuestion(index) {
      //if no more questions finish game
      if (index >= seed.questions.length) {

        //is this right????????
        finishGame();
        return;
      }
      // clear selected
      setSelected(-1);

      //write question
      $container.find(config.questionSelector).text(seed.questions[index].question);

      seed.questions[index].answers.forEach(function(item, index) {
        var selector = "answer" + (index + 1) + "Selector";
        $container.find(config[selector]).find("p").text(item);
      })
    }

    function setSelected(index) {

      // clear selected
      selected = [false, false, false, false];
      selected.forEach(function(value, index) {
        var selector = "answer" + (index + 1) + "Selector";
        $container.find(config[selector]).removeClass("selected");
      });

      // add selected
      if (index >=0 || index <=3 ) {
        selected[index] = true;
        $container.find(config["answer" + (index + 1) + "Selector"]).addClass("selected");
      }

    }


  }); // this.each
}; // $.fn.quiz


