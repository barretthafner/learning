import React from 'react';

const Card = React.createClass({
  render() {
    return (
      <div className="card">
        <p>{this.props.text}</p>
      </div>
    );
  }
});

export default Card;
