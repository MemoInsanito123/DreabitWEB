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

CREATE TABLE IF NOT EXISTS Frequency_Days(
id_frequency_days INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
frequency_days VARCHAR(20) NOT NULL,

FOREIGN KEY(id_task) REFERENCES Task(id_task)
);

CREATE TABLE IF NOT EXISTS Frequency_Months(
id_frequency_months INTEGER PRIMARY KEY AUTO_INCREMENT,
id_task INTEGER NOT NULL,
frequency_days VARCHAR(20) NOT NULL,

FOREIGN KEY(id_task) REFERENCES Task(id_task)
);

-- INSERT FOR THE TABLE (CATALOG)

INSERT INTO User_Type(name_type) VALUES ('client'), ('admin'), ('superadmin');

INSERT INTO Priority_Task(priority_type) VALUES ('high'), ('medium'), ('low');

-- SELECT FOR THE TABLES
SELECT * FROM User_Birthdate;
SELECT * FROM User_Dreabit;
SELECT * FROM User_Name;
SELECT * FROM Way;


-- TESTS THE MOST INSANES
INSERT INTO User_Dreabit (id_user_type, email_user, password_user)
VALUES
(1,"dreabit@gmail.com","1234"),
(2,"kri@gmail.com","1234"),
(3,"melon@gmail.com","1234");

INSERT INTO Way(id_user, name_way, description_way) VALUES (1, 'Camino1', 'Esto es una camino');

SELECT Way.id_way, Way.name_way, Way.description_way FROM Way
INNER JOIN User_Dreabit ON User_Dreabit.email_user = 'dreabit@gmail.com' AND User_Dreabit.id_user = Way.id_user;

SELECT User_Dreabit.id_user FROM User_Dreabit WHERE email_user = 'dreabit@gmail.com';

UPDATE Way
SET name_way = 'Camino Chido'
WHERE id_way = 1;

DELETE FROM Way WHERE id_way = 8;