var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//initialize it
var Campground = mongoose.model("Campground", campgroundSchema);

//create one entry - collection?

// Campground.create({
//     name: "Granite Hill",
//     image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//     description: "This is Granite Hill. No bathroom, no Water, beautiful place!!!"
// }, function (err, campground) {
//     if(err) {
//         console.log("There was an error!!!")
//     } else {
//         console.log("Successfully created an item");
//         console.log(campground);
//     }
// });


// var campgrounds = [
//     {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//     {name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg"}
// ];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;

    //push the new campground in the array
    var newCampground = {name: name, image: image, description: desc};
    // campgrounds.push(newCampground); //not using the array anymore

    Campground.create(newCampground, function (err, newItems) {
        if(err){
            console.log(err);
        } else {
            //create a new entry and redirect to show the campgrounds
            res.redirect("/campgrounds");
        }
    })
});


app.get("/campgrounds/new", function (req, res) {
    res.render("new.ejs");
});


app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {campground: foundCampground});
        }
    });
    // console.log(req.params);
});


app.listen(3000, function () {
    console.log("YelpCamp server started... listing at port: 3000");
});