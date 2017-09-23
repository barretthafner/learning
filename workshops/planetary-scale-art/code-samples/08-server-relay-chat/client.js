const net = require("net"); // https://nodejs.org/api/net.html 
const readline = require('readline');

const configuration = {
  "host" : "localhost",
  "port" : 9000
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var clientIsLoggedIn = false;
var client = new net.Socket();
var myName = "";


client.on("connect", function() {
  console.log("I have connected to the server!");
  client.write(myName);
  clientIsLoggedIn = true;
});


client.on("data", function(theData) {
  if(theData.indexOf(myName) !== 0) {
    console.log(theData.toString());
  }
});


rl.on("line", function(theLine) {
  
  if(theLine == "") {
    return;
  }

  if(clientIsLoggedIn) {
    client.write(theLine);
    rl.prompt();
  } else {
    myName = theLine;
    client.connect(configuration);
  }

});

console.log("Enter your name to join.");
rl.prompt();