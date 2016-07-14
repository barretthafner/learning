import React from 'react';

const Image = React.createClass({
  render() {
    return (
        <div className="gallery-image">
            <img src={this.props.url} alt={this.props.description} />
            <p>{this.props.description}</p>
        </div>
    );
  }
});

module.exports = Image;
