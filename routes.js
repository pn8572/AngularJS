var dbconfig = require('./config/database');
var sql = require('mssql');
api = require('./routes/userapi');

sql.connect(dbconfig.connection, function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Database connection is running');
  }
});

// RESTFUL API SERVICES
module.exports = function(app, passport) {

  app.get('/api/reports', function (req, res, next) {
    var reportsConfig = {
      // host: window.location.hostname, // For development
      host: dbconfig.config.reportsHost, // For Staging
      port: dbconfig.config.reportsPort,
      path: dbconfig.config.reportsPath,
    }
    res.send(reportsConfig);
  });

  app.post('/api/login', function(req, res) {
    passport.authenticate('login', function(message, isAuthenticated) {
      res.send(isAuthenticated);
    })(req, res);
  });

  app.get('/api/get/isadmin', function(req, res) {
    passport.authenticate('is-admin-user', function(message, isAdmin) {
      res.send(isAdmin);
    })(req, res);
  });

  app.post('/api/isauthenticated', function(req, res) {
    passport.authenticate('is-authenticated', function(message, isAuthenticated) {
      res.send(isAuthenticated);
    })(req, res);
  });
  app.post('/api/create/user', function(req, res) {
    passport.authenticate('create-user', function(message, isCreated) {
      res.send(isCreated);
    })(req, res);
  });

  /*app.post('/api/delete/user', function(req, res) {
    passport.authenticate('delete-user', function(message, isDeleted) {
      res.send(isDeleted);
    })(req, res);
  });*/

  app.get('/api/logout', function(req, res) {
  //??
  });

  /*app.get('/api/get/users/', api.users);
  app.get('/api/users/:id', api.findUser);
  app.post('/api/users/:id', api.createUser);
  app.put('/api/users/:id', api.updateUser);
  app.delete('/api/users/:id', api.deleteUser);*/

  app.get('/api/users/', api.getAll);
  app.get('/api/user/:id', api.getUser);
  app.post('/api/user/', api.createUser);
  app.put('/api/user/:id', api.updateUser);
  app.delete('/api/user/:id', api.deleteUser);
};
