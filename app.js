var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"}
];


app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;

    //push the new campground in the array
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs")
});


app.listen(3000, function () {
    console.log("YelpCamp server started... listing at port: 3000");
});