const inquirer = require('inquirer');
const render = require('./lib/htmlRenderer')
const fs = require('fs');

const questions = [
    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'list',
        message: 'What is your role?',
        name: 'role',
        choices: ['Intern', 'Engineer', 'Manager']
    },
    {
        type: 'input',
        message: 'If you are an Intern, enter your school.',
        name: 'school',
    },
    {
        type: 'input',
        message: 'If you are an Engineer, enter your GitHub username.',
        name: 'github',
    },
    {
        type: 'input',
        message: 'If you are a Manager, enter your office umber.',
        name: 'office',
    },
];


// function to initialize questions
function init() {
    inquirer
      .prompt(questions)
      .then((response) => {
          let storeInfo = render(response)
          console.log(storeInfo)
          console.log(response)
      }
  );
}
 
// function call to initialize qs
init();



// module.exports = questions 
