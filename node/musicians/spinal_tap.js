var musicians = require('./musicians.js');

var nigel = new musicians.Guitarist();
nigel.tune();
nigel.solo(8);

var derek = new musicians.Bassist();
derek.solo(4);