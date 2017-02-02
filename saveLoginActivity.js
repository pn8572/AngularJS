/* 
 *
 * @author  Prasanth.Pillai
   @version 1.0

 * This js file is used to create a log file to monitor the 
 * log in activity of the MPS portal user.
 * The following information will be logged on to the 
 * log file on a daily basis.
 *

 *
 * Standard data to be recorded in all log entries:
 * ================================================
 *   Username
 *   Date/time
 *   IP address
 *   Operation type
 *   Event type
 *
 */

var fs = require("fs");
//var express = require('express');


var userName ='Dummy User';
var loginDateTime ='02/02/2017 10:00:00 am';
var ipAddress='127.0.0.1';
var operationType='Admin';
var eventType='Password reset by admin';
var additionalInfo='Username of subject account';
var date = getDateTime();
var logFileName = 'logActivity_'+date+'.txt';

/*
 * The  above variables needs to ne populated from the screen after successful login.
 */
//userName = request.getParameter("user");

var logFile = function () 
{
   console.log("Going to write into existing file");
   var content = userName+','+loginDateTime+','+ipAddress+','+operationType+','+eventType+','+additionalInfo;
   //fs.appendFile(logFileName, '\r\n'+content, { flag: 'wx' }, function (err) {
   fs.appendFile(logFileName, '\r\n'+content, function (err) 
   {
         if (err) 
         {
            console.log(err);
            return console.error(err);
         }
         console.log("Data written successfully!");
         console.log("Let's read newly written data");
         fs.readFile(logFileName,function (err, data) 
         {
            if (err) 
            {
               console.log(data);
               console.log(err);
               return console.error(err);
            }
            console.log("Asynchronous read: " + data.toString());
         });      
   });
}

module.exports = {logFile};

function getDateTime() 
{
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    //return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    return  day+ "_" + month + "_" +year;
}
//working code without module export

/*fs.appendFile('input.txt', '\r\n'+content,  function(err) {
   if (err) {
      return console.error(err);
   }
   
   console.log("Data written successfully!");
   console.log("Let's read newly written data");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("Asynchronous read: " + data.toString());
   });
});*/