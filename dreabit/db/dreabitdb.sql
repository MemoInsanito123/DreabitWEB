CREATE DATABASE IF NOT EXISTS dreabitdb;
USE dreabitdb;

CREATE TABLE IF NOT EXISTS User_Type(
id_user_type INTEGER PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS User(
id_user INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user_type INTEGER,
mail VARCHAR(255) UNIQUE,
password VARCHAR(100),
FOREIGN KEY(id_user_type) REFERENCES User_Type(id_user_type)
);

CREATE TABLE IF NOT EXISTS User_Name(
id_user_name INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user INTEGER,
name VARCHAR(100),
paternal_surname VARCHAR(100),
maternal_surname VARCHAR(100),
handle VARCHAR(25) UNIQUE,

FOREIGN KEY(id_user) REFERENCES User(id_user)
);

CREATE TABLE IF NOT EXISTS User_Birthdate(
id_user_birthdate INTEGER PRIMARY KEY AUTO_INCREMENT,
id_user INTEGER,
birthdate DATE,

FOREIGN KEY(id_user) REFERENCES User(id_user)
);

INSERT INTO User_Type(name) VALUES('client'), ('admin'), ('superadmin');

