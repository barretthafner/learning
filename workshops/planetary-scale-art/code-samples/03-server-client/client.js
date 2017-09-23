const net = require("net"); // https://nodejs.org/api/net.html 
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var client = new net.Socket();


client.on("connect", function() {
  console.log("I have connected to the server!");
  rl.prompt();
});

client.connect({
  "host" : "wefweflocalhost",
  "port" : 9000
});



rl.on("line", function(theLine) {
  console.log("sending: " + theLine);
  client.write(theLine);
  rl.prompt();
});

