/*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 03/02/2017
 * 
 *  This node.js will perform the test for password encryption
 *  using sha512 and salt with hashing.
 *  The user entered password will be encyrpted using sha512 and use the mechanism 
 *  of salt with hashing.The salt and hash will be stored in the database.
 *  
 *  Then combine the user-entered pwd with that salt, 
 *  hash it with the same hashing technique and finally compare the result with 
 *  the hash fetched from the db.
*/


'use strict';

//Added for password hashing using sha512
var sha512PasswordValue = require('./sha512PasswordEncryption');

//Added for database connectivity
var dbConnection = require('./mpsDBConnection');

//Added for database activities
var dbUtility = require('./mpsDBUtility');

//var encryptedPassword = sha512PasswordValue.hash('password');

//var salt = encryptedPassword.salt;
//var hash = encryptedPassword.passwordHash;
//console.log("\nOriginal Password hash is :"+hash);

//var result = sha512PasswordValue.validate('password',salt);

var conn = dbConnection.connection();

var sql = require('mssql');

/*
 * Password encryption checking process here
 */
// retrieve specific USER details
function userSpecificDetails(userId, newPassword) {
  var conn = dbConnection.connection();
  conn.connect().then(function () {
    var req = new sql.Request(conn);
    var queryResult;
    req.query("SELECT [SALT],[PASSWORD_HASH] FROM USERS where USERID="+userId).then(function (recordset) 
    {
        var dbSalt = recordset[0].SALT;
        var dbHash = recordset[0].PASSWORD_HASH;
        var result = sha512PasswordValue.validate(newPassword,dbSalt);
        console.log("salt from db :"+dbSalt);
    if (result.passwordHash == dbHash)
      console.log('Successful return of User '+userId);
    else
      console.log('Unsuccessful');

    })
    .catch(function (err) {
      console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
}

module.exports = {
  'hash': userSpecificDetails
};
