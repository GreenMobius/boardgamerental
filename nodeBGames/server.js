const express = require('express');
const app = express();
const sql = require('mssql');
var rhUser = null; //Stores the current user, see rosefire.min.js for fields
var game = null;
const config = {
 user: 'BoardGames38',
 password: 'TwilightImperium20',
 server: 'golem.csse.rose-hulman.edu', 
 database: 'BoardGameTrackerDup' 
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

app.get('/officerCheck', function(req, res){
	new Promise(
		function (resolve, reject){
			resolve(officerCheck(rhUser.username));
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("User " + rhUser.username);
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

app.get('/checkOutGame', function(req, res) {
	new Promise(
		function (resolve, reject){
			resolve(checkOutGame(req.query.gid));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("User checked out gid " + req.query.gid + " .");
		}
	);

});

app.get('/getCopies', function(req,res) {
	console.log("getting copies of");
	console.log(game);
	var input = game;
	new Promise(
		function (resolve, reject){
			resolve(getCopies(input));
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("Copies have been returned for " + game);
		}
	);
});

app.get('/getFees', function(req,res) {
	console.log("getting fees for " + rhUser.username);
	new Promise(
		function (resolve, reject){
			resolve(getFees());
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("Fees have been retrieved for " + rhUser.username);
		}
	);
});

app.get('/getAllFees', function(req,res) {
	console.log("getting fees");
	new Promise(
		function (resolve, reject){
			resolve(getAllFees());
		}
	).then(
		function(fulfilled){
			res.json(fulfilled);
			console.log("Fees have been retrieved.");
		}
	);
});

app.get('/addGame', function(req, res) {
	console.log("adding a game");
	console.log(req.query.name);
	new Promise(
		function (resolve, reject){
			resolve(addGame(req.query.name, req.query.description, req.query.complexity, req.query.playTime, req.query.numPlayers, req.query.numOfCopies));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("added the game");
		}
	);
})

app.get('/addFee', function(req, res) {
	console.log("adding a fee");
	new Promise(
		function (resolve, reject){
			resolve(addFee(req.query.username, req.query.amount, req.query.reason));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("added the fee");
		}
	);
})

app.get('/payFee', function(req, res) {
	console.log("paying a fee");
	new Promise(
		function (resolve, reject){
			resolve(payFee(req.query.fid));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("paid the fee");
		}
	);
})

app.get('/checkIn', function(req, res) {
	console.log("check in a game");
	new Promise(
		function (resolve, reject){
			resolve(checkIn(req.query.gid));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("checked in the game");
		}
	);
})


app.get('/addCopy', function(req, res) {
	console.log("adding a copy");
	new Promise(
		function (resolve, reject){
			resolve(addCopy(req.query.name, req.query.quantity));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("added the copy");
		}
	);
})	
	
app.get('/findGame', function(req, res){
	console.log("getting copies of");
	console.log(game);
	var input = game;
	new Promise(
		function (resolve, reject){
			resolve(searchGames(input));
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log(fulfilled);
			console.log("Got the current game");
		}
	);
})

app.get('/getSuggestions', function(req, res){
	console.log("getting suggestions");
	var input = game;
	new Promise(
		function (resolve, reject){
			resolve(getSuggestions());
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("Return suggestions");
		}
	);
})

app.get('/getAllCheckedOut', function(req, res){
	console.log("getting all checked out");
	var input = game;
	new Promise(
		function (resolve, reject){
			resolve(getAllCheckedOut());
		}
	).then(
		function (fulfilled){
			res.json(fulfilled);
			console.log("Returned all checked out");
		}
	);
})

app.get('/setGame', function(req,res) {
	game = req.query.name;
	console.log(game);
	res.json("done");
})
app.get('/checkout', function(req,res) {
    res.sendFile('checkout.html', {root : __dirname + '/public'});
})

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

app.get('/help', function(req,res) {
    res.sendFile('help.html', {root : __dirname + '/public'});
})

app.get('/login', function(req,res) {
    res.sendFile('index.html', {root : __dirname + '/public'});
})

app.get('/officer', function(req,res) {
    res.sendFile('officer.html', {root : __dirname + '/public'});
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

async function getAllCheckedOut(){
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.execute('getAllCheckedOut');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received all checked out games");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getSuggestions(){
	console.log("getting suggestions");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.execute('getSuggestions');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received suggestions From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function checkOutGame(gid){
	console.log("Checking out game " + gid);
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), rhUser.username)
			.input('gid', sql.Int, gid)
			.execute('addNewCheckedOut');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function checkIn(gid){
	console.log("Checking in game " + gid);
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('gid', sql.Int, gid)
			.execute('CheckIn');
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

async function addGame(name, description, complexity, playTime, numPlayers, available){
	console.log("adding " + name + " to board games");
	
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('name', sql.VarChar(100), name)
			.input('description', sql.VarChar(5000), description)
			.input('complexity', sql.Int, complexity)
			.input('playTime', sql.VarChar(20), playTime)
			.input('numPlayers', sql.Int, numPlayers)
			.input('available', sql.Int, available)
			.execute('addNewGame');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function addFee(username, amount, reason){
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), username)
			.input('amount', sql.Money, amount)
			.input('reason', sql.VarChar(1000), reason)
			.execute('addFee');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function payFee(fid){
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('fid', sql.Int, fid)
			.execute('payFee');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function addCopy(copyOf, quantity){
	console.log("adding copy of " + copyOf + " to copies");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('copyOf', sql.VarChar(100), copyOf)
			.input('quantity', sql.Int, quantity)
			.execute('addNewCopy');
		sql.close();
		return(1);
	} catch (err){
		console.log(err);
		sql.close();
	}
}


async function officerCheck(user){
	console.log("Checking for officer for " + user);
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), user)
			.execute('UserOfficer');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Officer From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function searchGames(searchTerm){
	if(searchTerm == "Taylor" || searchTerm == "taylor") {
		searchTerm = "Captain Sonar"
	}
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

async function getFees() {
	console.log("Requesting Fees From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('username', sql.VarChar(10), rhUser.username)
			.execute('getFees');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Fees From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getAllFees() {
	console.log("Requesting Fees From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.execute('getAllFees');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		console.log("Received Fees From Server");
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

async function getGamesProfile() {
	try {
		console.log("Requesting " + rhUser.username + " Games From Server");
	} catch(err) {
		window.alert("Please log in to view your profile.");
		window.setTimeout(function() {
			window.location.replace('/index');
		},100);
	}
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

async function getCopies(searchTerm) {
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request()
			.input('name', sql.VarChar(100), searchTerm)
			.execute('getCopies');
		let toShow = [];
		for(let x in result.recordset) {
			toShow.push(result.recordset[x]);
		}
		sql.close();
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}	

var server = app.listen(80, function () {
 console.log('Server Running on Port 80');
});
