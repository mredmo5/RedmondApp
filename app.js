var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");


  
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

    app.listen(process.env.PORT || 8096, function(){
        console.log("App has Started...");
    });

    app.get("/", function(req, res){
        res.redirect("index");
    });
    
    
    app.get("/index" , function(req, res){
        res.render("index");
    })
    app.get("/about" , function(req, res){
        res.render("about");
    })
    app.get("/nonprofit" , function(req, res){
        res.render("nonprofit");
    })
    app.get("/todo" , function(req, res){
        res.render("todo");
    })
    // var indexRoutes = require("./routes/index");


    // app.use(indexRoutes);

