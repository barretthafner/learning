const net = require("net"); // https://nodejs.org/api/net.html 
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var client = new net.Socket();
var bigNumber = 4225325610;


client.on("connect", function() {
  console.log("I have connected to the server!");
});


var messageNumber = 0;

function sendMessage() {
  messageNumber++;

  switch(messageNumber) {

    case 1:
      console.log("Sending bigNumber as a string..");
      client.write(bigNumber.toString());
    break;


    case 2:
      console.log("Sending bigNumber as binary.");

      var buffer = Buffer.alloc(4);
      buffer.writeUInt32BE(bigNumber);
      
      client.write(buffer);
    break;


    case 3:
      console.log("Sending two 16 bit integers, 1337 and 1234");
      
      var buffer = Buffer.alloc(4);
      
      buffer.writeUInt16BE(1337, 0);
      buffer.writeUInt16BE(1234, 2);
      
      client.write(buffer);
    break;


    case 4:
      console.log("Sending Pi as a string: " + Math.PI);
      
      client.write(Math.PI.toString());
    break;


    case 5:
      console.log("Sending Pi as a binary floating point: " + Math.PI);
      
      var buffer = Buffer.alloc(4);
      
      buffer.writeFloatBE(Math.PI);
      
      client.write(buffer);
    break;


    case 6:
      // http://www.ltg.ed.ac.uk/~richard/utf-8.cgi
      
      console.log("Sending an emoji: 😂");
      client.write("😂");

    break;

  }

}


rl.on("line", function(theLine) {
  sendMessage();
});


client.connect({
  "host" : "localhost",
  "port" : 9000
});