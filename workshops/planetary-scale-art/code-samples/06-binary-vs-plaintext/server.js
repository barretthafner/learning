const net = require("net"); // https://nodejs.org/api/net.html 

var server = new net.Server();

// Respond to connections
server.on("connection", function(client) {
  
  let count = 1;
  let clientAddress = client.remoteAddress;
  
  console.log("Client connected, address=" + clientAddress);

  client.on("close", function() {
    console.log("Client disconnected, address=" + clientAddress);
  });



  // Display the data sent from the client.
  client.on("data", function(buffer) {

    console.log("\n-------------- Message #" + count++ + "--------------");
    console.log("Recieved " + buffer.length + " bytes!");


    console.log("As a string it looks like:            '" + buffer.toString() + "'");


    if(buffer.length >= 4) {
      console.log("As a 32 bit integer it looks like:    " + buffer.readUInt32BE(0));

      console.log("As two 16 bit integers it looks like: " + buffer.readUInt16BE(0) + " and " + buffer.readUInt16BE(2));

      console.log("As a floating point it looks like:    " + buffer.readFloatBE(0));
    }


    var byteList = [];
    var hexList = [];
    for(var i = 0; i < buffer.length; i++) {
      byteList.push(buffer[i]);

      var hexPair = buffer[i].toString(16);
      
      if(hexPair.length == 1) {
        hexPair = "0" + hexPair;
      }
      hexList.push(hexPair.toUpperCase());
    }

    console.log("As a list of bytes it looks like:     " + byteList.join(", "));
    console.log("As a list of hex pairs it looks like: " + hexList.join(" "));

  });

});


// Announce that the server is up and running.
server.on("listening", function() {
  console.log("Server is now listening.");
  console.log("------------------------");
});


server.listen(9000);