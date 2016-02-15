var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// NEW
router.get("/new", isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", {campground: foundCampground});
       }
   });
});

// CREATE
router.post("/", isLoggedIn, function(req, res) {
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
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

// Middleware -----------------------------------------
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;