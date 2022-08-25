var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var employeesRouter = require('./routes/api/employees');
var authRouter = require('./routes/auth');

// connecting the model here directly
require('./models/account');
// connecting passport config
require('./config/passport.config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setting up auth middleware 
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
// REST API ENDPOINTS
app.use('/api/employees', employeesRouter);
app.use('/auth', authRouter);
app.use('/auth', authRouter);




// app.post('/api/contacts', 
//   body('name').isLength({min: 2}),
//   body('email').isEmail(),
//   (req, res) => {
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   // ideal place to connect with db and exec query 
//   res.send('success');
// });
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
