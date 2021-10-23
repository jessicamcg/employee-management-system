const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root1234',
      database: 'books_db'
    },
    console.log(`Connected to the books_db database.`)
  );