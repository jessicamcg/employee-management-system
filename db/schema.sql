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
    PRIMARY KEY (id)
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);