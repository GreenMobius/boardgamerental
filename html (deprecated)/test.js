var connection = new ActiveXObjext("ADODB.Connection");
var connectionstring="Server=golem.csse.rose-hulman.edu; Database =BoardGameTracker; User Id =BoardGames38 ; Password =TwilightImperium20"; 
connection.Open(connectionstring);
var rs = new ActiveXObject("ADODB.Recordset");

rs.Open("SELECT * FROM games", connection);
rs.MoveFirst
while(!rs.eof)
{
  document.write(rs.fields(1));
  rs.movenext;
}

rs.close;
connection.close;
