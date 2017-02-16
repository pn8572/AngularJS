
/*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 03/02/2017
 * 
 *  This node.js will perform the password encryption
 *  using sha512 and salt with hashing.
 *  The user entered password will be encyrpted using sha512 and use the mechanism 
 *  of salt with hashing.The salt and hash will be stored in the database.
 *  
 *  Then combine the user-entered pwd with that salt, 
 *  hash it with the same hashing technique and finally compare the result with 
 *  the hash fetched from the db.
*/

'use strict';
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length)
{
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */

function sha512P(password, salt){
	var hash=crypto.createHmac('sha512',salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value=hash.digest('hex');
    return{
        salt: salt,
        passwordHash: value
    };
}

function saltHashPassword(userpassword) 
{
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512P(userpassword, salt);
    //console.log('\nUserPassword = '+userpassword);
    //console.log('Password hash = '+passwordData.passwordHash);
    //console.log('Salt = '+passwordData.salt);
    return passwordData;
}

module.exports = 
{
  'hash': saltHashPassword,
  'validate': sha512P
};