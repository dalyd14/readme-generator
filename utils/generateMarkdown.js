// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let licenseBadge = ''
  switch (data.license) {
    case 'Apache License 2.0':
      licenseBadge = '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
      break;
    case 'GNU General Public License v3.0':
      licenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
      break;
    case 'MIT':
      licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
      break;
    case 'The Unlicense':
      licenseBadge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
      break;
    default:
      licenseBadge = ``
      break;
  }
  const introSection = `
${licenseBadge}
# ${data.title}
## Project Description
${data.description}`


  let install = ['']
  if (data.typeOf === "Deployed Website") {
    install = data.url.split("+")
  } else if (data.typeOf === "Node.js App") {
    install = data.install.split("+")
  } else {
    install = data.installOther.split("+")
  }
  let installSection = `
## Installation`
  if (data.typeOf === "Deployed Website") {
    installSection += `
This is a website application: please go to this [link](${install[0].trim()})`
  } else if (data.typeOf === "Node.js App") {
    installSection += `
1. This is a Node.js application: please make sure you have [node downloaded](https://nodejs.org/en/download/)
1. Create a local repository and [clone](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this GitHub repository to it.`
    install.forEach(step => {
      installSection += `
1. ${step.trim()}`
    });
  } else {
    install.forEach(step => {
      installSection += `
1. ${step.trim()}`
    });
  }


  let usage = data.usage.split('+')
  let usageSection = `
## Usage`
  usage.forEach(step => {
    usageSection += `
1. ${step.trim()}`
  })

  const lowerSection = `
## Contributing
${data.contribute}
## Testing
${data.tests}
## License
Licensed under the ${data.license} license
## Questions
* Please visit my [GitHub Profile](https://github.com/${data.username})
* If you have any questions regarding this project, please email me at [${data.email}](mailto:${data.email})
`

  return introSection + installSection + usageSection + lowerSection;
}

module.exports = generateMarkdown;