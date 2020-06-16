var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    MethodOverride = require("method-override"),
    User         = require("./models/user"),
    Blog  = require("./models/blog"),
    flash        = require("connect-flash"),
    cookieParser = require('cookie-parser'),
    session      = require("express-session");

    var MemoryStore = require('session-memory-store')(session);

    var app = module.exports = express();
    
    app.use(cookieParser());
    
    app.use(session({
      name: 'JSESSION',
      secret: 'my secret',
      store: new MemoryStore(),
      resave: false,
      saveUninitialized: false
    }));

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
    app.use(MethodOverride("_method"));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    app.listen(process.env.PORT || 8081, function(){
        console.log("App has started");
    });
    
    app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
    });

 

    app.use(indexRoutes);
    app.use("/blogs", blogRoutes);

