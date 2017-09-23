const net = require("net"); // https://nodejs.org/api/net.html 
const fs = require("fs");

var client = new net.Socket();

var startOfFile = "\r\n\r\n";

var fileStarted = false;
var fileOutput;


client.on("connect", function() {
  console.log("Connected to the server!");

  client.write("GET /Data.jpg HTTP/1.1\r\nHost: static.glowbox.io\r\n\r\n");
});



client.on("data", function(buffer) {

  if(!fileStarted) {

    let bufferAsString = buffer.toString();
    let startOfFileIndex = bufferAsString.indexOf(startOfFile);

    if(startOfFileIndex != -1) {
      console.log("file has started!");
      fileStarted = true;

      // Grab any data starting after the header.
      fileOutput = Buffer.from(buffer.slice(startOfFileIndex + startOfFile.length));
    }

  } else {

    // Any additional data goes into the buffer.
    fileOutput = Buffer.concat([fileOutput, buffer]);
  }

  console.log("Got data, " + buffer.length + " bytes.");
});



client.on("close", function() {
  
  if(fileStarted) {
    console.log("Total bytes in file: " + fileOutput.length);
    fs.writeFileSync("Data.jpg", fileOutput);
  }
  
  console.log("DONE!");
});


client.connect({
  "host" : "static.glowbox.io",
  "port" : 80
});