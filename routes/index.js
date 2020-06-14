var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get("/", function(req, res){
    res.render("landing");
});


router.get("/index" , function(req, res){
    res.render("index");
})

module.exports = router;