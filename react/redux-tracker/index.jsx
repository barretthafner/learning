var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./store');
var RepositoryList = require('./repository-list');

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
      <Provider store={store}>
        <RepositoryList />
      </Provider>,
      document.getElementById('app')
    );
});
