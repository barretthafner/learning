const net = require("net"); // https://nodejs.org/api/net.html


var clients = [];
var server = new net.Server();



// Respond to connections
server.on("connection", function(client) {

  console.log("Client connected.");

  // Display the data sent from the client.
  client.on("data", function(buffer) {
    console.log("Client message: " + buffer.toString());
    clients.forEach( function(c) {
      if(c !== client) {
       c.write(buffer);
      }
    });
  });


  client.on("close", function() {
    console.log("Client disconnected.");
    clients.splice( clients.indexOf(client), 1);
  });

  client.on("error", function() {
    console.log("Client disconnected due to error.");
    let clientIndex = clients.indexOf(client);
    if (clientIndex != -1) {
      clients.splice( clients.indexOf(client), 1);
    }
  });


  // Add this client to the list of clients.
  clients.push(client);
});


// Announce that the server is up and running.
server.on("listening", function() {
  console.log("Server is now listening.");
  console.log("------------------------");
});


server.listen(9000);
