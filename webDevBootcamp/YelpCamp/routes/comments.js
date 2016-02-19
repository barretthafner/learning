var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
       if (err) {
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("/campgrounds");
       } else {
            res.render("comments/new", {campground: foundCampground});
       }
   });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    //look up campground by id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err){
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Error! Comment not created!");
                    res.redirect("/campgrounds/" + req.params.id);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //add new comment to campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    // redirect
                    req.flash("success", "Thank you " + req.user.username + "! Your comment was created.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
            req.flash("error", "Comment not found!");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});

        }
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
            console.log(err);
            req.flash("error", "Comment not found!");
            res.redirect("back");
       } else {
            req.flash("success", "Thank you " + req.user.username + "! Your comment was updated.");
            res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            req.flash("error", "Comment not found!");
            res.redirect("back");
        } else {
            req.flash("success", "Thank you " + req.user.username + "! Your comment was deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;