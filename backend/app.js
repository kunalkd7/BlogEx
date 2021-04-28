var createError = require('http-errors');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var connection = require('./config/db');
connection(); //for connecting to database // config

//API
var userapiRouter = require('./blog-api/userapi');
var blogapiRouter = require('./blog-api/blogapi')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/userapi', userapiRouter);
app.use('/blogapi', blogapiRouter);


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
