USE [master]
GO
/****** Object:  Database [FinalBoardGameTracker]    Script Date: 5/18/2018 2:43:50 AM ******/
CREATE DATABASE [FinalBoardGameTracker]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FinalBoardGameTracker', FILENAME = N'E:\Database\MSSQL12.MSSQLSERVER\MSSQL\DATA\FinalBoardGameTracker.mdf' , SIZE = 5120KB , MAXSIZE = 25600KB , FILEGROWTH = 10%)
 LOG ON 
( NAME = N'FinalBoardGameTracker_log', FILENAME = N'E:\Database\MSSQL12.MSSQLSERVER\MSSQL\DATA\FinalBoardGameTracker_log.ldf' , SIZE = 2048KB , MAXSIZE = 20480KB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FinalBoardGameTracker] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FinalBoardGameTracker].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FinalBoardGameTracker] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET ARITHABORT OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FinalBoardGameTracker] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FinalBoardGameTracker] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FinalBoardGameTracker] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FinalBoardGameTracker] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET RECOVERY FULL 
GO
ALTER DATABASE [FinalBoardGameTracker] SET  MULTI_USER 
GO
ALTER DATABASE [FinalBoardGameTracker] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FinalBoardGameTracker] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FinalBoardGameTracker] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FinalBoardGameTracker] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [FinalBoardGameTracker] SET DELAYED_DURABILITY = DISABLED 
GO
USE [FinalBoardGameTracker]
GO
/****** Object:  User [subramrr]    Script Date: 5/18/2018 2:43:50 AM ******/
CREATE USER [subramrr] FOR LOGIN [subramrr] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [schmidmj]    Script Date: 5/18/2018 2:43:50 AM ******/
CREATE USER [schmidmj] FOR LOGIN [schmidmj] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [BoardGames38]    Script Date: 5/18/2018 2:43:50 AM ******/
CREATE USER [BoardGames38] FOR LOGIN [BoardGames38] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  DatabaseRole [db_exec]    Script Date: 5/18/2018 2:43:50 AM ******/
CREATE ROLE [db_exec]
GO
ALTER ROLE [db_owner] ADD MEMBER [subramrr]
GO
ALTER ROLE [db_owner] ADD MEMBER [schmidmj]
GO
ALTER ROLE [db_exec] ADD MEMBER [BoardGames38]
GO
ALTER ROLE [db_datareader] ADD MEMBER [BoardGames38]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [BoardGames38]
GO
/****** Object:  Table [dbo].[BoardGameOfficer]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BoardGameOfficer](
	[username] [varchar](10) NOT NULL,
	[title] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Borrower]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Borrower](
	[username] [varchar](10) NOT NULL,
	[address] [varchar](50) NULL,
	[contactNum] [varchar](12) NULL,
PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckOut]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckOut](
	[borrower] [varchar](10) NULL,
	[gid] [int] NULL,
	[timeOut] [date] NULL,
	[dueDate] [date] NULL,
	[returned] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Copy]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Copy](
	[gid] [int] IDENTITY(0,1) NOT NULL,
	[copyOf] [varchar](100) NULL,
	[location] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[gid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Fee]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Fee](
	[fid] [int] IDENTITY(0,1) NOT NULL,
	[username] [varchar](10) NULL,
	[amount] [money] NULL,
	[reason] [varchar](1000) NULL,
	[paid] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[fid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Game]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Game](
	[name] [varchar](100) NOT NULL,
	[description] [varchar](4000) NULL,
	[complexity] [int] NULL,
	[playTime] [varchar](20) NULL,
	[numPlayers] [int] NULL,
	[available] [int] NOT NULL,
 CONSTRAINT [PK__Game__72E12F1AA2A7C511] PRIMARY KEY CLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[lid] [int] NOT NULL,
	[buildingName] [varchar](50) NULL,
	[roomNumber] [varchar](10) NULL,
	[locationCapacity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[lid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suggestion]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suggestion](
	[sid] [int] IDENTITY(0,1) NOT NULL,
	[username] [varchar](10) NULL,
	[suggestion] [varchar](5000) NULL,
PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Game] ADD  CONSTRAINT [DF_Game_available]  DEFAULT ((0)) FOR [available]
GO
ALTER TABLE [dbo].[BoardGameOfficer]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[Borrower] ([username])
GO
ALTER TABLE [dbo].[CheckOut]  WITH CHECK ADD FOREIGN KEY([borrower])
REFERENCES [dbo].[Borrower] ([username])
GO
ALTER TABLE [dbo].[CheckOut]  WITH CHECK ADD FOREIGN KEY([gid])
REFERENCES [dbo].[Copy] ([gid])
GO
ALTER TABLE [dbo].[Copy]  WITH CHECK ADD  CONSTRAINT [FK__Copy__copyOf__0B5CAFEA] FOREIGN KEY([copyOf])
REFERENCES [dbo].[Game] ([name])
GO
ALTER TABLE [dbo].[Copy] CHECK CONSTRAINT [FK__Copy__copyOf__0B5CAFEA]
GO
ALTER TABLE [dbo].[Copy]  WITH CHECK ADD FOREIGN KEY([location])
REFERENCES [dbo].[Location] ([lid])
GO
ALTER TABLE [dbo].[Fee]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[Borrower] ([username])
GO
ALTER TABLE [dbo].[Suggestion]  WITH CHECK ADD FOREIGN KEY([username])
REFERENCES [dbo].[Borrower] ([username])
GO
/****** Object:  StoredProcedure [dbo].[AddFee]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddFee] (@username varchar(10), @amount money, @reason varchar(1000))
AS
INSERT INTO Fee (username, amount, reason, paid)
	VALUES(@username, @amount, @reason, 0);
GO
/****** Object:  StoredProcedure [dbo].[addNewCheckedOut]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[addNewCheckedOut] (@username varchar(10), @gid int)
AS
INSERT INTO CheckOut(borrower, gid, timeOut, dueDate, returned)
values (@username, @gid, getdate(), dateadd(week, 1, getdate()) , 0)
DECLARE @game_name varchar(100)
SELECT @game_name = copyOf FROM Copy WHERE Copy.gid = @gid
UPDATE Copy 
SET Location = 1
WHERE [copy].gid = @gid
UPDATE Game
SET available = available - 1
WHERE Game.name = @game_name
GO
/****** Object:  StoredProcedure [dbo].[addNewCopy]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[addNewCopy] (@copyOf varchar(100), @quantity int)
AS 
DECLARE @cnt int;
SET @cnt = 0;
while (@cnt < @quantity)
BEGIN
	INSERT INTO Copy (copyOf, location)
	values (@copyOF, 0);
	UPDATE Game
	SET available = available + 1
	WHERE Game.name = @copyOf;
	SET @cnt += 1;
END

GO
/****** Object:  StoredProcedure [dbo].[addNewFee]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[addNewFee] (@username varchar(10), @amount money, @reason varchar(1000))
as
insert into Fee
values (@username, @amount, @reason, 0)
GO
/****** Object:  StoredProcedure [dbo].[addNewGame]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[addNewGame] (@name varchar(100), @description varchar(5000), @complexity int, @playTime varchar(20), @numPlayers int, @available int)
AS 
INSERT INTO Game (name, description, complexity,playTime, numPlayers, available)
values (@name, @description, @complexity, @playTime, @numPlayers, @available);
EXEC addNewCopy @copyOf = @name, @quantity = @available;
GO
/****** Object:  StoredProcedure [dbo].[addNewUser]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create procedure [dbo].[addNewUser] (@username  varchar(10))
as
insert into Borrower (username, address, contactNum)
values (@username, null, null)
GO
/****** Object:  StoredProcedure [dbo].[CheckIn]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CheckIn] (@gid int)
AS
Update CheckOut
SET returned = 1
WHERE gid = @gid;
DECLARE @game_name varchar(100)
SELECT @game_name = copyOf FROM Copy WHERE Copy.gid = @gid
UPDATE Copy 
SET Location = 0
WHERE [copy].gid = @gid
UPDATE Game
SET available = available + 1
WHERE Game.name = @game_name
 
GO
/****** Object:  StoredProcedure [dbo].[getAllCheckedOut]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[getAllCheckedOut] 
AS
	SELECT Checkout.borrower, Checkout.gid, Copy.copyOf,  CheckOut.dueDate
	FROM CheckOut, [Copy]
	WHERE returned = 0 AND Copy.gid = CheckOut.gid
	order by CheckOut.dueDate desc, copy.gid asc
GO
/****** Object:  StoredProcedure [dbo].[GetAllFees]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllFees]
AS 
SELECT *
	FROM 
	Fee
GO
/****** Object:  StoredProcedure [dbo].[getAvailableGames]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[getAvailableGames] @name varchar(100)
AS
SELECT Copy.gid, Game.name, Game.description, Game.complexity, Game.playTime, Game.numPlayers
FROM Game, [Copy]
WHERE [Copy].location <> 1 AND [Copy].copyOf = Game.name AND Copy.copyOf = @name
GO
/****** Object:  StoredProcedure [dbo].[getCheckedOutGames]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[getCheckedOutGames] (@username varchar(10))
AS
	SELECT Copy.gid, Copy.copyOf, Checkout.timeOut, CheckOut.dueDate, Checkout.returned 
	FROM CheckOut, [Copy]
	WHERE CheckOut.borrower = @username AND CheckOut.gid = Copy.gid 
	order by CheckOut.dueDate desc, copy.gid asc
GO
/****** Object:  StoredProcedure [dbo].[getCopies]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getCopies] @name nvarchar(100)
AS
SELECT Copy.gid, Copy.copyOf, Copy.location
FROM Copy
WHERE [Copy].copyOf = @name
GO
/****** Object:  StoredProcedure [dbo].[getFees]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[getFees] (@username varchar(10))
AS
	SELECT Fee.fid, Fee.amount, Fee.reason, Fee.paid
	FROM Fee
	WHERE Fee.username = @username
	order by Fee.fid
GO
/****** Object:  StoredProcedure [dbo].[GetGames]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[GetGames]
AS
	SELECT name, description, complexity, playTime, numPlayers, available
	FROM Game
GO
/****** Object:  StoredProcedure [dbo].[getSuggestions]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getSuggestions] 
AS
SELECT * FROM Suggestion
GO
/****** Object:  StoredProcedure [dbo].[newSuggestion]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[newSuggestion] (@username varchar(10), @suggestion varchar(5000))
AS
INSERT INTO Suggestion(username, suggestion)
values (@username, @suggestion)
GO
/****** Object:  StoredProcedure [dbo].[PayFee]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[PayFee] (@fid int)
AS
Update Fee
SET paid = 1
WHERE fid = @fid;
GO
/****** Object:  StoredProcedure [dbo].[returnGame]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[returnGame] (@borrower varchar(10), @gid int)
AS
UPDATE CheckOut
SET returned = 1
WHERE @borrower = borrower AND @gid = gid
UPDATE Copy
SET location = 0
WHERE @gid = gid
GO
/****** Object:  StoredProcedure [dbo].[searchGame]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create ProcedURE [dbo].[searchGame]
	@term varchar(100)
AS
Select * FROM Game 
WHERE name like '%'+ @term + '%' OR description like '%'+ @term + '%' 
GO
/****** Object:  StoredProcedure [dbo].[UserExist]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UserExist]
	@username varchar(10)
AS
	if (select  count(username) from Borrower where username = @username) = 0
		BEGIN
			print('user does not exists');
			INSERT INTO Borrower (username)
				values(@username);
		END
	ELSE
		BEGIN
			print('user does exist');
		END
GO
/****** Object:  StoredProcedure [dbo].[UserOfficer]    Script Date: 5/18/2018 2:43:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[UserOfficer]
	@username varchar(10)
AS
SELECT Count(Username) AS Officer
FROM BoardGameOfficer
WHERE BoardGameOfficer.username = @username
GO
USE [master]
GO
ALTER DATABASE [FinalBoardGameTracker] SET  READ_WRITE 
GO
