import React from 'react';
import Card from './Card';

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
    if (this.state.text !== "") {
      this.addCard();
    }
  },
  onAddKeyPress: function(event) {
    const keyCode = event.which;
    if (keyCode === 13 && this.state.text !== "") {
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
        <button ref='button' onClick={this.onAddClick}>Add</button>
      </div>
    );
  }
});

export default List;
