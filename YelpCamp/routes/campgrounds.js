var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// INDEX
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE
router.post("/", isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    };
    var newCampground = {name: name, image: image, description:description, author:author};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res){
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

// Middleware -----------------------------------------
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;