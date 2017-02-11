var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

//CREATE route
router.post("/", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    //push the new campground in the array
    var newCampground = {name: name, image: image, description: desc};

    Campground.create(newCampground, function (err, newItems) {
        if(err){
            console.log(err);
        } else {
            //create a new entry and redirect to show the campgrounds
            res.redirect("/campgrounds");
        }
    })
});

//NEW route
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});


//SHOW route
router.get("/:id", function (req, res) {
    //this will populate the campground with comments, but leave the database as is...
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    // console.log(req.params);
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;