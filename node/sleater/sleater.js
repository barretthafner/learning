var musicians = require('musicians');

var corin = new musicians.Guitarist();
var carrie = new musicians.Guitarist();

corin.tune();
carrie.tune();

corin.solo(8);
carrie.solo(8);