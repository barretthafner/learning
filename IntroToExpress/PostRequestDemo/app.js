// Include Express
var express = require("express");
var app = express();

// Adds the body-parser, which is used to parse the js objects from the post request
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Allows you to leave .ejs off our first render parameter
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

// Routes -------------------------------------------
app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", {names: friends});
});

app.post("/newFriend", function(req, res){
    var newFriend = req.body.friendName;
    console.log(newFriend);
    friends.push(newFriend);
    res.redirect("/friends");
});

// Listen ---------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.  Better go catch it!")
});