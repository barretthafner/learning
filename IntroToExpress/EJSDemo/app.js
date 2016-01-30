var express = require("express");
var app = express();

//serves static files like css and js from the /public directory
app.use(express.static("public"));

//Allows you to leave .ejs off our first render parameter
app.set("view engine", "ejs");


// Routes-------------------------------------
app.get("/", function (req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Dana"},
        {title: "Can you believe this Pomsky?", author: "Amy"},
    ];
    res.render("posts", {posts:posts});
});

// Listen-----------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started.");
});