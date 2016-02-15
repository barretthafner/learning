/*  YelpCamp App 
    Description: Made for web development bootcamp with Colt Steele
    Includes: express, ejs, bodyParser, mongoose
*/

// Initialize -----------------------------------------------------------------
// Require packages
var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local");
    
// Require DB Models    
var User            = require("./models/user"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment");

// Require Express Routers
var indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments");

// Initialize packages
var app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

//Passport initilization
app.use(require("express-session")({
    secret: "This is a secret for YelpCamp...easily hackable",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Use routes -----------------------------------------------------------------
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Database seed
// var seedDb  = require("./seeds");
// seedDb();

// Listen ---------------------------------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.  Better go catch it!")
});


