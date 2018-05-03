
var exports = module.exports = {};
var sql = require("mssql");

// config for your database
var config = {
 user: 'schmidmj',
 password: 'Rithvik2',
 server: 'golem.csse.rose-hulman.edu', 
 database: 'BoardGameTracker' 
 };
 var RequestClass = function() {
    // run code here, or...
	this.id = 'id_1'
}; 


 
 RequestClass.prototype.getList = function() {
	  sql.close();
 sql.connect(config, function (err) {
	if (err) console.log(err);
 	// create Request object
	var request = new sql.Request();
	// query to the database and get the data
	request.query('EXECUTE GetGames', function (err, recordset) {
		if (err) console.log(err)
		// send data as a response
		console.log(recordset);
		return recordset;
	});
 });
 }
exports.Request = RequestClass;
