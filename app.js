const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
    {
        type: 'input',
        message: 'What is the employee name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the employee id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is the employee email?',
        name: 'email',
    },
    {
        type: 'list',
        message: 'What is the employee role?',
        name: 'role',
        choices: ['Intern', 'Engineer', 'Manager']
    },
];

// team will consist of employee objects
const team = [];

// function to initialize questions
function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            const role = response.role
            console.log(role)
            if (role === "Intern") {
                inquirer
                    .prompt(
                        [{
                            type: 'input',
                            message: 'Enter intern school.',
                            name: 'school',
                        },
                        {
                            type: 'list',
                            message: 'New employee?',
                            name: 'new',
                            choices: ['yes', 'no']
                        },
                    ])
                    .then((internResponse) => {
                        console.log(internResponse)
                        let internEmployee = new Intern(response.name, response.id, response.email, internResponse.school)
                        team.push(internEmployee)
                        if(internResponse.new === 'yes') {
                            init();
                        } else {
                            console.log(team)  
                        }
                    })
            } else if (role === "Engineer") {
                inquirer
                    .prompt(
                        [{
                            type: 'input',
                            message: 'Enter engineer GitHub username.',
                            name: 'github',
                        },
                        {
                            type: 'list',
                            message: 'New employee?',
                            name: 'new',
                            choices: ['yes', 'no']
                        },
                    ])
                    .then((engineerResponse) => {
                        console.log(engineerResponse)
                        let engineerEmployee = new Engineer(response.name, response.id, response.email, engineerResponse.github)
                        team.push(engineerEmployee)
                        if(engineerResponse.new === 'yes') {
                            init();
                        } else {
                            console.log(team)  
                        }
                    })
            } else if (role === "Manager") {
                inquirer
                    .prompt(
                        [{
                            type: 'input',
                            message: 'Enter manager office number',
                            name: 'office',
                        },
                        {
                            type: 'list',
                            message: 'New employee?',
                            name: 'new',
                            choices: ['yes', 'no']
                        },
                    ])
                    .then((managerResponse) => {
                        console.log(managerResponse)
                        let managerEmployee = new Manager(response.name, response.id, response.email, managerResponse.office)
                        team.push(managerEmployee)
                        if(managerResponse.new === 'yes') {
                            init();
                        } else {
                            console.log(team) 
                            // function to render team and send to html is called 
                            createTeam();
                        }
                    })
            } 
        });
}

// function to initialize qs is called
init();

// function to render team and write in an html file
const createTeam = () => {
     if (!fs.existsSync(OUTPUT_DIR)) {
       fs.mkdirSync(OUTPUT_DIR);
     }
  
     fs.writeFile(outputPath, render(team), (err) => {
       if (err) throw err;
       console.log("Success!")
     });
   };
