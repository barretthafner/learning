import React from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';

const exampleBoard = [
  ["pick up groceries", "build hampsterball", "find meaning of life"],
  ["start apocalypse", "learn wizard", "talk to bears"],
  ["fight the power", "leave the party early", "make that sweet baby sing"]
];

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Board lists={exampleBoard}/>, document.getElementById('app'));
});

