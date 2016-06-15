var express = require('express');

var app = express();

app.get('/', function(request, response) {
  response.send("Hello World");
});

app.get('/jsonTest', function(request, response) {
  response.json({
    name: 'Kim Gordon',
    instrument: 'Bass'
  });
});

// When you visit /headers the server should return an object containing the request headers.
// When you visit /headers/:header_name the server should return a string containing the contents of the specified header.
// When you visit /version the server should return a string containing the HTTP version of the request.

app.get('/headers', function(request, response) {
  response.json(request.headers);
});

app.get('/headers/:header_name', function(request, response) {
  response.json(request.headers[request.params.header_name]);
});

app.get('/version', function(request, response) {
  response.json(request.httpVersion);
});

app.get('/:firstname/:lastname', function(request, response) {
  var first = request.params.firstname;
  var last = request.params.lastname;
  response.send(["Hello", first, last].join(" "));
});


app.listen(process.env.PORT, process.env.IP);