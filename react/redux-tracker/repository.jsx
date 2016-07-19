var React = require('react');
var connect = require('react-redux').connect;

var StarRater = require('./star-rater');
var actions = require('./actions');

var Repository = React.createClass({
    changeRating: function(rating) {
      this.props.dispatch(
        actions.rateRepository(this.props.repository.name, rating)
      );
    },
    render: function() {
        return (
            <div className="repository">
                {this.props.repository.name}
                &nbsp;
                <StarRater rating={this.props.repository.rating}
                           onChange={this.changeRating} />
            </div>
        );
    }
});

var Container = connect()(Repository);

module.exports = Container;
