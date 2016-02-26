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
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    session         = require("express-session"),
    flash           = require("connect-flash");
    
// Require DB Models    
var User            = require("./models/user");

// Require Express Routers
var indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments");

// Connect Database
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/yelp_camp");

// Initialize packages
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//Express Session initilization for passport
app.use(session({
    secret: "This is a secret for YelpCamp...easily hackable",
    resave: false,
    saveUninitialized: false
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass global middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
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
    console.log("Server running.  Better go catch it!");
});