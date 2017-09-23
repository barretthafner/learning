const net = require("net"); // https://nodejs.org/api/net.html 

var server = new net.Server();

// Respond to connections
server.on("connection", function(client) {
  
  let clientAddress = client.remoteAddress;
  
  console.log("Client connected, address=" + clientAddress);

  client.on("close", function() {
    console.log("Client disconnected, address=" + clientAddress);
  });

  // Display anything sent from the client.
  client.on("data", function(buffer) {
    console.log("Data from client: ", buffer);
    console.log("Number=" + buffer[0]);
  });

});


// Announce that the server is up and running.
server.on("listening", function() {
  console.log("Server is now listening.");
  console.log("------------------------");
});

server.on("error", function(error){
  console.log("Oh no.. a server error happened: " + error.code);
})


server.listen(9000);