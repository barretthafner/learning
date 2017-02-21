import React from 'react';
import List from './List';

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

export default Board;
