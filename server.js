var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session');
let passport = require('passport')
var logger = require('morgan');
let methodOverride = require('method-override')
let cors = require('cors')

require('dotenv').config()

var app = express();

require('./config/database')
require('./config/passport')

let indexRouter = require('./routes/index');
let playersRouter = require('./routes/players');
let usersRouter = require('./routes/users');
let dashboardsRouter = require('./routes/dashboards')
let apiRouter = require('./routes/api')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'SoccerUpdates',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/', usersRouter);
app.use('/api', apiRouter)
app.use('/dashboards', dashboardsRouter)

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
