const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root1234',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
);

const menu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'action',
        choices: [
            'Add Department',
            'Add Role',
            'Add Employee'
            // Update Employee  // bonus later
        ]
    }
];

function init() {
    inquirer
        .prompt([menu])
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
                case 'Finish':
                    //display results idk
                    console.log('done');
                    break;
                // case 'Update Employee':      //bonus, later
                //     break;
            }
        });
};

function addDepartment() {
    
};

function addRole() {
    
};

function addEmployee() {
    
};

init();