'use strict';

/**
  * Module Dependencies.
*/

// Import the Modules installed to our server
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var session = require('express-session');
var flash = require('connect-flash');
var compress = require('compression');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var LdapStrategy = require('passport-ldapauth').Strategy;
var LdapStrategy = require('passport-ldapjs').Strategy;
var ldap = require('./server/config/database'); // get db config file

var ldap2json = require('node-ldap2json');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');

// Setup Routes
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var downloads = require('./server/routes/downloads');
var saveFile = require('./saveLoginActivity');

//==================================================================
// Passport Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Acl.findOne({id:id}).exec(function(err, user) {
    done(err, user);
  });
});

// Define the strategy to be used by PassportJS
passport.use(
  new LdapStrategy({
    server: {
      url: 'ldap://10.44.29.223:389',
      adminDn: 'ldapbind',
      adminPassword: 'Friday20',
      searchFilter: '(sAMAccountName={{username}})',
      searchBase: 'DC=external,DC=lgc-group,DC=com'
    },
    passReqToCallback: true
  }, function (user, password, done) {
      if (!user || username === "admin" && password === "admin") {
        return done(null, false, {
          name: "admin",
          message: 'Unauthorised user'
        });
      }
      return done(null, false, {message: 'Incorrect username.'});

      Acl.findOne({username:user.uid}).exec(function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    }
  )
);

// Defining a middleware function to be used for every secured routes
var auth = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(401);
  } else {
    next();
  }
};

//==================================================================
// Start the express web framework
var app = express();

// APP SETTERS: Set up all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// APP USERS: Set up all user initialisation
// app.use(express.favicon());
// app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.use(morgan('dev'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

//==================================================================
// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.header("Access-Control-Allow-Credentials: true");
  res.header('Access-Control-Allow-Origin', '*');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'securedsession'  // config.sessionSecret
}));

app.use(flash());
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// Set Static Angular folder
app.use(express.static(path.join(__dirname, './src')));
// app.use(express.static(path.join(__dirname, './src/, /js')));
// app.use(express.static('./downloads'));

// Development only
/*
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/

// Defining routes
app.use('/', routes);
app.use('/users', users);
app.use('/downloads', downloads);
// require('../app/routes/index.js')(app);
// require('../app/routes/users.js')(app);
// require('../app/routes/downloads.js')(app);

//==================================================================
// Getting Routes
app.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/users', auth, function (req, res) {
  res.send([{name: "user1"}, {name: "user2"}]);
});

/*
app.get('/', routes.index);
app.get('/users', auth, user.list);
*/

//comments : Prasanth Pillai 
//save the login activity to a text file

saveFile.logFile();
//==================================================================
// Setting up COOKIE
"Set-Cookie: fileDownload=true; path=file:///C:/mps/reports/"

// SOCKET Attaching
io.on('connection', function (socket) {
  socket.on('disconnect', function() {
    console.log('user has disconnected');
  });
});

// ==============CONNECT DATABASE=================================
// Getting Routes to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// Process the login form for LDAP
// app.post('/login', passport.authenticate('local'), function (req, res) {
app.post('/login', passport.authenticate('ldapjs'), function (req, res) {
  res.send(req.user);
  // Success test check
  /*successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true*/
});

// route to log out
app.post('/logout', function (req, res) {
  req.logOut();
  res.send(200);
});


// ===============END CONNECT DATABASE=========================

// ERROR PAGES
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export App Globally
module.exports = app;

// Enable Port

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
