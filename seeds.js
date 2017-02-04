var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        name: "Desert Mesa",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Test line Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
        name: "Canyon Floor",
        image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
];
// Remove all data first
function seedDB() {
    Campground.remove({}, function (err) {
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            //create three campgrond to start with
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Campgrounds created!!!")
                    }
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if(err){
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comments");
                        }
                    })
                })
            });
        }
    }) ;
}

module.exports = seedDB;
