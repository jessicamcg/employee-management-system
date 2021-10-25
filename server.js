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
            // Update Employee  // bonus later
            'Finish'
        ]
    }
];

function init() {
    inquirer
        .prompt(menu)
        .then((res) => {
            console.log(res);
            switch (res) {
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                // case 'Update Employee':      //bonus, later
                //     break;
                case 'Finish':
                    //display results idk
                    console.log('done');
                    break;
            }
        });
};

function viewDepartments() {
    db.query('', function (err, results) {
        console.log(results);
    });
};

function viewRoles() {
    db.query('', function (err, results) {
        console.log(results);
    });
};

function viewEmployees() {
    db.query('', function (err, results) {
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