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
if OBJECT_ID('dbo.Club', 'U') is not null
	drop table Club
go
if OBJECT_ID('dbo.Person', 'U') is not null
	drop table Person
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
	bid int primary key,
	name varchar(100),
	address varchar(50),
	contactNum varchar(12));
go

create table Person(
	bid int primary key references Borrower(bid),
	rhitUsername varchar(10));
go

create table Club(
	bid int primary key references Borrower(bid),
	contactName varchar(100));
go

create table BoardGameOfficer(
	bid int primary key references Borrower(bid),
	title varchar(50));
go

create table Suggestion(
	sid int primary key,
	game varchar(100) references Game(name),
	suggestor int references Borrower(bid),
	price money);
go

create table Fee(
	fid int primary key,
	amount money,
	reason varchar(500),
	paid bit,
	owedBy int references Borrower(bid));
go

create table CheckOut(
	borrower int references Borrower(bid),
	game varchar(100) references Game(name),
	timeOut date,
	dueDate date,
	returned bit);
go

create table Orders(
	oid int primary key,
	game varchar(100) references Game(name),
	price money,
	orderDate date,
	authorizer int references BoardGameOfficer(bid));
go