var React = require('react');
var connect = require('react-redux').connect;

var Repository = require('./repository');
var actions = require('./actions');

var RepositoryList = React.createClass({
    addRepository: function() {
        var repositoryName = this.refs.repositoryName.value;
        this.props.dispatch(actions.addRepository(repositoryName));
    },

    render: function() {
        var repositories = this.props.repositories.map(function(repository) {
            return <Repository repository={repository} key={repository.name} />;
        });

        return (
            <div className="repository-list">
                {repositories}
                <input type="text" ref="repositoryName" />
                <button type="button" onClick={this.addRepository}>
                    Add repository
                </button>
            </div>
        );
    }
});

var mapStateToProps = function(state, props) {
  return {
    repositories: state
  };
};

var Container = connect(mapStateToProps)(RepositoryList);

module.exports = Container;
