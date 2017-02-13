var mongoose = require("mongoose");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,  //calling _id of User
            ref: "User" //referring to User model
        },
        username: String
    },
    comments: [     //Reference to the comment
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

