/*  YelpCamp App 
    Description: Made for web development bootcamp with Colt Steele
    Includes: express, ejs
*/

// Initialize -----------------------------------------
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8579/16706717975_bdc99767d7.jpg"},
    {name: "Opal Creek", image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg"},
    {name: "Granite Pass", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Mountain Goats Rest", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
];

// Routes ---------------------------------------------

// Root ("/") route
app.get("/", function(req, res){
    res.render("root");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});



app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new");
});

app.get("*", function(req, res) {
    res.send("You're a shinning star! But, unfortunately, your page cannot be found.");
});

// Listen ---------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.  Better go catch it!")
});