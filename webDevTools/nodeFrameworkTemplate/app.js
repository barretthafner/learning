/*  New app.js 
    Description:
    Includes: express, ejs, body-parser
*/

// Initialize -----------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// Routes ---------------------------------------------

// Root ("/") route
app.get("/", function(req, res){
    res.render("root");
});

app.get("*", function(req, res) {
    res.send("You're a shinning star! But, unfortunately, your page cannot be found.");
});

// Listen ---------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.  Better go catch it!")
});