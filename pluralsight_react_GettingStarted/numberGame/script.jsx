
// StarsFrame class --------------------------------------------------------------
var StarsFrame = React.createClass({
  render: function() {
    
    // passed properties
    var numStars = this.props.numStars;
    
    // create stars array with numStars
    var stars = [];
    for (var i=0; i<numStars; i++) {
      var starKey = "star" + i;
      stars.push(
        <span key={starKey} className="glyphicon glyphicon-star"></span>
      );
    }
    
    // return #stars-frame div, containing stars array 
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
});

// ButtonFrame class --------------------------------------------------------------
var ButtonFrame = React.createClass({
  render: function() {
    
    //passed state varibles
    var selectedNumbers = this.props.selectedNumbers,
        redraws         = this.props.redraws,
        correct         = this.props.correct;
        
    //passed functions
    var checkAnswer   = this.props.checkAnswer,
        acceptAnswer  = this.props.acceptAnswer,
        redrawFrame   = this.props.redrawFrame;
        
    
    var button, disabled;
    //switch statement that checks if an answer is correct and returns the right button
    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick={acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        disabled = (selectedNumbers.length === 0);
        button = (
          <button   className="btn btn-primary btn-lg" 
                    disabled={disabled}
                    onClick={checkAnswer}
          >
            =
          </button>
        );
    }
    
    // returs the button-frame div
    // onClick it redraws the state
    // disabled if there are no more reDraws
    return (
      <div id="button-frame">
        {button}
        <br /><br />
        <button className="btn btn-warning btn-xs"
                onClick={redrawFrame}
                disabled={redraws === 0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {redraws}
        </button>
      </div>
    );
  }
});

// AnswerFrame class --------------------------------------------------------------
var AnswerFrame = React.createClass({
  render: function() {
    
    //passed states
    var selectedNumbers = this.props.selectedNumbers;
    //passed functions
    var deselectNumber = this.props.deselectNumber;
    
    selectedNumbers = selectedNumbers.map(function(i) {
      var ansKey = "answer" + i;
      return (
        // using closure to contain the number in the deselectNumber function
        <span key={ansKey} onClick={deselectNumber.bind(null, i)}>
          {i}
        </span>
      )
    });
    
    // return #answer-frame div containing the selectedNumbers array
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    );
  }
});

// NumberFrame class --------------------------------------------------------------
var NumbersFrame = React.createClass({
  render: function() {
    
    //passed state variables
    var selectedNumbers = this.props.selectedNumbers,
        usedNumbers     = this.props.usedNumbers;
    //passed functions
    var selectNumber = this.props.selectNumber;
    
    var numbers = [],
        className;
        
    // build numbers array
    for (var i=1; i <= 9; i++) {
      // write className based on if number has been selected
      className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
      className += " used-" + (usedNumbers.indexOf(i)>=0);
      var numKey = "number" + i;
      numbers.push(
        //build each number, attach selectNumber to onClick using closure
        <div key={numKey} className={className} onClick={selectNumber.bind(null, i)}>{i}</div>
      );
    }
    
    // return #numbers-frame div, containing numbers array
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});

// DoneFrame class --------------------------------------------------------------
var DoneFrame = React.createClass({
  render: function() {
    
    //passed state variables
    var doneStatus = this.props.doneStatus;
    
    //passed functions
    var resetGame = this.props.resetGame;
    
    // retruns #done-frame div, includes the doneStatus and a reset button
    return (
      <div id="done-frame" className="well text-center">
        <h2>{doneStatus}</h2>
        <button className="btn btn-default"
                onClick={resetGame}>
          Play Again
        </button>
      </div>
    );
  }
});

// code copied from samarbuna
// https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
// solves the "subset sum problem"
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};



// Game class --------------------------------------------------------------
var Game = React.createClass({
  
  // build inital state: empty numbers array, a random number between 1 and 9
  getInitialState: function() {
    return {  selectedNumbers:  [],
              usedNumbers:      [],
              numStars:         this.randomNumber(),
              redraws:          5,
              correct:          null,
              doneStatus:       null
    };
  },
  
  // reset the game state to the initial state
  resetGame: function() {
    this.replaceState(this.getInitialState())
  },
  
  //get a random number between 1 and 9
  randomNumber: function(){
    return Math.floor(Math.random()*9) + 1;
  },
  
  //selectNumber setState function: adds a number to the selectedNumbers array
  selectNumber: function(num) {
    if(this.state.selectedNumbers.indexOf(num) < 0 && this.state.usedNumbers.indexOf(num) < 0) {
      this.setState({ 
        selectedNumbers: this.state.selectedNumbers.concat(num),
        correct: null });
    }
  },
  
  //deselectNumber setState function: removes number from the selectedNumbers array
  deselectNumber: function(num) {
    var   selectedNumbers = this.state.selectedNumbers,
          index = selectedNumbers.indexOf(num);
          
    selectedNumbers.splice(index, 1);
    this.setState({ selectedNumbers: selectedNumbers,
                    correct: null
    });
  },
  
  // finds the sum of the numbers that are in the selectedNumbers array
  sumOfSelected: function() {
    return this.state.selectedNumbers.reduce(function(a,b) {
        return a + b;
      }, 0);
  },
  
  // check if the selected numbers are equal to the number of stars
  checkAnswer: function() {
    var correct = (this.state.numStars === this.sumOfSelected());
    this.setState({correct: correct});
  },
  
  //accepts the answer if valid and ajusts the state to continue playing
  acceptAnswer: function() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numStars: this.randomNumber()
    }, function(){
      this.updateDoneStatus();
    });
  },
  
  // redraws the state
  redrawFrame: function() {
    if (this.state.redraws > 0) {
      this.setState({
        numStars: this.randomNumber(),
        correct: null,
        selectedNumbers: [],
        redraws: this.state.redraws - 1
      }, function(){
        this.updateDoneStatus();
      });      
    }
  },
  
  // looks for a possible solution in remaining numbers
  possibleSolution: function() {
    var numStars        = this.state.numStars,
        possibleNumbers = [],
        usedNumbers     = this.state.usedNumbers;
        
    for (var i=1; i<=9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }
    
    return possibleCombinationSum(possibleNumbers, numStars);
  },
  
  // updates the doneStatus if certain condintions are met
  updateDoneStatus: function() {
    if (this.state.usedNumbers.length === 9){
      this.setState({doneStatus: 'Done! Congratulations!'});
      return;
    }
    if (this.state.redraws ===0 && !this.possibleSolution()) {
      this.setState({doneStatus: 'Game Over! Wah wahh wahhh...'});
    }
  },
  
  
  // Game render...
  render: function() {
    
    //declare state variables
    var selectedNumbers = this.state.selectedNumbers,
        usedNumbers     = this.state.usedNumbers,
        numStars        = this.state.numStars,
        redraws         = this.state.redraws,
        correct         = this.state.correct,
        doneStatus      = this.state.doneStatus;
    
    //declare functions
    var selectNumber    = this.selectNumber,
        deselectNumber  = this.deselectNumber,
        checkAnswer     = this.checkAnswer,
        acceptAnswer    = this.acceptAnswer,
        redrawFrame     = this.redrawFrame,
        resetGame       = this.resetGame;
    
    // sets the bottom frame depending on the doneStatus
    var bottomFrame;
    if (doneStatus) {
      bottomFrame = <DoneFrame    doneStatus  ={doneStatus}
                                  resetGame   ={resetGame}/>;
    } else {
      bottomFrame = <NumbersFrame   selectedNumbers ={selectedNumbers}
                                    usedNumbers     ={usedNumbers}
                                    selectNumber    ={selectNumber}/>
    }
    
    //return #game div, contains all other elements on the page
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame   numStars        ={numStars} />
          <ButtonFrame  selectedNumbers ={selectedNumbers}
                        redraws         ={redraws}
                        correct         ={correct}
                        checkAnswer     ={checkAnswer}
                        acceptAnswer    ={acceptAnswer}
                        redrawFrame     ={redrawFrame}/>
          <AnswerFrame  selectedNumbers ={selectedNumbers} 
                        deselectNumber  ={deselectNumber} />
        </div>
        {bottomFrame}
      </div>
    );
  }
});


// Render to page to #container element-------------------------------------
ReactDOM.render(
  <Game />,
  document.getElementById("container")
);