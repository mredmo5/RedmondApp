var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get("/", function(req, res){
    res.redirect("index");
});


router.get("/index" , function(req, res){
    res.render("index");
});

router.get("/about" , function(req, res){
    res.render("about");
});
router.get("/nonprofit" , function(req, res){
    res.render("nonprofit");
});
router.get("/todo" , function(req, res){
    res.render("todo");
    
});
router.get("/resume" , function(req, res){
    res.render("resume");
    
});
router.get("/contact" , function(req, res){
    res.render("contact");
    
});
router.post("/" , function(req, res){
    res.send("This is the Post route");
    
});

module.exports = router;