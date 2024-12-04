-- Creacion de la DB
CREATE DATABASE IF NOT EXISTS dbdesesperanza;
USE dbdesesperanza;

-- Creacion de tablas


CREATE TABLE IF NOT EXISTS cliente(
	id_cliente INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nombre_cliente VARCHAR(50) NOT NULL,
    correo_electronico_cliente VARCHAR(150) NOT NULL UNIQUE,
    password_cliente VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS administrador(
	id_administrador INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_administrador VARCHAR(50) NOT NULL,
    correo_electronico_administrador VARCHAR(150) NOT NULL UNIQUE,
    password_administrador VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS pan(
	id_pan INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre_pan VARCHAR(100) NOT NULL UNIQUE,
    descripcion_pan VARCHAR(100),
    img_pan VARCHAR(2000) NOT NULL
);

CREATE TABLE IF NOT EXISTS precio_pan(
	id_precio INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pan INTEGER NOT NULL, 
    precio_pan INTEGER NOT NULL,
    FOREIGN KEY (id_pan) REFERENCES pan(id_pan)
);

CREATE TABLE IF NOT EXISTS stock_pan(
	id_stock INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_pan INTEGER NOT NULL,
    cantidad_stock INTEGER NOT NULL,
    FOREIGN KEY (id_pan) REFERENCES pan(id_pan)
);

CREATE TABLE IF NOT EXISTS carrito_cliente(

	id_carrito_usuario INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_cliente INTEGER NOT NULL,
    id_pan INTEGER NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_pan) REFERENCES pan(id_pan)

);

CREATE TABLE IF NOT EXISTS inventario_administrador(
	
    id_inventario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_administrador INT NOT NULL,
    id_pan INT NOT NULL,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_administrador),
    FOREIGN KEY (id_pan) REFERENCES pan(id_pan)

);

-- Insercion de datos a la base de datos

INSERT INTO cliente(nombre_cliente, correo_electronico_cliente, password_cliente)
VALUES
	('Memo', 'memo@gmail.com', '1234'),
    ('Sus', 'sus@gmail.com', '5678');
    
INSERT INTO pan(nombre_pan, descripcion_pan, img_pan)
VALUES
	('Concha1', 'Esto es una concha' ,'https://chedrauimx.vtexassets.com/arquivos/ids/37690795-1600-auto?v=638648466674000000&width=1600&height=auto&aspect=true');

INSERT INTO precio_pan(id_pan, precio_pan)
VALUES
	(1, 20);

INSERT INTO stock_pan(id_pan, cantidad_stock)
VALUES 
	(1,30);

    
INSERT INTO administrador(nombre_administrador, correo_electronico_administrador, password_administrador)
VALUES ('root', 'root@gmail.com', 'root123');

SELECT * FROM cliente;
SELECT * FROM administrador;
SELECT * FROM pan;
SELECT * FROM precio_pan;
SELECT * FROM stock_pan;
SELECT * FROM carrito_cliente;
SELECT * FROM administrador;



SELECT pan.nombre_pan, pan.descripcion_pan, precio_pan.precio_pan, stock_pan.cantidad_stock, pan.img_pan FROM pan
JOIN precio_pan ON precio_pan.id_pan = pan.id_pan
JOIN stock_pan ON stock_pan.id_pan = pan.id_pan;