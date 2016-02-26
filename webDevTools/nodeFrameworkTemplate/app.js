/*  NewApp 
    Description:
    Includes: express, ejs, body-parser, and mongoose
*/

// Initialize -----------------------------------------------------------------
// Require Packages
var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override");

// Create app
var app = express();

// Configure packages
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Connect Database -----------------------------------------------------------
mongoose.connect(process.env.DBURL || "mongodb://localhost/new_app");

// Load models ----------------------------------------------------------------
app.models = require("./models/index");

// Require Routes and use------------------------------------------------------
var indexRoutes = require("./routes/index");
app.use(indexRoutes);

// Listen ---------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is running! Better go catch it!");
});