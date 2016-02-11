/*  YelpCamp App 
    Description: Made for web development bootcamp with Colt Steele
    Includes: express, ejs, bodyParser, mongoose
*/

// Initialize -----------------------------------------
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDb          = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

//seed the DB
seedDb();

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

// Routes ---------------------------------------------

// Root ("/") route
app.get("/", function(req, res){
    res.render("root");
});

// INDEX - RESTFUL ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - RESTFUL ROUTE - add new campground to DB
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description:description};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW - RESTFUL ROUTE - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new");
});

// SHOW - RESTFUL ROUTE - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});



// Comments Routes ------------------------------------
// new comment route
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: foundCampground});
       }
   });
});

//create comment route
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
    //look up campground by id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err){
            console.log(err);
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add new comment to campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    // redirect
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});


// Auth routes

app.get("/register", function(req, res) {
   res.render("register") ;
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


//show login in form
app.get("/login", function(req, res) {
    res.render("login");
});

// handles login logic
app.post("/login", passport.authenticate("local",
     {  successRedirect: "/campgrounds",
        failureRedirect: "/login"
     }), function(req, res) {
});

// logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

// 404 response----------------------------------------
app.get("*", function(req, res) {
    res.send("You're a shinning star! But, unfortunately, your page cannot be found.");
});


// Listen ---------------------------------------------
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running.  Better go catch it!")
});


// Middleware -----------------------------------------
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}