const express = require('express');
const app = express();
const sql = require('mssql');
var rhUser = null; //Stores the current user, see rosefire.min.js for fields
const config = {
 user: 'BoardGames38',
 password: 'TwilightImperium20',
 server: 'golem.csse.rose-hulman.edu', 
 database: 'BoardGameTracker' 
 };
 
app.use(express.static(__dirname + '/public')); // exposes homepage.html, per below

app.get('/request', function(req, res) {
	console.log("Beginning Server Request");
	new Promise(
		function (resolve, reject){
			resolve(getGames());
		}
	).then(
		function (fulfilled) {
			//console.log(JSON.stringify(fulfilled));
			//res.json('[{"name":"game1","description":"test 1","complexity":3,"playTime":"10 hours","numPlayers":5},{"name":"game2","description":"test 2","complexity":2,"playTime":"3 hours","numPlayers":2},{"name":"game3","description":"test 3","complexity":3,"playTime":"3 hours","numPlayers":3}]');
			res.json(fulfilled);
			console.log("Completed Server Request");
		}
	);
	
});

app.get('/requestProfile', function(req, res) {
	console.log("Beginning Server Request");
	new Promise(
		function (resolve, reject){
			resolve(getGamesProfile());
		}
	).then(
		function (fulfilled) {
			res.json(fulfilled);
			console.log("Completed Server Request");
		}
	);
	
});

app.get('/requestAvailable', function(req, res) {
	console.log("Beginning Server Request");
	new Promise(
		function (resolve, reject){
			resolve(getAvailableGames());
		}
	).then(
		function (fulfilled) {
			res.json(fulfilled);
			console.log("Completed Server Request");
		}
	);
	
});

app.get('/userCheck', function(req, res){
	console.log("checking user" + req.query.user.username);
	rhUser = req.query.user;
	console.log(rhUser.name);
	console.log(rhUser.username);
	new Promise(
		function (resolve, reject){
			resolve(userCheck(req.query.user.username));
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("verified user");
		}
	);
});

app.get('/search', function(req, res) {
	console.log("Beginning search");
	console.log(rhUser.name);
	console.log(req.query.searchTerm);
	new Promise(
		function (resolve, reject){
			resolve(searchGames(req.query.searchTerm));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("completed search request");
		}
	);
});

app.get('/addCheckOut', function(req, res) {
	console.log("Beginning check out");
	console.log(rhUser.name);
	new Promise(
		function (resolve, reject){
			resolve(addCheckOut(req.query.gid, rhUser.username));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("completed search request");
		}
	);
});


app.get('/home', function(req,res) {
    res.sendFile('homepage.html', {root : __dirname + '/public'});
})

app.get('/profile', function(req,res) {
    res.sendFile('profile.html', {root : __dirname + '/public'});
})

app.get('/checkOut', function(req,res) {
    res.sendFile('checkOut.html', {root : __dirname + '/public'});
})

//Checks if user exists as borrower, if they don't adds them to borrowers table
async function userCheck(user){
	console.log("checking " + user + " on server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(100), user)
			.execute('userExist');
		sql.close();
		console.log("Userexists");
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function searchGames(searchTerm){
	console.log("Searching games on server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('term', sql.VarChar(100), searchTerm)
			.execute('SearchGame');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Games From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function addCheckOut(gid, username){
	console.log("Adding Check Out");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('gid', sql.Int, gid)
			.input('username', sql.VarChar(10), username)
			.execute('addNewCheckedOut');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Added Check Out To Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getGames() {
	console.log("Requesting Games From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.execute('GetGames');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Games From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getGamesProfile() {
	console.log("Requesting " + rhUser.username + " Games From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), rhUser.username)
			.execute('getCheckedOutGames');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received " + rhUser.username + " Games From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getAvailableGames() {
	console.log("Requesting Available Games From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.execute('getAvailableGames');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Available Games From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

var server = app.listen(80, function () {
 console.log('Server Running on Port 80');
});
