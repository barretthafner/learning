// Reference: https://nodejs.org/api/net.html 

const net = require("net");  


var server = new net.Server();


server.on("listening", function() {
  // server is up and running, make a note in the console.
  console.log("Server is now listening.");
});


server.listen(9000);