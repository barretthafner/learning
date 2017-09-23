const net = require("net"); // https://nodejs.org/api/net.html 


var client = new net.Socket();


client.on("connect", function() {
  
  console.log("Connected to the server!");

  // wait a couple of seconds and then close the connection.
  setTimeout(function() {
    console.log("Ok, closing connection..");
    client.end();
  }, 2000);
});


client.connect({
  "host" : "172.18.1.76",
  "port" : 9000
});