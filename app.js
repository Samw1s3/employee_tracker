
const mysql = require("mysql2");
const inquirer = require("inquirer");
require('dotenv').config();


// connect to mysql db

const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true,
    },
    console.log("Connected to employee_cms database")
);

connection.connect((err) => {
    if (err) throw err;

    console.table("Welcome to the Employee Management System");
    
    badCompany();
});

const askNewEmployee = [
    "What is the first name of the new employee?",
    "What is their last name?",
    "What is their role?",
    "Who is their manager?",
];

const roleQuery = 
    `SELECT * FROM roles; SELECT CONCAT(first_name,'',last_name) AS full_name FROM employees;`;

const allStaff = `SELECT * FROM employees`;

const badCompany = () => {
    inquirer
        .prompt({
            name:"action",
            type:"rawlist",
            message: "What would you like to do?",
            choices: [
                "Add a department",
                "Add an employee",
                "Add a role",
                "View a department",
                "View employees",
                "View a role",
                "Update employee roles",
                "Delete department",
                "Delete role",
                "Delete employee",
                "Exit",   
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case "Add a department":
                    addDepartment();
                    break;
          
                  case "Add an employee":
                    addEmployee();
                    break;
          
                  case "Add a role":
                    addRole();
                    break;
          
                  case "View a department":
                    viewDepartments();
                    break;
          
                  case "View employees":
                    viewEmployees();
                    break;
          
                  case "View a role":
                    viewRoles();
                    break;
              
                case "Update employee roles":
                    updateEmpRole();
                    break;

                case "Delete department":
                    deleteDepartment();
                    break; 

                case "Delete role":
                    deleteRole();
                    break;
                
                case "Delete employee":
                    deleteEmployee();
                    break;  

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const addDepartment = () => {
    // show the current Departments in the database
    const query = "SELECT * FROM departments";
    connection.query(query, (err, results) => {
      if (err) throw err;
  
      console.log("List of current departments");
  
      console.table(results);
  
      // ask what the name is for the new 
      inquirer
        .prompt([
          {
            name: "newDept",
            type: "input",
            message: "What is the name of the new department?",
          },
        ])
        .then((answer) => {
          connection.query(
            `INSERT INTO departments(department_name) VALUES(?)`,
            [answer.newDept],
            (err, results) => {
              badCompany();
            }
          );
        });
    });
  };

  const addEmployee = () => {
    connection.query(roleQuery, (err, results) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "fName",
            type: "input",
            message: askNewEmployee[0],
          },
  
          {
            name: "lName",
            type: "input",
            message: askNewEmployee[1],
          },
  
          {
            name: "role",
            type: "list",
            // A FX in the choices creates a new array from results (all from roles table) loops and returns
            // the array of titles
            choices: function () {
              let choiceArr = results[0].map((choice) => choice.title);
              return choiceArr;
            },
           
            message: askNewEmployee[2],
          },
          {
            name: "manager",
            type: "list",
            // A FX that creates a new array from employee table, the concatenated first and last name
            // and returns an array of the full name
            choices: function () {
              let choiceArr = results[1].map((choice) => choice.full_name);
              return choiceArr;
            },
            // asking who is their manager
            message: askNewEmployee[3],
          },
        ])
        .then((answer) => {
          connection.query(
            `INSERT INTO employees(first_name,last_name, role_id, manager_id) 
            VALUES (?,?, 
              (SELECT id FROM roles WHERE title = ?), 
              (SELECT id FROM (SELECT id FROM employees WHERE CONCAT(first_name,last_name) = ?)
              AS tmptable))`,
            [answer.fName, answer.lName, answer.role, answer.manager]
          );
          badCompany();
        });
    });
  };

  const addRole = () => {
    const addRoleQuery = `SELECT * FROM roles; SELECT * FROM departments;`;
    connection.query(addRoleQuery, (err, results) => {
      if (err) throw err;
  
      console.log("List of current roles");
      console.table(results[0]);
  
      inquirer
        .prompt([
          {
            name: "newTitle",
            type: "input",
            message: "What is the title of the new role?",
          },
          {
            name: "newSalary",
            type: "input",
            message: "What is the salary amount for the new role:",
          },
          {
            name: "dept",
            type: "list",
            // A FX that creates a new array from the department table
            //and loops through the name column and returns the new array
            choices: function () {
              let choiceArr = results[1].map((choice) => choice.department_name);
              return choiceArr;
            },
            message: "Choose the department id for the new role?",
          },
        ])
        .then((answer) => {
          connection.query(`INSERT INTO roles(title, salary, department_id) 
                  VALUES("${answer.newTitle}","${answer.newSalary}", 
                  (SELECT id FROM departments WHERE department_name = "${answer.dept}"));`);
          badCompany();
        });
    });
  };
  
  const viewDepartments = () => {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      badCompany();
    });
  };
  
  const viewEmployees = () => {
    const query = "SELECT * FROM employees";
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      badCompany();
    });
  };

  const viewRoles = () => {
    const query = "SELECT * FROM roles";
    connection.query(query, (err, results) => {
      if (err) throw err;
      console.table(results);
      badCompany();
    });
  };

  const updateEmpRole = () => {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the employee ID you would like to update?",
        },
        {
          name: "role",
          type: "input",
          message: "What is the role ID?",
        },
      ])
      .then((answers) => {
        const query = `UPDATE employees SET role_id = ? WHERE id = ?`;
        connection.query(query, [answers.id, answers.role], (err, results) => {
          if (err) throw err;
          console.log(results);
          badCompany();
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const deleteDepartment = () => {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "dept",
            type: "list",
            // make a new array and loop through, return each item ie.(department)
            choices: function () {
              let choiceArr = results.map((choice) => choice.department_name);
              return choiceArr;
            },
            // pick the array item to be deleted
            message: "Choose the department to be deleted:",
          },
        ])
        .then((answer) => {
          connection.query(`DELETE FROM department WHERE ?`, {
            name: answer.dept,
          });
          badCompany();
        });
    });
  };
  
  const deleteRole = () => {
    query = "SELECT * FROM roles;";
    connection.query(query, (err, results) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            name: "removeRole",
            type: "list",
            choices: function () {
              let choiceArr = results.map((choice) => choice.title);
              return choiceArr;
            },
  
            message: "Which role would you like to delete?",
          },
        ])
        .then((answer) => {
          connection.query(`DELETE FROM roles WHERE ?`, {
            title: answer.removeRole,
          });
          badCompany();
        });
    });
  };

  const deleteEmployee = () => {
    connection.query(allStaff, (err, results) => {
      if (err) throw err;
  
      
      console.table(results);
  
      inquirer
        .prompt([
          {
            name: "removeID",
            type: "input",
            message: "Enter the Employee ID of the person to be removed:",
          },
        ])
        .then((answer) => {
          connection.query(`DELETE FROM employees WHERE ?`, {
            id: answer.removeID,
          });
          badCompany();
        });
    });
  };
  
  
  