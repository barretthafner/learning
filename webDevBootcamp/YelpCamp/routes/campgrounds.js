var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");

// INDEX
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
            req.flash("error", "Something went horribly wrong!");
            res.redirect("/");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds array
    
    // var name = req.body.name;
    // var image = req.body.image;
    // var description = req.body.description;
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username,
    // };
    // var newCampground = {name: name, image: image, description:description, author:author};
    
    var newCampground = req.body.campground;
    newCampground["author"] = {
        id: req.user._id,
        username: req.user.username,
    };
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
            req.flash("error", "Campground was not created!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground \"" + newlyCreated.name + "\" created!");
            res.redirect("/campgrounds");
        }
    });
    
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("/campgrounds");
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: campground});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            req.flash("error", "Something went horribly wrong!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
    });
});



// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Error! Campground was not updated!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground \"" + req.body.campground.name + "\" updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            console.log(err);
            req.flash("error", "Error! Campground was not deleted!");
            res.redirect("/campgrounds");
       } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
       }
   });
});

module.exports = router;