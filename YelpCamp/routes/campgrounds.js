var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//==================
// Campground Routes
//==================
//route to campgrounds 
router.get("/", function(req, res) {
        //mongo grabbing all campgrounds on database
        Campground.find({}, function(err, allCampgrounds) {
            if (err) {
                console.log(err);
            }
            else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
});


//post route to enter info into database
router.post("/", function(req, res) {
    //bodyparsing html for data
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image,
        description: desc,
        author: author
    };
    //importing data into database
    Campground.create(newCampground, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});
//route to create campgrounds
router.get("/new",middleware.isLoggedIn, function(req, res) {
        res.render("campgrounds/new");
});

//route to show campgrounds details
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground: foundCampGround});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampGround){
        res.render("campgrounds/edit", {campground: foundCampGround});
    });    
});

//PUT UPDATE CAMPGROUND  
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;