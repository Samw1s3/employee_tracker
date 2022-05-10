DROP DATABASE IF EXISTS employee_cms;
CREATE DATABASE employee_cms;

USE employee_cms;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
  );

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE CASCADE
  );
  
  CREATE TABLE employees (
  id INT  AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN Key(role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE,
  FOREIGN KEY (manager_id)
  REFERENCES roles(id)
  ON DELETE CASCADE
  );
  