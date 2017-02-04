var mongoose = require("mongoose");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    //Reference to the comment
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//initialize it
// var Campground = mongoose.model("Campground", campgroundSchema);

//install of above line, export the model and call it in app.js
module.exports = mongoose.model("Campground", campgroundSchema);

