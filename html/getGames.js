const express = require('express');
const app = express();
const sql = require('mssql');

const config = (
	user: BoardGames38,
	password: 'TwilightImperium20',
	server: 'golem.csse.rose-hulman.edu',
	database: 'BoardGamesTracker',,
)


try {
	sql.close();
	const pool = await sql.connect(config);
	const result = await pool.request()
		.execute('Execute GetGames');
	let toShow = [];
	for (let x in result.recordset) {
		toShow.push(result.recordset[x]);
	}
	alert(toShow);
} catch (err) {
	alert(err);
	sql.close();
}