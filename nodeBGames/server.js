const express = require('express');
const app = express();
const sql = require('mssql');

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

app.get('/search', function(req, res) {
	console.log("Beginning search");
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

app.get('/home', function(req,res) {
    res.sendFile('homepage.html', {root : __dirname + '/public'});
})

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

var server = app.listen(80, function () {
 console.log('Server Running on Port 80');
});
