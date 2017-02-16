var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var compression = require('compression');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./server/config/database');
var expressJwt = require('express-jwt');
var passport = require('passport');
var crypto = require('crypto');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');
var path = require('path');
var saveFile = require('./saveLoginActivity');
var api = require('./server/routes');
var port = process.env.PORT || 9000;

var app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.use(express.static(path.join(__dirname, './src')));

require('./server/config/passport')(passport);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.header("Access-Control-Allow-Credentials: true");
  res.header('Access-Control-Allow-Origin', '*');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.set('port', port);
app.set('views', path.join(__dirname, './server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: db.config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
  })
);

require('./server/routes.js')(app, passport);
app.get('/', function (req, res) {
  return res.redirect('/app');
});

io.on('connection', function (socket) {
  socket.on('disconnect', function() {
    console.log('user has disconnected');
  });
});

module.exports = app;

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
