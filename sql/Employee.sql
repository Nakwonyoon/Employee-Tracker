  
DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (10,2),
  department_id INT,
);

CREATE TABLE employee
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NULL,
  manager_id INT NULL
);