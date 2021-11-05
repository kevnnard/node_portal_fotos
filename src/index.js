const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const MongoStore = require("connect-mongo");
const uuid = require('uuid/v4');
const { format } = require('timeago.js');
const session = require("express-session");
const methodOverride = require( "method-override");
const userC = require("./libs/createUser");
const path = require('path');
const config = require( "./config");
require("./config/passport");
require('./database');
const passport = require("passport");
const flash = require("connect-flash");

// intializations

const app = express();
userC;


// settings
app.set("port", config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    res.locals.user = req.user || null;
    app.locals.format = format;
    next();
  });
// routes

app.use(require('./routes/index'));
app.use(require('./routes/user'));

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
    res.render("404");
  });

app.listen(app.get("port"));

console.log("Servidor En Linea", app.get("port"));
console.log("Environment:", process.env.NODE_ENV);

module.exports = app;
