'use strict';
var sql = require('mssql');
var dbconfig = require('./server/config/database');

var conn = new sql.Request(dbconfig.connection);

//var filesSort = require('./fileUtility');

var logUserActivity = require('./server/model/logUserActivity');

var dbConfig = {
  server: 'GBTedPPcl1SQL1\\Common',
  database: 'FRSTestWebPortal',
  user: 'svc_frstestwebportal', // 'CORP\\svc_sql_frstestwebportal', 'svc_frstestwebportal'
  password: 'U6o5tMrwZSTJKxuhjReuW2bEI09uII',  // ca2A79e213ff67f85C5f9beffd3ad5  U6o5tMrwZSTJKxuhjReuW2bEI09uII
  port: 1433,
  options: {trustedConnection: true, useUTC: true}
};

var dbConfig = {
  server: 'GBTedPPcl1SQL1\\Common',
  database: 'FRSTestWebPortal',
  user: 'svc_frstestwebportal', // 'CORP\\svc_sql_frstestwebportal', 'svc_frstestwebportal'
  password: 'U6o5tMrwZSTJKxuhjReuW2bEI09uII',  // ca2A79e213ff67f85C5f9beffd3ad5  U6o5tMrwZSTJKxuhjReuW2bEI09uII
  port: 1433,
  options: {trustedConnection: true, useUTC: true}
};

function getUser() {
  var conn = new sql.Connection(dbconfig.connection);
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM REPORT_CATEGORIES").then(function (recordset) {
      console.log(recordset);
      console.log('This is now successful');
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
}

logUserActivity.logUserActivity(200,'2016-02-09 16:50:00.000','23.54.222.33','Admin','Account Rejected','A new user account [XYZ] has been rejected');
logUserActivity.updatePasswordRetry(38,5);

//filesSort.fileResult;

//uncomment to test delete user
//deleteResult.deleteUser(103);
//getUser();


// STAGING ===========================================

// Import Database SQL
/*var sql = require('mssql');

var dbConfig = {
  server: 'GBTedPPcl1SQL1\\Common',
  database: 'FRSStagingWebPortal',
  user: 'svc_frsstagingwebportal', // 'CORP\\svc_sql_frstestwebportal', 'svc_frstestwebportal'
  password: '9myHa5y6lJ3OuB4PtiiM0QgxIhcDdh',  // ca2A79e213ff67f85C5f9beffd3ad5  U6o5tMrwZSTJKxuhjReuW2bEI09uII
  options: {trustedConnection: true, useUTC: true}
};

function getUser() {
  var conn = new sql.Connection(dbConfig);
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS").then(function (recordset) {
      console.log(recordset);
      console.log('This is now successful');
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
}
getUser();*/

//uncomment to test delete user
//deleteResult.deleteUser(103);
//getUser();


// STAGING ===========================================

// Import Database SQL
/*var sql = require('mssql');

var dbConfig = {
  server: 'GBTedPPcl1SQL1\\Common',
  database: 'FRSStagingWebPortal',
  user: 'svc_frsstagingwebportal', // 'CORP\\svc_sql_frstestwebportal', 'svc_frstestwebportal'
  password: '9myHa5y6lJ3OuB4PtiiM0QgxIhcDdh',  // ca2A79e213ff67f85C5f9beffd3ad5  U6o5tMrwZSTJKxuhjReuW2bEI09uII
  options: {trustedConnection: true, useUTC: true}
};

function getUser() {
  var conn = new sql.Connection(dbConfig);
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS").then(function (recordset) {
      console.log(recordset);
      console.log('This is now successful');
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
}
getUser();*/
