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


var myName = "";
var client = new net.Socket();


client.on("connect", function() {
  console.log("I have connected to the server!");
});


client.on("data", function(theData) {
  console.log(theData.toString());
});


rl.on("line", function(theLine) {
  
  if(theLine == "") {
    return;
  }

  if(myName != "") {
    client.write(myName + ": " + theLine);
  } else {
    myName = theLine;
    client.connect(configuration);
  }

});

console.log("Enter your name to join.");
rl.prompt();