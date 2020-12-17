// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs')

// TODO: Create an array of questions for user input
const prompt = [
    {
        type: 'input',
        name: 'title',
        message: "Please type the project's title: "
    },
    {
        type: 'input',
        name: 'description',
        message: "Please type the project's description: "
    },
    {
        type: 'list',
        name: 'typeOf',
        message: "What type of project is this: ",
        choices: ["Deployed Website", "Node.js App", "Other"]
    },
    {
        type: 'input',
        name: 'url',
        message: "Enter the link of the website: ",
        when: answers => {
            if (answers.typeOf === "Deployed Website") {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'install',
        message: "Default steps for how to download Node.js and clone a repository have been included. Please continue with any further steps of how to finish installation of this projecte (seperate each step with a '+'): ",
        when: answers => {
            if (answers.typeOf === "Node.js App") {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'installOther',
        message: "Please enter the steps of how the project is to be installed (seperate each step with a '+'): ",
        when: answers => {
            if (answers.typeOf === "Other") {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: "Please type the steps of how the project is to be used (seperate each step with a '+'): "
    },
    {
        type: 'input',
        name: 'contribute',
        message: "Please type how you would like users to contribute to your project: "
    },
    {
        type: 'input',
        name: 'tests',
        message: "Please type how users can test their contributions: "
    },
    {
        type: 'list',
        name: 'license',
        message: "Please choose a license for this project: ",
        choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT', 'The Unlicense']
    },
    {
        type: 'input',
        name: 'username',
        message: "Please type your GitHub username: "
    },
    {
        type: 'input',
        name: 'email',
        message: "Please type your email address: "
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err
        console.log('README Generated Successfully!')
    })
}

const answers = {
    title: 'Readme Gen',
    description: 'A node.j command line app for generating professional readmes for projects',
    typeApp: "Node.js App",
    install: ['This is first step', 'This is second step', 'This is third step'],
    usage: ['Type "node index" to start the program', 'answer the prompted questions', 'The file will be generated in the dist folder', 'remember to make any necessary changes'] ,
    contribute: 'No contributions please',
    tests: "Don't",
    license: 'kinda license',
    username: 'dalyd14',
    email: 'dalyd14@gmail.com'
}

const promptInquirer = () => {
    return inquirer.prompt(prompt)
}

// TODO: Create a function to initialize app
function init() {
    promptInquirer()
        .then(answers => {
            const markdownFile = generateMarkdown(answers)
            writeToFile("./dist/README-template.md", markdownFile)
        })
    // const markdownFile = generateMarkdown(answers)
    // writeToFile("./dist/README-template.md", markdownFile)
}

// Function call to initialize app
init();
