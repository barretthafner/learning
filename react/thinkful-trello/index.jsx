import React from 'react';
import ReactDOM from 'react-dom';

const Card = React.createClass({
  render() {
    return (
      <div className="card">
        {this.props.text}
      </div>
    );
  }
});

const List = React.createClass({
  getInitialState: function () {
    return {
      // intialized from seed
      cards: this.props.cards || [],
      text: ""
    };
  },
  addCard: function () {
    const text = this.state.text;
    const newCards = this.state.cards;
    newCards.push(<Card text={text} />);
    this.setState({
      cards: newCards,
      text: ""
    });
  },
  onAddInputChanged: function() {
    this.setState({
      text: this.refs.input.value
    });
  },
  onAddClick: function() {
    this.addCard();
  },
  onAddKeyPress: function(event) {
    const keyCode = event.which;
    if (keyCode === 13) {
      this.addCard();
    }
  },
  render: function() {
    const cards = this.props.cards.map(function(text, index) {
      return (
        <li key={index}>
          <Card text={text} />
        </li>
      );
    });
    return (
      <div className="list">
        <ul>
          {cards}
        </ul>
        <input type='text' ref='input' onChange={this.onAddInputChanged} onKeyPress={this.onAddKeyPress} value={this.state.text} />
        <button onClick={this.onAddClick}>Add</button>
      </div>
    );
  }
});


const Board = React.createClass({
  getInitialState: function () {
    return {
      // intialized from seed
      lists: this.props.lists || [[]]
    };
  },
  render: function() {
    const lists = this.state.lists.map(function(cards, index) {
      return (
        <li key={index}>
          <List cards={cards} />
        </li>
      );
    });

    return (
      <div className="board">
        <ul>
          {lists}
        </ul>
      </div>
    );
  }
});

const exampleBoard = [
  ["pick up groceries", "build hampsterball", "find meaning of life"],
  ["start apocalypse", "learn wizard", "talk to bears"],
  ["fight the power", "leave the party early", "make that sweet baby sing"]
];

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Board lists={exampleBoard}/>, document.getElementById('app'));
});



