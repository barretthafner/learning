const net = require("net"); // https://nodejs.org/api/net.html 

var server = new net.Server();



server.on("connection", function(client) {
  
  let clientAddress = client.remoteAddress;
  
  console.log("A client connected,    address=" + clientAddress);

  client.on("close", function() {
    console.log("A client disconnected, address=" + clientAddress);
  });

  client.on("data", function(stuffFromTheClient) {
    console.log("a client sent: " + stuffFromTheClient);
  });

});



// Announce that the server is up and running.
server.on("listening", function() {
  console.log("Server is now listening.");
  console.log("------------------------");
});


server.listen(9000);