var React = require('react');
var ReactDOM = require('react-dom');

//var Board = React.createClass({
//  render: function() {
//    return (
//      <div className="board">
//        < List />
//      </div>
//    );
//  }
//});
//
//var List = React.createClass({
//  render: function() {
//    return (
//      <div className="list">
//        < Card />
//      </div>
//    );
//  }
//});
//
//var Card = React.createClass({
//  render: function() {
//    return (
//      <div className="card">
//        <h1>This is a card!</h1>
//      </div>
//    );
//  }
//});

var Board = React.createClass({
  render: function() {
    return (
      <div className="board">
        <ListContainer />
      </div>
    );
  }
});

var List = React.createClass({
  onAddInputChanged: function() {
    this.props.onAddInputChanged(this.refs.input.value);
  },
  render: function() {
    return (
      <div className="list">
        <h4>{this.props.title}</h4>
        {this.props.cards}
        <input type='text' ref='input' onChange={this.onAddInputChanged}/>
        <button onClick={this.props.onAddClick}>Add</button>
      </div>
    );
  }
});

var Card = React.createClass({
  render: function() {
    return (
      <div className="card">
        {this.props.text}
      </div>
    );
  }
});

var ListContainer = React.createClass({
  getInitialState: function() {
    return {
      text: null,
      cards: []
    };
  },
  onAddInputChanged: function(inputText) {
    this.setState({
      text: inputText
    });
  },
  onAddClick: function() {
    var newCards = this.state.cards;
    newCards.push(this.state.text);
    this.setState({
      cards: newCards
    });
  },
  render: function() {
    return (
      <List onAddInputChanged={this.onAddInputChanged} onAddClick={this.onAddClick} cards={this.state.cards} />
    )
  }
});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Board />, document.getElementById('app'));
});
