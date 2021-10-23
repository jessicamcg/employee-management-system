DROP DATABASE IF EXISTS human_resources_db;
CREATE DATABASE human_resources_db;

USE human_resources_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_info (
    id INT NOT NULL,
    title VARCHAR(25),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (

);