//grabbing each package we are using
var express       = require("express"),
    app           = express(),
    flash         = require("connect-flash"),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

//requiring routes
    var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");

//setting up database connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL);
//grabbing data from html forms setup
app.use(bodyParser.urlencoded({extended: true}));
//set view to ejs
app.set("view engine", "ejs");
//telling node to use style sheet
app.use(express.static(__dirname + "/public"));
//seeding database
//seedDB();
app.use(methodOverride("_method"));
app.use(flash());
//PASSPORT CONFIG 
//try to keep in order so you dont run into bugs
app.use(require("express-session")({
    secret: "This is the secret hasing ",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass variable to all routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


//connection to listen to port for c9
app.listen(process.env.PORT, process.env.IP, function() {
    
        console.log("YELPCAMP SERVER STARTED!");
});
