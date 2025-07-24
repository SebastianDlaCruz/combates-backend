-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS CombatesDB;

-- Crear la base de datos
CREATE DATABASE CombatesDB;

-- Usar la base de datos
USE CombatesDB;

-- Tabla: Category
CREATE TABLE Category (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  weight DECIMAL(4, 1) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_category (name, weight)
);

-- Tabla: School
CREATE TABLE School (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_school_name (name)
);

-- Tabla: Coach
CREATE TABLE Coach (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  id_school INT DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_school) REFERENCES School(id)
);

-- Tabla: State
CREATE TABLE State_Boxer (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Tabla: State_Clashes
CREATE TABLE State_Clashes (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- Tabla: Boxer
CREATE TABLE Boxer (
  id BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  name VARCHAR(30) NOT NULL,
  id_school INT NOT NULL,
  disability VARCHAR(100) DEFAULT NULL,
  id_category INT NOT NULL,
  weight DECIMAL(4, 1) NOT NULL,
  id_coach INT NOT NULL,
  details VARCHAR(100) DEFAULT NULL,
  id_state INT NOT NULL,
  fights INT NOT NULL,
  corner VARCHAR(10) NOT NULL,
  gender VARCHAR(16) NOT NULL,
  age INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_school) REFERENCES School(id),
  FOREIGN KEY (id_category) REFERENCES Category(id),
  FOREIGN KEY (id_coach) REFERENCES Coach(id),
  FOREIGN KEY (id_state) REFERENCES State_Boxer(id)
);

-- Tabla: Clashes
CREATE TABLE Clashes (
  id INT NOT NULL AUTO_INCREMENT,
  number INT NOT NULL,
  id_type_clashes INT NOT NULL,
  rounds INT NOT NULL,
  id_state INT NOT NULL,
  id_category INT NOT NULL,
  PRIMARY KEY (id),  
  FOREIGN KEY (id_state) REFERENCES State_Clashes(id),
  FOREIGN KEY (id_category) REFERENCES Category (id)
);

CREATE TABLE Clashes_Participants(
id INT NOT NULL AUTO_INCREMENT,
id_boxer BINARY(16) NOT NULL,
id_clashes INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_boxer) REFERENCES Boxer(id),
FOREIGN KEY (id_clashes) REFERENCES Clashes(id)
);


-- Insertar datos en la tabla Category
INSERT INTO Category (name, weight) VALUES 
('Peso Mosca', 50.8),
('Peso Supermosca', 52.2),
('Peso Gallo', 53.5),
('Peso Supergallo', 55.3),
('Peso Pluma', 57.2),
('Peso Superpluma', 59.0),
('Peso Ligero', 61.2),
('Peso Superligero', 63.5),
('Peso Wélter', 66.7),
('Peso Superwélter', 69.9),
('Peso Mediano', 72.6),
('Peso Supermediano', 76.2),
('Peso Semipesado', 79.4),
('Peso Crucero', 90.7),
('Peso Pesado', 90.7);

-- Insertar datos en la tabla School
INSERT INTO School (name) VALUES ('Escuela de Boxeo Alpha');

-- Insertar datos en la tabla Coach
INSERT INTO Coach (name, id_school) VALUES ('Juan Pérez', 1);

-- Insertar datos en la tabla State
INSERT INTO State_Boxer (name) VALUES 
('Presente'),
('Ausente'),
('Demorado'),
('Participación finalizada');

-- Insertar datos en la tabla State_Clashes
INSERT INTO State_Clashes (name) VALUES 
('En proceso'),
('Finalizado'),
('Cancelado'),
('Activo');

-- Insertar datos en la tabla Boxer
INSERT INTO Boxer (
  name, id_school, disability, id_category, weight, id_coach, details, id_state, fights, corner, gender, age
) VALUES
  ('Juan Pérez', 1, 'Ninguna', 1, 70.5, 1, 'Detalles de Juan', 1, 10, 'Rojo', 'Masculino', 25),
  ('Ana Gómez', 1, 'Ninguna', 2, 70.5, 1, 'Detalles de Juan', 1, 10, 'Rojo', 'Masculino', 25),
  ('Carlos López' ,1, 'Ninguna', 3, 70.5, 1, 'Detalles de Juan', 1, 10, 'Rojo', 'Masculino', 25),
  ('María Rodríguez',  1, 'Ninguna', 1, 70.5, 1, 'Detalles de Juan', 1, 10, 'Rojo', 'Masculino', 25);

-- Insertar datos en la tabla Clashes
INSERT INTO Clashes (
  number_clashes, 
  id_type_clashes, 
  rounds, 
  id_state,
  id_category
) VALUES (
  1, 
  1, 
  5, 
  1, 
  1
);

