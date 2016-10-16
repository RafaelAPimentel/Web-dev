var express = require("express");
//merge perams allows perameter to be taken from router prefex
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=======================
//Comments routes
//=======================
//Comments new
router.get('/new', middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campgrounds){
        console.log(campgrounds);
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campgrounds});
        }
    });
});

//Comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error","Something went wrong");
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err,comment){
                if (err) {
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //add username and id to comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "You have created a comment!");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campgroundd show  page
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req,res){
   Comment.findById(req.params.comment_id,function(err, foundComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.render("comments/edit",{campground_id: req.params.id,comment:foundComment});
       }
   }); 
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "You have removed your comment");
            res.redirect("/campgrounds/" +req.params.id);
        }
    });
});




module.exports = router;