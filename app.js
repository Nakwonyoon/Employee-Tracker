const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "skrdnjs1",
    database: "employee_trackerDB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "starting",
            message: "which one?",
            choices: [
                "view all employees",
                "view all by roles",
                "view all by departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "remove employee",
                "quit"
            ]
        }).then((answer) => {
            switch (answer.starting) {
                case "view all employees":
                    viewEmployee();
                    break;
                case "view all by roles":
                    viewRole();
                    break;
                
                case "view all by departments":
                    viewDepartment();
                    break;
                case "add department":
                addDepartment()
                break;

                case "add employee":
                    addEmployee();
                    break;
                case "update employee role":
                    updatRole();                
                     break;
                case "remove employee":
                    removeEmployee()
                    break;              
                case "quit":
                    stop()
                    break;
            };
        });
}
start();

function viewEmployee() {
    connection.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id", function (err, answer) {
        console.log("=================================================================================")
        console.table(answer)
    });
    start();
}
function viewRole() {
    connection.query("SELECT * FROM role", function (err, answer) {
        console.log("=================================================================================")

        console.table(answer)
    });
    start();
}
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, answer) {
        console.log("=================================================================================")
        console.table(answer)
    });
    start();
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter Department name",
                name: "department"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                function (err, answer) {
                    if (err) throw err;
                    console.table(answer);
                }
            );
            start();
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastname"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                },
                function (err, answer) {
                    if (err) throw err;
                    console.table(answer);
                }
            );
            start();
        });
}


function updatRole() {
    const allEmployee = [];
    connection.query("SELECT * FROM employee", function(err, answer) {
      for (let i = 0; i < answer.length; i++) {
        let list =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        allEmployee.push(list);
      } inquirer.prompt([
          {
            type: "list",
            name: "updateRole",
            message: "select employee to update role",
            choices: allEmployee
          },
          {
            type: "list",
            message: "select new role",
            choices: [ "engineering" , "manager", "employee"],
            name: "role"
          }
        ])
        .then(function(answer) {
          let idChange = [];
          idChange.employeeId = parseInt(answer.updateRole.split(" ")[0]);
          if(answer.role === "engineering"){
            idChange.role_id = 2;
          } else if (answer.role === "manager") {
            idChange.role_id = 1;
          } else if (answer.role === "employee") {
            idChange.role_id = 3;
          }
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [idChange.role_id, idChange.employeeId], function(err, answer) {
                console.log(idChange.employeeId);
                console.table(answer);
              start();
            }
          );
        });
    });
  }

function removeEmployee(){
    const allEmployee = [];
    connection.query("SELECT * FROM employee", function(err, answer) {
      for (let i = 0; i < answer.length; i++) {
        let list =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        allEmployee.push(list);
     
      }
      inquirer.prompt
      ([
        {
            type: "list",
            name: "remove",
            message: "select employee to remove",
            choices: allEmployee
        }
      ]).then(function(answer){
        let idUpdate = {};
        idUpdate.employeeId = parseInt(answer.remove.split(" ")[0]);
        connection.query("DELETE FROM employee WHERE id = ?",function(err, answer){
              console.table(answer);
          })
      })
});
}

function stop(){
    connection.end();
}
