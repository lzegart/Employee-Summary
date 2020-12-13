const inquirer = require('inquirer');
const render = require('./lib/htmlRenderer')
const fs = require('fs');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

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
                        }
                    })
            } 
        });
}

// function call to initialize qs
init();



module.exports = questions 
