
/*
 * Script to connect to MS SQL database
 */

 /*
 *  @author Prasanth Pillai
 *  @version v1.0
 *  @date 03/02/2017
 * 
 *  database connectivity to MS SQL.
*/
'use strict';

// ===========================================
// Import Database SQL
var sql = require('mssql');

//the hardcoded values needs to be removed later
var dbConfig = 
{
  server: 'GBTedPPcl1SQL1\\Common',
  database: 'FRSTestWebPortal',
  user: 'svc_frstestwebportal', 
  password: 'U6o5tMrwZSTJKxuhjReuW2bEI09uII', 
  port: 1433,
  options: {trustedConnection: true, useUTC: true}
};

function getDBConnection() 
{
  var conn = new sql.Connection(dbConfig);
  
  return conn;
}

module.exports = 
{
  'connection': getDBConnection
};

