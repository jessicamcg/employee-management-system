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

let managerChoices = ['testing'];
let deptChoices =[];

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
        type: 'input',
        message: 'Enter the title of the new role:',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Enter the salary of the new role:',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'Enter the department of the new role:',
        name: 'department'
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
        type: 'input',
        message: 'What is the role of the new employee?',
        name: 'role'
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
                console.log('Exited application.');
                break;
        }
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log('\n');
        console.table(results);
    });
    openMenu();
};

function viewRoles() {
    db.query('SELECT * FROM role_info', function (err, results) {
        console.log('\n');
        console.table(results);
    });
    openMenu();
};

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log('\n');
        console.table(results);
    });
    openMenu();
};

function addDepartment() {
    inquirer
    .prompt(addDeptQ)
    .then((res) => {
        console.log(res);
        db.query(`INSERT INTO department ( dept_name ) VALUES ( "${res.dept_name}")`, function (err, results) {
            console.log(res.dept_name, 'added to list of departments');
        });
        openMenu();
    });
};

function addRole() {
    db.query('', function (err, results) {
        console.log(results);
    });

    // if new role == manager, push to manager choices array
    
    openMenu();
};

function addEmployee() {
    db.query('', function (err, results) {
        console.log(results);
    });
    openMenu();
};

init();