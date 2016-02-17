var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(!req.isAuthenticated()){
        req.flash("error", "Please login!");
        res.redirect("/login");
    } else {
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                req.flash("error", "Campground was not found!");
                res.redirect("back");
            } else {
                // does the user own the campground?
                if(!campground.author.id.equals(req.user._id)){
                    req.flash("error", "You are not authorized to do that!");
                    res.redirect("back");
                } else {
                    next();
                }
            }
        });
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(!req.isAuthenticated()){
        req.flash("error", "Please Login!");
        res.redirect("/login");
    } else {
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("error", "Campground was not found!");
                res.redirect("back");
            } else {
                // does the user own the comment?
                if(!comment.author.id.equals(req.user._id)){
                    req.flash("error", "You are not authorized to do that!");
                    res.redirect("back");
                } else {
                    next();
                }
            }
        });
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        req.flash("error", "Please Login!");
        res.redirect("/login");
    } else {
        return next();
    }
}

module.exports = middlewareObj;