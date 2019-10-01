var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var connectMongo = require('connect-mongo')(session);
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// map global promisies / get reed of worning
mongoose.Promise = global.Promise;
// connection to mongoose
mongoose.connect('mongodb://localhost/rateme', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session middle ware
app.use(session({
  secret: 'Secret',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
