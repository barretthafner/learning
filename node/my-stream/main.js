var RandomNum = require("./randomNum");
var ConsoleOut = require("./consoleOut");
var input = new RandomNum();
var output = new ConsoleOut();



input.pipe(output);