var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//route to homepage
router.get("/", function(req, res) {
        //telling to use langings.ejs in views dir
        res.render("landings");
});
//=====================
//AUTH ROUTES
//=====================
//register form route
router.get("/register",function(req, res) {
    res.render("register");
});

//signup logic route
router.post("/register",function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to yelpCamp "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});
//show login form
//login form route
router.get("/login",function(req, res) {
    res.render("login");
});

//login form logic route
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
});

//logout route
router.get("/logout",function(req, res) {
  req.logout();
  req.flash("error", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;