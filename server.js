const inquirer = require('inquirer');
const cTable = require('console.table'); 
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ilikechocolatex44',
    database: 'employee_db'
});

connection.connect(function (err) {
    if (err) throw err;
    firstChoice();
});

function firstChoice() {
    inquirer
        .prompt({
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Finish"
            ],
            name: "task"
        })
       .then(function (answer) {
        console.log("You chose: " + answer.task);

        switch(answer.task) {
            case "View all departments":
                console.log(`switch case chose ${answer.task}`);
                //viewDepartments();
                break;
            case "View all roles":
                //viewRoles();
                break;
            case "View all employees":
                //viewEmployees();
                break;
            case "Add a department":
                //addDepartment();
                break;
            case "Add a role":
                //addRole();
                break;
            case "Add an employee":
                //addEmployee();
                break;
            case "Update employee role":
                //updateEmployee();
                break;
            default:
                //finish();
        }
       });
}

//Functions

function viewDepartments() {
    
}