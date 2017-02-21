import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <header>


          <nav>
            <ul className="clearfix">
              <li><a className="what" href="#">What ?</a></li>
              <li><a className="new" href="#">+ New Game</a></li>
            </ul>
          </nav>

          <What />


          <h1>HOT or COLD</h1>

        </header>

        <section className="game">

          <h2 id="feedback">Make your Guess!</h2>

          <form>
            <input type="number" min="1" max="100" name="userGuess" id="userGuess" className="text" maxLength="3" autoComplete="off" placeholder="Enter your Guess" required/>
                <input type="submit" id="guessButton" className="button" name="submit" value="Guess"/>
          </form>

              <p>Guess #<span id="count">0</span>!</p>

          <ul id="guessList" className="guessBox clearfix">

          </ul>

        </section>
      </div>
    );
  }
};

class What extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
          <div className="overlay" id="modal">
            <div className="content">
              <h3>What do I do?</h3>
              <div>
                <p>This is a Hot or Cold Number Guessing Game. The game goes like this: </p>
                <ul>
                  <li>1. I pick a <strong>random secret number</strong> between 1 to 100 and keep it hidden.</li>
                  <li>2. You need to <strong>guess</strong> until you can find the hidden secret number.</li>
                  <li>3. You will <strong>get feedback</strong> on how close ("hot") or far ("cold") your guess is.</li>
                </ul>
                <p>So, Are you ready?</p>
                <a className="close" href="#">Got It!</a>
              </div>
            </div>
          </div>
    );
  }
};

//class Nav extends React.Component {
//  render() {
//    return (
//
//    )
//  }
//}

ReactDOM.render(<Main />, document.getElementById('container'));
