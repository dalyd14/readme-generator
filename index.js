// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const fs = require('fs')

// TODO: Create an array of questions for user input
let questions = {

}
const introPrompt = [
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
];
const installPrompt = [
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
        message: "Default steps for how to download Node.js and clone a repository have been included. Please continue with the steps of how the project is to be installed: ",
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
        message: "Please enter the steps of how the project is to be installed (one at a time): ",
        when: answers => {
            if (answers.typeOf === "Other") {
                return true
            } else {
                return false
            }
        }
    },
    {
        type: 'confirm',
        name: 'moreSteps',
        message: "Would you like to enter another installation step: "
    },
];
const usagePrompt = [
    {
        type: 'input',
        name: 'usage',
        message: "Please type a single step of how the project is to be used: "
    }
];
const lowerPrompt = [
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
        choices: ['no license', 'kinda license', 'license']
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

const promptIntro = () => {
    return inquirer.prompt(introPrompt)
}
const promptInstall = () => {
    return inquirer.prompt(installPrompt)
}
const promptUsage = () => {
    return inquirer.prompt(usagePrompt)
}
const promptLower = () => {
    return inquirer.prompt(lowerPrompt)
}

// TODO: Create a function to initialize app
function init() {
    promptIntro
        .then(answers => {
            questions = {
                ...questions,
                ...answers
            }
            promptInstall
        })
        .then()
    // const markdownFile = generateMarkdown(answers)
    // writeToFile("./dist/README-template.md", markdownFile)
}

// Function call to initialize app
init();
