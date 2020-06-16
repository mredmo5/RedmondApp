var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");
var Busboy = require("busboy");
var expressfileupload = require("express-fileupload");
var multer = require('multer');

//multer single file upload
var storage = multer.diskStorage({
    filename: function(req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });
  var imageFilter = function (req, file, cb) {
      // accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter});


  //cloudinary
    var cloudinary = require('cloudinary');
    cloudinary.config({ 
    cloud_name: 'radiantauto', 
    api_key: '413357176465871', 
    api_secret: 'AU64sk0nNowGnnKFqXHXX_nq_w4'
});

router.get("/", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err) {
            console.log(err);
        } else {
            res.render("blogs/home" , {blogs:allBlogs, currentUser: req.user})
        }
    });

});


router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    cloudinary.uploader.upload(req.file.path, function(result) {
        // add cloudinary url for the image to the campground object under image property
        req.body.blog.image = result.secure_url;
        // add author to campground
        req.body.blog.author = {
          id: req.user._id,
          username: req.user.username
        }
        Blog.create(req.body.blog, function(err, blog) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          res.redirect('/blogs/' + blog.id);
        });
      });

    });




router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/new");
});

//SHOW
router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log(err);
        } else {
            res.render("blogs/show", {blog: foundcamp});
        }
    });

    
});

//Edit Campr
router.get("/:id/edit", middleware.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, foundcamp){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("blogs/edit", {blog: foundcamp})
        }
    });

});

//Update camp
router.put("/:id", middleware.isLoggedIn, function(req, res){
    //fin and update the correct camp
    Blog.findByIdAndUpdate(req.params.id, req.body.Blog, function(err, updatecamp){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
    //redirect
})

//Destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs")
        }
    });
});




module.exports = router;