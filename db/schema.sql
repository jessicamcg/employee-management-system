DROP DATABASE IF EXISTS human_resources_db;
CREATE DATABASE human_resources_db;

USE human_resources_db;

CREATE TABLE department (
    dept_id INT NOT NULL,
    name VARCHAR(25) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE role_info (
    role_id INT NOT NULL,
    title VARCHAR(25),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id)
    REFERENCES department(dept_id)
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT ,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id)
    REFERENCES role_info(role_id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
);