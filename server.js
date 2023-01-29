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
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            default:
                finish();
        }
       });
}

//Functions

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.table(res);
        firstChoice();
    })
};

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        console.table(res);
        firstChoice();
    })
};

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        console.table(res);
        firstChoice();
    })
};

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        message: "What is the name of the new department?",
        name: "newDepartment"

    })
    .then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDepartment], function(err, res) {
            if (err) throw err;
        });
        let query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
            console.table(res);
        })
        
        firstChoice();
    })
};

function addRole() {
    inquirer.prompt(
    [{
        type: 'input',
        message: "What is the name of the new role?",
        name: "newRole"

    },
    {
        type: 'input',
        message: 'What is the salary?',
        name: 'newSalary'
    },
    {
        type: 'number',
        message: "What is the department id number?",
        name: 'newDeparmentId'
    }])
    .then(function(answer){
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.newSalary, answer.newDeparmentId], function(err, res) {
            if (err) throw err;
        });
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        console.table(res);
    });
        firstChoice();
    });
};

function addEmployee() {
    inquirer.prompt(
        [{
            type: 'input',
            message: "What is the first name of the staff?",
            name: "newFirstName"
    
        },
        {
            type: 'input',
            message: 'What is last name of the staff?',
            name: 'newLastName'
        },
        {
            type: 'number',
            message: "What is the id number for their role?",
            name: 'newRoleId'
        },
        {
            type: 'number',
            message: "What is the manager\'s id?",
            name: "newManagerId"
        }]).then(function(answer){
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newFirstName, answer.newLastName, answer.newRoleId, answer.newManagerId], function(err, res) {
                if (err) throw err;
            });
        let query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.table(res);
        });
            firstChoice();
        });
};

function updateEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you would like to update?",
        name: "updateEmployee"
      },

      {
        type: "number",
        message: "What is the employee\'s new role id?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {

        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.updateEmployee],function(err, res) {
          if (err) throw err;
        });
        let query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.table(res);
        });
        firstChoice();
      });
}

function finish() {
    connection.end();
    process.exit();
}