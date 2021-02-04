var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// Routers that have all the get/post etc routes

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var detailsRouter = require('./routes/details');
var attachRouter = require('./routes/attach');
var aboutRouter = require('./routes/about');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var cookiesRouter = require('./routes/cookies');

// Create a variable named "app" to represent our application and invoke Express()
var app = express(); 

// Hide your Mongo connection variables 
require('dotenv').config()

//partials
hbs.registerPartials(__dirname + '/views/partials');
// Mongo DB Connection 

//const dbURI = 'mongodb+srv://Bruce:test1234@cluster0.5utrm.mongodb.net/cluster0?retryWrites=true&w=majority';
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER, 
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// View Engine Setup

app.set('views', path.join(__dirname, 'views')); // setting folder for public files
app.set('view engine', 'hbs'); // setting view engine to hbs, engine compiles views and data into HTML

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Routes

app.use('/', indexRouter); // Router for home page 
app.use('/create', createRouter);
app.use('/attach', attachRouter)
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/cookies', cookieParser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;