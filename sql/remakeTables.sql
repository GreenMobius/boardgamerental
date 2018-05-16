use BoardGameTracker
go

if OBJECT_ID('dbo.Orders', 'U') is not null
	drop table Orders
go
if OBJECT_ID('dbo.CheckOut', 'U') is not null
	drop table CheckOut
go
if OBJECT_ID('dbo.Fee', 'U') is not null
	drop table Fee
go
if OBJECT_ID('dbo.BoardGameOfficer', 'U') is not null
	drop table BoardGameOfficer
go
if OBJECT_ID('dbo.Suggestion', 'U') is not null
	drop table Suggestion
go
if OBJECT_ID('dbo.Borrower', 'U') is not null
	drop table Borrower
go
if OBJECT_ID('dbo.Copy', 'U') is not null
	drop table Copy
go
if OBJECT_ID('dbo.Location', 'U') is not null
	drop table Location
go
if OBJECT_ID('dbo.Game', 'U') is not null
	drop table Game
go

create table Game(
	name varchar(100) primary key,
	description varchar(500),
	complexity int,
	playTime varchar(20),
	numPlayers int);
go

create table Location(
	lid int primary key,
	buildingName varchar(50),
	roomNumber varchar(10),
	locationCapacity int);
go

create table Copy(
	gid int primary key,
	copyOf varchar(100) references Game(name),
	location int references Location(lid));
go

create table Borrower(
	username varchar(10) primary key,
	address varchar(50),
	contactNum varchar(12));
go

create table BoardGameOfficer(
	username varchar(10) primary key references Borrower(username),
	title varchar(50));
go

create table CheckOut(
	borrower varchar(10) references Borrower(username),
	gid int references Copy(gid),
	timeOut date,
	dueDate date,
	returned bit);
go

create table Suggestion(
	sid int IDENTITY(0,1) primary key,
	username varchar(10) references Borrower(username),
	suggestion varchar(5000));
go