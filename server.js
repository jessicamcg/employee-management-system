const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root1234',
      database: 'human_resources_db'
    },
    console.log(`Connected to the human_resources_db database.`)
);

// * needs to get elements from db, currently not persistent
let managerChoices = ['New employee is manager'];
let deptChoices = ['Executive'];
// let deptChoices = db.query('SELECT role_info.department_id AS Id, department.dept_name AS Name FROM role_info JOIN department ON role_info.department_id = department.dept_id', function (err, results) {
//     const { Id, Name } = results[0];
//     console.log(Id);
//     console.log(Name);
//     console.log(results[0]);

//     return results
// })
let roleChoices =[];
// let roleChoices = db.query('SELECT role_info.department_id AS Id, department.dept_name AS Name FROM role_info JOIN department ON role_info.department_id = department.dept_id', function (err, results) {
//     return results
// })    || [];
// console.log(roleChoices);
let employeeArr = [];

// function getDept() {
//     db.query('SELECT dept_name FROM department', function (err, results) {
        
//     });
// }

const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee',
            'View Departments',
            'View Roles',
            'View Employees',
            'Update Employee',
            'Finish'
        ]
    }
];

const addDeptQ = [
    {
        type: 'input',
        message: 'Enter the new department name:',
        name: 'dept_name'
    }
];

const addRolesQ = [
    {
        type: 'input',
        message: 'Enter the department id of the new role:',
        name: 'department'
    },
    {
        type: 'input',
        message: 'Enter the title of the new role:',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Enter the salary of the new role:',
        name: 'salary'
    }
];

const addEmployeeQ = [
    {
        type: 'input',
        message: 'What is the role id of the new employee?',
        name: 'role'
    },
    {
        type: 'input',
        message: 'Enter the first name of the new employee:',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'Enter the last name of the new employee:',
        name: 'last_name'
    },
    {
        type: 'input',
        message: "What is the manager's employee id for the new employee? (Press enter if new employee is manager)",
        name: 'manager'
    }
];

const updateEmpQ = [
    {
        type: 'input',
        message: 'Enter the employee id of the employee you would like to update:',
        name: 'who'
    },
    {
        type: 'input',
        message: 'Enter the new role id of the employee:',
        name: 'newRole'
    }
]

function init() {
    openMenu();
};

function openMenu() {
    inquirer
    .prompt(menu)
    .then((res) => {
        switch (res.action) {
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                    addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles(); 
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Finish':
                //display results idk
                console.log('Exited application.');
                process.exit(0);
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log('\n');
        console.table(results);
        openMenu();
    });
};

function viewRoles() {
    db.query('SELECT * FROM role_info', function (err, results) {
        console.log('\n');
        console.table(results);
        openMenu();
    });
};

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('\n');
        console.table(results);
        openMenu();
    });
};

function addDepartment() {
    inquirer
    .prompt(addDeptQ)
    .then((res) => {
        // console.log(res);
        db.query(`INSERT INTO department ( dept_name ) VALUES ("${res.dept_name}")`, function (err, results) {
            console.log('\n');
            console.log(res.dept_name, 'added to list of departments');
            // console.log(results);
            openMenu();
        });
        
        // deptChoices.push(res.dept_name);
    });
};

function addRole() {

    db.query('SELECT * FROM department', function (err, results) {
        console.log('\n');
        console.table(results);
    });

    inquirer
    .prompt(addRolesQ)
    .then((res) => {
        
        // let deptName = db.query('SELECT role_info.department_id AS Id, department.dept_name AS Name FROM role_info JOIN department ON role_info.department_id = department.dept_id', function (err, results) {
        //     return results
        // })

        // console.log(deptName);

        db.query(`INSERT INTO role_info ( title, salary, department_id ) VALUES ( "${res.title}", ${res.salary}, ${res.department})`, function (err, results) {
            console.log('\n');
            console.log(res.title, 'added to list of roles');
            openMenu();
        });
        // roleChoices.push(res.title)
    });
};

function addEmployee() {

    db.query('SELECT * FROM role_info', function (err, results) {
        console.log('\n');
        console.table(results);
    });

    inquirer
    .prompt(addEmployeeQ)
    .then((res) => {
        db.query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id ) VALUES ( "${res.first_name}", "${res.last_name}", "${res.role}", "${res.manager}")`, function (err, results) {
            console.log('\n');
            console.log(results);
            openMenu();
        });
    // employeeArr.push(`${res.first_name} ${res.last_name}`)
    });
};

function updateEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('\n');
        console.table(results);
    });

    inquirer
    .prompt(updateEmpQ)
    .then((res) => {
        db.query(`UPDATE employee SET role_id = ${res.newRole} WHERE employee_id = ${res.who}`, function (err, results) {
            console.log('\n');
            console.log('Employee has been updated');
            openMenu();
        });
    // employeeArr.push(`${res.first_name} ${res.last_name}`)
    });

};

init();