USE soup_DB 
GO 

CREATE TABLE [USER](
	[ID] int IDENTITY PRIMARY KEY, 
	[Name] nvarchar(20) NOT NULL UNIQUE, 
	[Password] nvarchar(20) NOT NULL,
)
GO

CREATE TRIGGER trg_PreventUserDelete
ON [USER]
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Deletion from USER table is not allowed.', 16, 1);
    ROLLBACK TRANSACTION; 
END;
GO

CREATE TABLE [PROJECT](
	[ID] int IDENTITY PRIMARY KEY, 
	[Name] nvarchar(50) NOT NULL UNIQUE, 
	[Description] nvarchar(200) NULL, 
	[Creator] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL 
) 
GO

CREATE TRIGGER trg_PreventProjectDelete
ON [PROJECT]
INSTEAD OF DELETE
AS
BEGIN
    RAISERROR('Deletion from PROJECT table is not allowed.', 16, 1);
    ROLLBACK TRANSACTION; 
END;
GO

CREATE TABLE [TEAM](
	[ID] int IDENTITY PRIMARY KEY NOT NULL,  
	[UserID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL, 
	[ProjectID] int FOREIGN KEY REFERENCES [PROJECT]([ID]) ON DELETE NO ACTION NOT NULL, 
	[Role] nvarchar(50) CHECK ([Role] IN (
		'Руководитель проекта', 
		'Руководитель отдела дизайна',   
			'Веб-дизайнер', 
			'Графический дизайнер', 	
			'3D-дизайнер', 
			'UI/UX дизайнер',  
		'Руководитель отдела разработки',  
			'Архитектор', 
			'Fullstack-разработчик',  
			'Front end-разработчик', 
			'Back end-разработчик', 
			'Разработчик баз данных', 
		'Руководитель отдела внедрения и тестирования', 
			'DevOps-инженер', 
			'Тестировщик', 
		'Руководитель отдела информационной безопасности',  
			'Специалист по безопасности', 
			'Системный администратор', 
		'Руководитель отдела аналитики', 
			'Бизнес-аналитик', 
			'Системный аналитик' 
		)) NOT NULL, 
	[Level] int CHECK ([Level] BETWEEN 0 AND 2) NOT NULL, 
	
	UNIQUE([UserID], [ProjectID], [Role]), 
)
GO

CREATE UNIQUE INDEX IX_UC_SingleManagers 
ON [TEAM] ([ProjectID], [Role])
WHERE [Role] IN (
	'Руководитель проекта', 
    'Руководитель отдела дизайна', 
    'Руководитель отдела разработки',  
    'Руководитель отдела внедрения и тестирования', 
    'Руководитель отдела информационной безопасности',  
    'Руководитель отдела аналитики'
);

CREATE TABLE [NOTIFICATION](
	[ID] int IDENTITY PRIMARY KEY NOT NULL, 
	[ProjectID] int FOREIGN KEY REFERENCES [PROJECT]([ID]) ON DELETE NO ACTION NOT NULL, 
	[SenderID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL, 
	[ReceiverID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL,
		[Role] nvarchar(50) CHECK ([Role] IN (
		'Руководитель проекта', 
		'Руководитель отдела дизайна',   
			'Веб-дизайнер', 
			'Графический дизайнер', 	
			'3D-дизайнер', 
			'UI/UX дизайнер',  
		'Руководитель отдела разработки',  
			'Архитектор', 
			'Fullstack-разработчик',  
			'Front end-разработчик', 
			'Back end-разработчик', 
			'DevOps-инженер', 	
			'Разработчик баз данных', 
		'Руководитель отдела внедрения и тестирования', 
			'DevOps-инженер', 
			'Тестировщик', 
		'Руководитель отдела информационной безопасности',  
			'Специалист по безопасности', 
			'Системный администратор', 
		'Руководитель отдела аналитики', 
			'Бизнес-аналитик', 
			'Системный аналитик' 
		)) NOT NULL, 
	[Type] nvarchar(20) CHECK ([Type] IN ('invite', 'request'))NOT NULL 
)
GO

CREATE TABLE [TASK](
	[ID] int IDENTITY PRIMARY KEY NOT NULL, 
	[ProjectID] int FOREIGN KEY REFERENCES [PROJECT]([ID]) ON DELETE NO ACTION NOT NULL, 
	[CreatorID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL,
	[AssigneeID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL,
	[Name] nvarchar(50) NOT NULL,  
	[Description] nvarchar(500) NULL, 
	[IsComplete] bit NOT NULL DEFAULT 0  
)
GO

CREATE TABLE [ACTION](
	[ID] int IDENTITY PRIMARY KEY NOT NULL, 
	[ProjectID] int FOREIGN KEY REFERENCES [PROJECT]([ID]) ON DELETE NO ACTION NOT NULL, 
	[ActorID] int FOREIGN KEY REFERENCES [USER]([ID]) ON DELETE NO ACTION NOT NULL, 
	[TaskID] int FOREIGN KEY REFERENCES [TASK]([ID]) ON DELETE NO ACTION NOT NULL, 
	[Description] nvarchar(500) NOT NULL, 
	[Date] datetime NOT NULL
)

