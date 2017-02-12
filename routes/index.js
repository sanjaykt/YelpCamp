var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function (req, res) {
    res.render("landing");
});

//register form route
router.get("/register", function (req, res) {
    res.render("register");
});

//handing the register route
router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        })
    })
});

//show login page
router.get("/login", function (req, res) {
    res.render("login");
});

//login  logic
//app.post("/logic", middleware, callback)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function (req, res) {
});

//logout
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});



module.exports = router;