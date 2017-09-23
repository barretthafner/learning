const net = require("net"); // https://nodejs.org/api/net.html 

var server = new net.Server();



// Respond to connections
server.on("connection", function(client) {
  
  let clientAddress = client.remoteAddress;
  
  console.log("A client connected,    address: " + clientAddress);

  client.on("close", function() {
    console.log("A client disconnected, address: " + clientAddress);
  });

});



server.on("listening", function() {
  // server is up and running, make a note in the console.
  console.log("Server is now listening.");
  console.log("------------------------");
});


server.listen(9000);
