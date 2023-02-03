-- Creación y conexión de la base de datos

CREATE DATABASE bdc;
\c bdc;

-- CREACIÓN DE TABLAS

CREATE TABLE usuarios (id SERIAL PRIMARY KEY, account INT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, rut TEXT NOT NULL UNIQUE, address TEXT NOT NULL, password TEXT NOT NULL, balance FLOAT NOT NULL CHECK (balance >= 0));

CREATE TABLE transferencias (id SERIAL PRIMARY KEY, date TIMESTAMP NOT NULL, id_from INT NOT NULL, id_to INT NOT NULL, comment TEXT NOT NULL, amount FLOAT NOT NULL, FOREIGN KEY (id_from) REFERENCES usuarios(id), FOREIGN KEY (id_to) REFERENCES usuarios(id));