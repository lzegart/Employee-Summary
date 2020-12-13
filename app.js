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
                        }
                    })
            } 
        });
}

// function to initialize qs is called
init();


// function renderMain () {
//     const HTML = render(team);
//     fs.writeFile(outputPath, HTML, (err) => {
//         if (err) throw err
//     })
// }

// const writeIt = () => {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//       fs.mkdirSync(OUTPUT_DIR);
//     }
  
//     fs.writeFile(outputPath, render(team), (err) => {
//       if (err) throw err;
//       console.log("Your file has been created in the output folder.")
//     });
//   };

//   writeIt();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
