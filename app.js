const chalk = require('chalk');
const mysql = require("mysql2");
const inquirer = require("inquirer");
const figlet = require("figlet");

// connect to mysql db

const connection = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        port: process.env.PORT || 3001,
        user: process.env.DB_USER,
        password: provess.env.DB_PASSWORD,
        database: provess.env.DB_DATABASE,
    },
    console.log("Connected to employee_cms database")
);

connection.connect((err) => {
    if (err) throw err;

    console.table(chalk.blue("Welcome to the Employee Management System"));
    
    badCompany();
});

const askNewEmployee = [
    "What is the first name?",
    "What is the last name?",
    "What is their role?",
    "Who is their manager?",
];

const roleQuery = 
    'SELECT * FROM roles; SELECT CONCAT (e.first_name, " ",e.last_name) AS full_name FROM employees e';

const allStaff = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name, " ",m.last_name) AS "Manager"
FROM employees e
LEFT JOIN roles roleQuery
ON r.id = e.role_id
LEFT JOIN departments d
ON d.did = r.department_id
LEFT JOIN employees m on m.id = e.manager_id
ORDER BY e.id;`;

const managerQuery = `SELECT CONCAT (e.first_name," ",e.last_name) AS full_name,r.title, d.name FROM employee e INNER JOIN roles r ON r.id = e.role_id INNER JOIN department d ON d.did =r.department_id WHERE name = "Management";`

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
                "Update employee managers",
                "View employees by manager",
                "Delete department",
                "Delete role",
                "Delete employee",
                "View the total salary budget of a department",
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

                case "View employees by manager":
                    viewEmpByManager();
                    break;
              
                case "Update employee roles":
                    updateEmpRole();
                    break;

                case "Update employee managers":
                    updateEmpManagers();
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

                case "View the total salary budget of a department":
                    companyBudget();
                    break;    

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const addDepartment = () => {
    // show the current Departments in the database
    const query = "SELECT * FROM department";
    connection.query(query, (err, results) => {
      if (err) throw err;
  
      console.log(chalk.green("List of current departments"));
  
      console.table(results);
  
      // ask what the name is for the new dept
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
            `INSERT INTO department(name) VALUES(?)`,
            [answer.newDept],
            (err, results) => {
              badCompany();
            }
          );
        });
    });
  };