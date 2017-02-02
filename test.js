'use strict';

/**
 * Module dependencies.
 */

//============================SQL========================================
var sql = require('mssql');

/*var connection = sql.createConnection({
  host     : 'GBTedPPcl1SQL1\Common',
  user     : 'ra.p.pillai',
  password : 'Teddington18th',
  database : 'FRSTestWebPortal'
});

connection.connect();*/

//sql.connect("mssql://svc_sql_frstestwebportal:RsSGvNRZFtbG1DIrxP12@FRSTestWebPortal");
 
//sql.connect("mssql://ra.p.pillai:Teddington18th@GBTedPPcl1SQL1:1433/FRSTestWebPortal").then(function() {
	sql.connect("mssql://svc_frstestwebportal:U6o5tMrwZSTJKxuhjReuW2bEI09uII@GBTedPPcl1SQL1:1433/FRSTestWebPortal").then(function() {
    // Query 
    
    new sql.Request().query('select * from mytable').then(function(recordset) {
        console.dir(recordset);
    }).catch(function(err) {
    	console.log(err);
    });
 
    // Stored Procedure 
    
    new sql.Request()
    .input('input_parameter', sql.Int, value)
    .output('output_parameter', sql.VarChar(50))
    .execute('procedure_name').then(function(recordsets) {
        console.dir(recordsets);
    }).catch(function(err) {
        // ... execute error checks
        console.log(err);
    });
    
    // ES6 Tagged template literals (experimental) 
    
    sql.query`SELECT * from USER where userid = ${'101'}`.then(function(recordset) {
        console.dir(recordset);
    }).catch(function(err) {
        // ... query error checks
        console.log(err);
    });
}).catch(function(err) {
    // ... connect error checks
    console.log(err);
});



//============================LDAP========================================
// var ldap = require('./server/config/database.js');

// Add User
/*ldap.addUser('15', 'David', 'Banner', 'passwordDavid1').then(function () {
  console.log('Successful addition');
}, function () {
  console.log('error can\'t add user');
});
*/

// Authenticate
/*ldap.authenticate('jason', '1234567!QWERabc').then(function () {
  console.log('Successful Authentication');
}, function () {
  console.log('error');
});
*/
// Authenticate
/*ldap.find('ou=MPS,ou=_Staff-Users', function(err, res) {
  console.log('Successful Search');
}, function () {
  console.log('error');
});*/
