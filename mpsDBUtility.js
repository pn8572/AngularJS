/*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 03/02/2017
 * 
 *  This utility file is for
 *  interacting with database and other CRUD operations
 */
'use strict';

var sql = require('mssql');
//Added for database connectivity
var dbConnection = require('./mpsDBConnection');

// retrieve REPORT_CATEGORIES details
var reportCategoryDetails = function getReportCategory() {
  var conn = dbConnection.connection();
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
// retrieve ALL USERS details
var usersDetails = function getUsers() {
  var conn = dbConnection.connection();
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
  return recordset;
}

// retrieve specific USER details
var userSpecificDetails = function (userId) {
  var conn = dbConnection.connection();
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS where USERID="+userId).then(function (recordset) {
      
      console.log(recordset);
      console.log('This is now successful return of User'+userId);
    })
    .catch(function (err) {
      //console.log(err);
    });
  })
  .catch(function (err) {
    //console.log(err);
  });
}
//userSpecificDetails();

/*var userSpecificDetails = function getUserDetails(userId) {
  var conn = dbConnection.connection();
  var user = {};
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS where USERID="+userId).then(function (recordset) {
      
      user = recordset;
      //console.log(user);
      console.log('This is now successful return of User'+userId);
    })
    .catch(function (err) {
      //console.log(err);
    });
  })
  .catch(function (err) {
    //console.log(err);
  });
  return user;
}*/

/*
var userSpecificDetails = function (userId) {
  var conn = dbConnection.connection();
  var user = [];
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS where USERID="+userId).then(function (err, recordset) {
      
      if (err) 
            callback(err,null);
        else
            callback(null,recordset);
    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
  return user;
}*/
module.exports = {reportCategoryDetails, usersDetails, userSpecificDetails};
