/*  NewApp 
    Description:
    Includes: express, ejs, body-parser, and mongoose
*/

// Initialize -----------------------------------------

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({extended: true}));

// Configure Database ---------------------------------
// Uncomment below to create new database

/*
mongoose.connect("mongodb://localhost/new_app");

var appSchema = new mongoose.Schema({
    name: String,
    description: String,
});

var AppItem = mongoose.model("AppItem", appSchema);
*/

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
    console.log("The server is running! Better go catch it!");
});