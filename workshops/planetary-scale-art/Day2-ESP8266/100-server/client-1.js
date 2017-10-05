const net = require("net"); // https://nodejs.org/api/net.html
const readline = require('readline');

const configuration = {
  "host" : "172.18.1.62",
  "port" : 9000
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var client = new net.Socket();


client.on("connect", function() {
  console.log("I have connected to the server!");
});


client.on("data", function(theData) {
  console.log(theData.toString());
});


rl.on("line", function(theLine) {
  client.write(theLine);
});

client.connect(configuration);
rl.prompt();
