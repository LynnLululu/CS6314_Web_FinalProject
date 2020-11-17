var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyparser = require('body-parser');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var favoriteRouter = require('./routes/favorite');
var ordersRouter = require('./routes/orders');
var usersRouter = require('./routes/users');
var testRouter = require('./test/test_post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// use session
app.use(session({
	secret :  'secret',  // signed cookie
    resave : true,
    saveUninitialized: false, // save as initial?
    cookie : {
        maxAge : 1000 * 60 * 3, // set session's valid time
    },
}));

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/favorite', favoriteRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);

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
