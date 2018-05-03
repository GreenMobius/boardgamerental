const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
 user: 'schmidmj',
 password: 'Rithvik2',
 server: 'golem.csse.rose-hulman.edu', 
 database: 'BoardGameTracker' 
 };
 
app.use(express.static(__dirname + '/public')); // exposes index.html, per below

app.get('/request', function(req, res){
	console.log("requesting");
	new Promise(
		function (resolve, reject){
			resolve(getGames());
		}
	).then(
		function (fulfilled) {
			console.log(JSON.stringify(fulfilled));
			//res.json('[{"name":"game1","description":"test 1","complexity":3,"playTime":"10 hours","numPlayers":5},{"name":"game2","description":"test 2","complexity":2,"playTime":"3 hours","numPlayers":2},{"name":"game3","description":"test 3","complexity":3,"playTime":"3 hours","numPlayers":3}]');
			res.send(fulfilled);
			console.log("requesting done");
		}
	);
	
});

async function getGames() {
	console.log("getgame");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request().query('EXECUTE GetGames');
		//console.log(result.recordset);
		let toShow = [];
		for(let x in result.recordset) {
			console.log(result.recordset[x]);
			toShow.push(result.recordset[x]);
		}
		sql.close()
		return(toShow);
	} catch (err){
		console.log(err);
		sql.close();
	}
}

var server = app.listen(80, function () {
 console.log('Server is running.. on Port 80');
});
