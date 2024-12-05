CREATE DATABASE IF NOT EXISTS dreabitdb;
USE dreabitdb;
-- DROP DATABASE dreabitdb;

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

INSERT INTO User_Type(name_type) VALUES('client'), ('admin'), ('superadmin');

INSERT INTO User_Dreabit(id_user_type,email_user, password_user) VALUES (1,'dreabit@gmail.com', '1234');