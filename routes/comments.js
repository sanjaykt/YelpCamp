var express = require("express");
var router = express.Router({mergeParams: true}); //mergeParams will merge params from Campground and Comments... we have this line because in app.js file we are defining the initial route path as app.use("/campgrounds/:id/comments", commentRoutes)... it was working fine when we didn't have this line
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index"); //index.js is a special name... not need to specify it


//Comments new
router.get("/new", middleware.isLoggedIn , function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn,  function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    req.flash("error", "Something went wrong ");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id; //add user and id to comment
                    comment.author.username = req.user.username;
                    comment.save();     //save the comment
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    // console.log(campground);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//show comment edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership ,function (req, res) {
    Comment.findById(req.params.comment_id, function (err, fondComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: fondComment});
        }
    })
});

//comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//comment DESTROY route
router.delete("/:comment_id", middleware.checkCommentOwnership,function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;