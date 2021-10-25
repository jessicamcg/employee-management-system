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
            // Update Employee,  // bonus later
            'Finish'
        ]
    }
];

function init() {
    openMenu();
};

function openMenu() {
    inquirer
    .prompt(menu)
    .then((res) => {
        console.log(res.action);
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
                
            // case 'Update Employee':      //bonus, later
            //     break;
            case 'Finish':
                //display results idk
                console.log('Finished');
                break;
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department;', function (err, results) {
        console.table(results);
    });
};

function viewRoles() {
    db.query('SELECT * FROM role_info;', function (err, results) {
        console.log(results);
    });
};

function viewEmployees() {
    db.query('SELECT * FROM employee;', function (err, results) {
        console.log(results);
    });
};

function addDepartment() {
    db.query('', function (err, results) {
        console.log(results);
    });
};

function addRole() {
    db.query('', function (err, results) {
        console.log(results);
    });
};

function addEmployee() {
    db.query('', function (err, results) {
        console.log(results);
    });
};

init();