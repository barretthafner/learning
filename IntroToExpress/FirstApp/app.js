// console.log("Begin app.js");

var express = require("express");
var app = express();

// "/" -> Hi there!
app.get("/", function(req, res){
    res.send("Hi there!");
});

// "/bye" -> "Goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goodbye!");
});
// "/dog" -> "Woof!"
app.get("/dog", function(req, res) {
    console.log("Someone made a request to /dog!");
    res.send("WOOF!");
});

// uses a route paramenter/route variable/path variable named :subredditName
app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    console
    subreddit.toUpperCase();
    res.send("You are on the " + subreddit + " subreddit!" );
});

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("Welcome to the comments page!");
    console.log(req.params);
})

app.get("*", function (req, res) {
    res.send("You are a shining star!");
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});
