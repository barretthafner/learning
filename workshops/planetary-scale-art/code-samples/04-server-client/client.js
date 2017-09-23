const net = require("net"); // https://nodejs.org/api/net.html 
const readline = require('readline');

var client = new net.Socket();


client.on("connect", function() {
  console.log("I have connected to the server!");
});

client.on("error", function(error){
  console.log("Oh no.. an error happened: " + error.code);
});

client.connect({
  "host" : "localhost",
  "port" : 9000
});