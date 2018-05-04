const express = require('express');
const app = express();
const sql = require('mssql');

const config = {
	user: 'BoardGames38',
	password: 'TwilightImperium20',
	server: 'golem.csse.rose-hulman.edu',
	database: 'BoardGameTracker',
};

async function getGames() {
	console.log("Requesting Games From Server");
	try {
		sql.close();
		const pool = await sql.connect(config);
		const result = await pool.request().query('EXECUTE GetGames');
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