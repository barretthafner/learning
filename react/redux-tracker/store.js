var Redux = require('redux');
var createStore = Redux.createStore;
var applyMiddleware = Redux.applyMiddleware;
var thunk = require('redux-thunk').default;

var reducers = require('./reducers');
var store = createStore(reducers.repositoryReducer, applyMiddleware(thunk));
module.exports = store;
