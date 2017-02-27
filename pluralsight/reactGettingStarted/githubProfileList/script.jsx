var Card = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data) {
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div>
        <img src={this.state.avatar_url} width="150" />
        <h3>{this.state.name}</h3>
      <hr/>
    </div>
    )
  }
});

var Form = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var userInput = ReactDOM.findDOMNode(this.refs.user);
    this.props.addCard(userInput.value);
    userInput.value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="github login" ref="user"/>
        <button>Add</button>
      </form>
    );
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(userToAdd) {
    this.setState({logins: this.state.logins.concat(userToAdd)});
  },
  render: function() {
    var cards = this.state.logins.map(function(login) {
      return (<Card key={login} login={login} />);
    });
    return (
      <div>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById("root"));