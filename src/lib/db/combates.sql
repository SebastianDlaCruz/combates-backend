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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: School
CREATE TABLE School (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_school_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: Coach
CREATE TABLE Coach (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  id_school INT DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_coach_name (name),
  CONSTRAINT fk_coach_school FOREIGN KEY (id_school) REFERENCES School(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: State
CREATE TABLE State (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: State_Clashes
CREATE TABLE State_Clashes (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  CONSTRAINT fk_boxer_school FOREIGN KEY (id_school) REFERENCES School(id),
  CONSTRAINT fk_boxer_category FOREIGN KEY (id_category) REFERENCES Category(id),
  CONSTRAINT fk_boxer_coach FOREIGN KEY (id_coach) REFERENCES Coach(id),
  CONSTRAINT fk_boxer_state FOREIGN KEY (id_state) REFERENCES State(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla: Clashes
CREATE TABLE Clashes (
  id INT NOT NULL AUTO_INCREMENT,
  number_clashes INT NOT NULL,
  id_type_clashes INT NOT NULL,
  rounds INT NOT NULL,
  id_state INT NOT NULL,
  id_category INT NOT NULL,
  PRIMARY KEY (id),  
  CONSTRAINT fk_clashes_state FOREIGN KEY (id_state) REFERENCES State_Clashes(id),
  CONSTRAINT fk_clashes_category FOREIGN KEY (id_category) REFERENCES Category (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Clashes_Participants(
id INT NOT NULL AUTO_INCREMENT,
id_boxer BINARY(16) NOT NULL,
id_clashes INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY  (id_boxer) REFERENCES Boxer(id),
FOREIGN KEY  (id_clashes) REFERENCES Clashes(id)
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
INSERT INTO State (name) VALUES ('Activo');

-- Insertar datos en la tabla State_Clashes
INSERT INTO State_Clashes (name) VALUES ('Programado');

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


SELECT * FROM Category;
