var express = require("express");
var router = express.Router({mergeParams: true}); //mergeParams will merge params from Campground and Comments... we have this line because in app.js file we are defining the initial route path as app.use("/campgrounds/:id/comments", commentRoutes)... it was working fine when we didn't have this line
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//Comments new
router.get("/new", isLoggedIn , function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

//Comments Create
router.post("/", isLoggedIn,  function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id; //add user and id to comment
                    comment.author.username = req.user.username;
                    comment.save();     //save the comment
                    campground.comments.push(comment);
                    campground.save();
                    // console.log(campground);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;