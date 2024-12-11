CREATE DATABASE IF NOT EXISTS dreabitdb;
USE dreabitdb;

-- DROP DATABASE dreabitdb

CREATE TABLE IF NOT EXISTS User_Type(
id_user_type INTEGER PRIMARY KEY AUTO_INCREMENT,
name_type VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS User_Dreabit(
id_user INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user_type INTEGER NOT NULL,
email_user VARCHAR(255) UNIQUE NOT NULL,
password_user VARCHAR(100) NOT NULL,
FOREIGN KEY(id_user_type) REFERENCES User_Type(id_user_type)
);

CREATE TABLE IF NOT EXISTS User_Name(
id_user_name INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user INTEGER NOT NULL,
name_user VARCHAR(100) NOT NULL,
paternal_surname VARCHAR(100),
maternal_surname VARCHAR(100),
handle VARCHAR(25) UNIQUE NOT NULL,

FOREIGN KEY(id_user) REFERENCES User_Dreabit(id_user)
);

CREATE TABLE IF NOT EXISTS User_Birthdate(
id_user_birthdate INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user INTEGER NOT NULL,
birthdate DATE NOT NULL,

FOREIGN KEY(id_user) REFERENCES User_Dreabit(id_user)
);

CREATE TABLE IF NOT EXISTS Way(
id_way INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user INTEGER NOT NULL,
name_way VARCHAR(150) NOT NULL,
description_way VARCHAR(100) NOT NULL,

FOREIGN KEY(id_user) REFERENCES User_Dreabit(id_user)
);

CREATE TABLE IF NOT EXISTS Priority_Task(
id_priority INTEGER PRIMARY KEY AUTO_INCREMENT,
priority_type VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Task(
id_task INTEGER PRIMARY KEY AUTO_INCREMENT,
id_way INTEGER NOT NULL,
id_priority INTEGER NOT NULL,
task JSON,

FOREIGN KEY(id_way) REFERENCES Way(id_way),
FOREIGN KEY(id_priority) REFERENCES Priority_Task(id_priority)
);

CREATE TABLE IF NOT EXISTS Frequency_Task(
id_frequency INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
frequency VARCHAR(150) NOT NULL,

FOREIGN KEY(id_task) REFERENCES Task(id_task)
);

CREATE TABLE IF NOT EXISTS Complete_Task(
id_complete_task INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
complete INTEGER,
date_complete DATE,

FOREIGN KEY(id_task) REFERENCES Task(id_task)
);

CREATE TABLE IF NOT EXISTS Date_Task(
id_task_date INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
start_date_task DATE,

FOREIGN KEY (id_task) REFERENCES Task(id_task)
);

CREATE TABLE IF NOT EXISTS Sub_task(
id_sub_task INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
name_sub_task VARCHAR(150),
description_sub_task VARCHAR(200),

FOREIGN KEY (id_task) REFERENCES Task(id_task)
);

-- INSERT FOR THE TABLE (CATALOG)

INSERT INTO User_Type(name_type) VALUES ('client'), ('admin'), ('superadmin');

INSERT INTO Priority_Task(priority_type) VALUES ('high'), ('medium'), ('low');

-- SELECT FOR THE TABLES
SELECT * FROM User_Birthdate;
SELECT * FROM User_Dreabit;
SELECT * FROM User_Name;
SELECT * FROM Way;
SELECT * FROM Task;
SELECT * FROM Frequency_Task;
SELECT * FROM Priority_Task;
SELECT * FROM Date_Task;
SELECT * FROM Sub_task;

-- TESTS THE MOST INSANES
INSERT INTO User_Dreabit (id_user_type, email_user, password_user)
VALUES
(1,"dreabit@gmail.com","1234"),
(1,"sus@gmail.com", "1234"),
(2,"kri@gmail.com","1234"),
(3,"melon@gmail.com","1234");


INSERT INTO Way(id_user, name_way, description_way) VALUES (1, 'Camino1', 'Esto es una camino');

SELECT Way.id_way, Way.name_way, Way.description_way FROM Way
INNER JOIN User_Dreabit ON User_Dreabit.email_user = 'dreabit@gmail.com' AND User_Dreabit.id_user = Way.id_user;

SELECT User_Dreabit.id_user FROM User_Dreabit WHERE email_user = 'dreabit@gmail.com';

UPDATE Way
SET name_way = 'Camino Chido'
WHERE id_way = 1;

SELECT Task.id_task, Task.task, Frequency_Task.frequency ,Priority_Task.priority_type FROM Task
INNER JOIN Frequency_Task ON Frequency_Task.id_task = Task.id_task
INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority
INNER JOIN Way ON Way.id_way = Task.id_way
INNER JOIN User_Dreabit ON User_Dreabit.id_user = Way.id_user
WHERE User_Dreabit.id_user = 1
ORDER BY 
    CASE 
        WHEN Priority_Task.priority_type = 'High' THEN 1
        WHEN Priority_Task.priority_type = 'Medium' THEN 2
        WHEN Priority_Task.priority_type = 'Low' THEN 3
        ELSE 4
    END;

SELECT Way.id_way, Task.id_task, Task.task, Frequency_Task.frequency ,Priority_Task.priority_type FROM Task
INNER JOIN Frequency_Task ON Frequency_Task.id_task = Task.id_task
INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority
INNER JOIN Way ON Way.id_way = Task.id_way
WHERE Way.id_way = 3
ORDER BY 
    CASE 
        WHEN Priority_Task.priority_type = 'High' THEN 1
        WHEN Priority_Task.priority_type = 'Medium' THEN 2
        WHEN Priority_Task.priority_type = 'Low' THEN 3
        ELSE 4
    END;
    
SELECT id_sub_task, name_sub_task, description_sub_task FROM Sub_Task WHERE id_task = 1;