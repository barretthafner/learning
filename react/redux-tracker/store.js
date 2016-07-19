var Redux = require('redux');
var reducers = require('./reducers');

var store = Redux.createStore(reducers.repositoryReducer);
module.exports = store;
