DROP DATABASE IF EXISTS human_resources_db;
CREATE DATABASE human_resources_db;

USE human_resources_db;

CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(25) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE role_info (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(25),
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id)
    REFERENCES department(dept_id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT ,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id)
    REFERENCES role_info(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
    ON DELETE SET NULL
);


-- SELECT employee.employee_id AS Employee_Id, employee.last_name AS Last_Name FROM role_info JOIN employee ON employee.role_id = role_info.title;
-- SELECT * FROM employee LEFT JOIN role_info ON employee.role_id = role_info.title