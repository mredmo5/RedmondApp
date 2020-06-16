var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    MethodOverride = require("method-override"),
    User         = require("./models/user"),
    Blog  = require("./models/blog");

    var blogRoutes = require("./routes/blogs"),
        indexRoutes = require("./routes/index");

  
    mongoose.connect("mongodb+srv://matredmo:password1234@cluster0-3w6zg.mongodb.net/RedmondApp?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to DB");
    }).catch(err => {
        console.log("error:", err.message);
    });
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));

    app.listen(process.env.PORT || 8081, function(){
        console.log("App has Started...");
    });



 

    app.use(indexRoutes);
    // app.use("/blog", blogRoutes);

