/*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 09/02/2017
 * 
 *  Insert user activities to MPS_PORTAL_ACTIVITIES table
 *  
 */
var sql = require('mssql');
var dbConfig = require('../config/database');

/*
 *  Insert login activity details to  MPS_PORTAL_ACTIVITIES   
 */

var logUserActivity = function (userId, dateTime, ipAddress, operationType, eventType, additionalInfo) {
  var conn = new sql.Connection(dbConfig.connection);
  conn.connect().then(function () {
  var req = new sql.Request(conn);
  req.query("INSERT INTO MPS_PORTAL_ACTIVITIES (USER_ID,DATE_TIME,IP_ADDRESS,OPERATION_TYPE,EVENT_TYPE,ADDITIONAL_INFO) VALUES('"+userId+"','"+dateTime+"','"+ipAddress+"','"+operationType+"','"+eventType+"','"+additionalInfo+"')").then (function () {
  console.log('Successfully INSERTED RECORD INTO MPS_PORTAL_ACTIVITIES for USER '+userId);
      })
      .catch(function (err) {
        console.log(err);
        return;
      });
  });
};

/*
 *  Update the USERS table with    
 */

var disableUser = function (userId) {
  var conn = new sql.Connection(dbConfig.connection);
  conn.connect().then(function () {
  var req = new sql.Request(conn);
  req.query("UPDATE USERS SET DISABLED_USER = 1 WHERE USERID = "+userId).then (function () {
  console.log('SUCCESSFULLY UPDATED USERS for USER '+userId);
      })
      .catch(function (err) {
        console.log(err);
        return;
      });
  });
};

/*
 *  @date 16/02/2017
 *  Update the USERS table with new bad password counter  
 *
 */
var updatePasswordRetry = function (userId, numberOfAttempts) {
  var conn = new sql.Connection(dbConfig.connection);
  conn.connect().then(function () {
  var req = new sql.Request(conn);
  req.query("UPDATE USERS SET BADPASSWORD_COUNTER = "+numberOfAttempts+" WHERE USERID = "+userId).then (function () {
  console.log('SUCCESSFULLY UPDATED BADPASSWORD_COUNTER in USERS FOR USER '+userId);
      })
      .catch(function (err) {
        console.log(err);
        return;
      });
  });
};

module.exports = {
  'logUserActivity': logUserActivity,
  'disableUser' : disableUser,
  'updatePasswordRetry' : updatePasswordRetry
};

//uncomment below lines only for unit testing
//logUserActivity(100,'2016-03-27 10:50:00.000','13.44.256.11','Admin','Account Approval','A new user account [prasanth] has been approved');
//logUserActivity(100,'2016-02-02 23:50:00.000',null,'Admin','Account Approval','A new user account [John] has been approved');
//disableUser(23);
//updatePasswordRetry(200,5)
