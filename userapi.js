/*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 15/02/2017
 * 
 *  This node.js will perform the CRUD operations for USER table
 */

var dbconfig = require('../config/database');
var sql = require('mssql');
var dateFormat = require('dateformat');
var conn = new sql.Request(dbconfig.connection);
var sha512PasswordValue = require('../config/sha512PasswordEncryption');


/*
 * find all users function
 */
exports.getAll = function (req, res) {
  var conn = new sql.Connection(dbconfig.connection);
 // var users;
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS").then(function (recordset, err) {
      if (err) {
        res.writeHead(500, "Internal Server Error", {"content-type":"text/html"});
        res.write("<html><title>500</title><body>internal error:" + err + "</body></html>");
        res.end();
      } else {
        res.send(recordset);
      }
      conn.close();
    });
  });
};

/*
 * find specific user function
 */
exports.getUser = function (req, res) {
  var id = req.params.id;
  var req = new sql.Request(conn);
  var conn = new sql.Connection(dbconfig.connection);
  var users;
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    req.query("SELECT * FROM USERS WHERE USERID =" +id).then(function (recordset, err) {
      if (err) {
        res.writeHead(500, "Internal Server Error", {"content-type":"text/html"});
        res.write("<html><title>500</title><body>internal error:" + err + "</body></html>");
        res.end();
      } else {
        res.send(recordset);
      }
      conn.close();
      res.redirect('/users');
    });
  });
};

/*
 * create user function
 */
exports.createUser = function (req, res) {
  var input = req.body[0];
  var conn = new sql.Connection(dbconfig.connection);
  conn.connect().then(function () {
    var reqQuery = new sql.Request(conn);
    var isAdmin = (1 === input.ADMINISTRATOR || input.ADMINISTRATOR.trim() === '1');
    var isDisabled = (1 === input.DISABLED_USER || input.DISABLED_USER.trim() === '1');
    var loginDate = ((isNaN(input.LOGIN_DATE) && !(input.LOGIN_DATE === 'null')) ? dateFormat(input.LOGIN_DATE, "yyyy-mm-dd h:MM:ss") : null );
    var passwordChangeDate = ((isNaN(input.PASSWORD_CHANGED_DATE) && !(input.PASSWORD_CHANGED_DATE === 'null'))  ? dateFormat(input.PASSWORD_CHANGED_DATE, "yyyy-mm-dd h:MM:ss"): null );
    var passwordCounter = 0; //since for initial creation, the value needs to be 0
    var password = input.PASSWORD;
    var encryptedPassword = sha512PasswordValue.hash(password);
    var salt = encryptedPassword.salt;
    var hash = encryptedPassword.passwordHash;

    reqQuery.query("INSERT INTO USERS (POLICEID, FIRSTNAME, LASTNAME, DEPARTMENT, EMAIL,ADMINISTRATOR,DISABLED_USER,TOKEN,SERVERTOKEN,REFRESHTOKEN,SALT,PASSWORD_HASH,LOGIN_DATE,PASSWORD_CHANGED_DATE,BADPASSWORD_COUNTER) VALUES('"+input.POLICEID+"','"+input.FIRSTNAME+"','"+input.LASTNAME+"','"+input.DEPARTMENT+"','"+input.EMAIL+"','"+isAdmin+"','"+isDisabled+"','"+input.TOKEN+"','"+input.SERVERTOKEN+"','"+input.REFRESHTOKEN+"','"+salt+"','"+hash+"',"+loginDate+","+passwordChangeDate+","+passwordCounter+")").then(function (rows, err) {
      if (err) {
            res.writeHead(500, "Internal Server Error", {"content-type":"text/html"});
            res.write("<html><title>500</title><body>internal error:" + err + "</body></html>");
            res.end();
      } else {
            res.send(rows);
      }
      conn.close();
      });// query ends here
  });
}; // End createUser export


/*
 * delete user function
 */
exports.deleteUser = function (req, res) {

var id = req.params.id;
var conn = new sql.Connection(dbconfig.connection);
conn.connect(function () {
  var req = new sql.Request(conn);
  req.query("DELETE FROM USERS WHERE USERID =" +id, function (err, rows) {
    if (err) {
      console.log("Error deleting : %s ", err);
      //return done(rows, false);
    } else {
      console.log("Successfully deleted user "+id)
     // return done(rows, true);
    }
    conn.close();
    //res.redirect('/users');
  });
});
};// end deleteUser

/*
 * modify user function
 */
exports.updateUser = function (req, res) {
  var id = req.params.id;
  var input = req.body[0];
  var conn = new sql.Connection(dbconfig.connection);
  conn.connect().then(function () {
  var reqQuery = new sql.Request(conn);
  var isAdmin = (1 === input.ADMINISTRATOR || input.ADMINISTRATOR.trim() === '1');
  var isDisabled = (1 === input.DISABLED_USER || input.DISABLED_USER.trim() === '1');
  var loginDate = ((isNaN(input.LOGIN_DATE) && !(input.LOGIN_DATE === 'null')) ? dateFormat(input.LOGIN_DATE, "yyyy-mm-dd h:MM:ss") : null );
  var intValIsAdmin = (isAdmin === true) ? 1 : 0;
  var intValIsDisabled = (isDisabled === true) ? 1 : 0;
  
  /*
   * From the user manage screen, there will not be any update on TOKEN,SERVERTOKEN,REFRESHTOKEN,SALT,PASSWORD_HASH,LOGIN_DATE,PASSWORD_
   * CHANGED_DATE,BADPASSWORD_COUNTER fields. The below cpmmented query is for updating all fields just in case .
   * reqQuery.query("UPDATE USERS SET POLICEID = '"+input.POLICEID+"', FIRSTNAME = '"+input.FIRSTNAME+"', LASTNAME ='"+input.LASTNAME+"', DEPARTMENT='"+input.DEPARTMENT+"', EMAIL ='"+input.EMAIL+"', ADMINISTRATOR='"+intValIsAdmin+"', DISABLED_USER='"+intValIsDisabled+"', TOKEN='"+input.TOKEN+"', SERVERTOKEN='"+input.SERVERTOKEN+"', REFRESHTOKEN='"+input.REFRESHTOKEN+"',SALT = '"+input.SALT+"',PASSWORD_HASH='"+input.PASSWORD_HASH+"' WHERE USERID ="+id).then(function (rows, err) {
   */
  reqQuery.query("UPDATE USERS SET POLICEID = '"+input.POLICEID+"', FIRSTNAME = '"+input.FIRSTNAME+"', LASTNAME ='"+input.LASTNAME+"', DEPARTMENT='"+input.DEPARTMENT+"', EMAIL ='"+input.EMAIL+"', ADMINISTRATOR='"+intValIsAdmin+"', DISABLED_USER='"+intValIsDisabled+"' WHERE USERID ="+id).then(function (rows, err) {
  if (err) {
      console.log("Error Occured................................")
      console.log(err)
      res.writeHead(500, "Internal Server Error", {"content-type":"text/html"});
      res.write("<html><title>500</title><body>internal error:" + err + "</body></html>");
      res.end();
  } else {
      console.log("USER TABLE UPDATED SUCCESSFULLY....")
      res.send(rows);
    }
    conn.close();
  });// query ends here
  });
}; // End updateUser export
