var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");    //auth routes

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// console.log(__dirname);
// seedDB();   //seed the database

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//     {name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"}
// ];

//passport configuration
app.use(require("express-session")({
    secret: "Amma is the Divine Mother of the Universe",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware - every route has access to this function
//req.user is being used in header file which is included in all ejs files
app.use(function (req, res, next) {
    res.locals.currentUser = req.user; //whatever we put in res.locals will be available to all templates
    next(); //run next code... if this line is missing then it will hang
});

app.use(indexRoutes);   //app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function () {
    console.log("YelpCamp server started... listing at port: 3000");
});
























