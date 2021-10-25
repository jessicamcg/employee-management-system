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

let managerChoices = ['New employee is manager'];
let deptChoices = ['Executive'];
let roleChoices = [];
let employeeArr = [];

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

const addDeptQ = [
    {
        type: 'input',
        message: 'Enter the new department name:',
        name: 'dept_name'
    }
];

const addRolesQ = [
    {
        type: 'list',
        message: 'Enter the department of the new role:',
        name: 'department',
        choices: deptChoices
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
        message: 'Enter the first name of the new employee:',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'Enter the last name of the new employee:',
        name: 'last_name'
    },
    {
        type: 'list',
        message: 'What is the role of the new employee?',
        name: 'role',
        choices: roleChoices
    },
    {
        type: 'list',
        message: 'Who is the manager of the new employee?',
        name: 'manager',
        choices: managerChoices
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
                if (roleChoices.length <= 1) {
                    console.log('\nMust add new role before adding new employee\n');
                    openMenu();
                } else {
                    addEmployee();
                }
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
                console.log('Exited application.');
                break;
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
        db.query(`INSERT INTO department ( dept_name ) VALUES ( "${res.dept_name}")`, function (err, results) {
            console.log('\n');
            console.log(res.dept_name, 'added to list of departments');
            // console.log(results);
            openMenu();
        });
        deptChoices.push(res.dept_name);
    });
};

function addRole() {
    inquirer
    .prompt(addRolesQ)
    .then((res) => {
        db.query(`INSERT INTO role_info ( title, salary, department_id ) VALUES ( "${res.title}, ${res.salary}, ${res.department}")`, function (err, results) {
            console.log('\n');
            console.log(results);
            openMenu();
        });
        roleChoices.push(res.title)
    });
};

function addEmployee() {
    inquirer
    .prompt(addEmployeeQ)
    .then((res) => {
        db.query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id ) VALUES ( "${res.first_name}, ${res.last_name}, ${res.role}, ${res.manager}")`, function (err, results) {
            console.log('\n');
            console.log(results);
            openMenu();
        });
    });
    // employeeArr.push(new employee)
};

init();