const net = require("net"); // https://nodejs.org/api/net.html 


var clients = [];
var server = new net.Server();


function sendToEverybody(buffer) {
  clients.forEach( function(item) {
    if(item.name !== "") {
      item.connection.write(buffer);
    }
  });
}


// Respond to connections
server.on("connection", function(client) {
  
  let clientInfo = {
    "name" : "",
    "address" : client.remoteAddress,
    "connection" : client
  };
  
  console.log("Client connected.");

  client.on("close", function() {
    console.log("User left: " + clientInfo.name);
    clients.splice( clients.indexOf(clientInfo), 1);
    sendToEverybody(clientInfo.name + " left.");
  });


  // Display the data sent from the client.
  client.on("data", function(buffer) {
    if(clientInfo.name === "") {
      clientInfo.name = buffer.toString();
      console.log("New user joined: " + clientInfo.name);

      sendToEverybody(clientInfo.name + " joined.");
    } else {

      sendToEverybody(clientInfo.name + ": " + buffer);
    }
  });

  clients.push(clientInfo);

});


// Announce that the server is up and running.
server.on("listening", function() {
  console.log("Server is now listening.");
  console.log("------------------------");
});


server.listen(9000);