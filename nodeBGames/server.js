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
	new Promise(
		function (resolve, reject){
			resolve(getGames());
		}
	).then(
		function (fulfilled) {
			res.json(fulfilled);
			console.log("User requested list of games.");
		}
	);
	
});

app.get('/requestProfile', function(req, res) {
	new Promise(
		function (resolve, reject){
			resolve(getGamesProfile());
		}
	).then(
		function (fulfilled) {
			res.json(fulfilled);
			console.log("User requested profile.");
		}
	);
	
});

app.get('/suggestion', function(req, res) {
	new Promise(
		function (resolve, reject){
			resolve(suggestion(req.query.suggestion));
		}
	).then(
		function (fulfilled) {
			res.json(fulfilled);
			console.log("User suggested " + req.query.suggestion + ".");
		}
	);
	
});

app.get('/userCheck', function(req, res){
	rhUser = req.query.user;
	new Promise(
		function (resolve, reject){
			resolve(userCheck(rhUser.username));
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("Verified user " + rhUser.username);
		}
	);
});

app.get('/search', function(req, res) {
	new Promise(
		function (resolve, reject){
			resolve(searchGames(req.query.searchTerm));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("User searched for '" + req.query.searchTerm + "'.");
		}
	);

});

app.get('/home', function(req,res) {
    res.sendFile('homepage.html', {root : __dirname + '/public'});
})

app.get('/club', function(req,res) {
    res.sendFile('club.html', {root : __dirname + '/public'});
})

app.get('/profile', function(req,res) {
    res.sendFile('profile.html', {root : __dirname + '/public'});
})

app.get('/suggest', function(req,res) {
    res.sendFile('suggest.html', {root : __dirname + '/public'});
})

async function suggestion(suggest){
	console.log("Adding new suggestion for " + rhUser.username);
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), rhUser.username)
			.input('suggestion', sql.VarChar(5000), suggest)
			.execute('newSuggestion');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

//Checks if user exists as borrower, if they don't adds them to borrowers table
async function userCheck(user){
	console.log("Verifying " + user + " on server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(100), user)
			.execute('userExist');
		sql.close();
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
		console.log("Received " + rhUser.username + " From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

var server = app.listen(80, function () {
 console.log('Server Running on Port 80');
});
