var express = require('express');
var app = express();
var sql = require("mssql");
// config for your database
var config = {
 user: 'schmidmj',
 password: 'Rithvik2',
 server: 'golem.csse.rose-hulman.edu', 
 database: 'BoardGameTracker' 
 };
 
 app.use(express.static('public'));
 app.get('/', function (req, res) { 
 
 // connect to your database
 sql.close();
 sql.connect(config, function (err) {
 
 if (err) console.log(err);
 
 // create Request object
 var request = new sql.Request();
 
 // query to the database and get the data
 request.query('EXECUTE GetGames', function (err, recordset) {
 
 if (err) console.log(err)
 
 // send data as a response
 res.send(recordset);
 });
 });
});

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
	console.log('started server on 8000');
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
		
    });
	
}).listen(8000);

	

