var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(!req.isAuthenticated()){
        res.redirect("back");
    } else {
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                res.redirect("back");
            } else {
                // does the user own the campground?
                if(!campground.author.id.equals(req.user._id)){
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
        res.redirect("back");
    } else {
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back");
            } else {
                // does the user own the comment?
                if(!comment.author.id.equals(req.user._id)){
                    res.redirect("back");
                } else {
                    next();
                }
            }
        });
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;