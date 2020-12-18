// This function creates a badge depending on the license chosen
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  let licenseBadge = ''
  switch (license) {
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
  return licenseBadge
}

// This function creates a table of contents based on select keys from the answers object
const renderTableOfContents = data => {
  let contents = ``
  Object.keys(data).forEach(key => {
    if(data[key] === '') {
      delete data[key]
    } else {
      switch (key) {
        case 'description':
          contents += `* [Project Description](#project-description)
`
          break;
        case 'url':
        case 'install':
        case 'installOther':
          contents += `* [Installation](#installation)
`
          break;
        case 'usage':
          contents += `* [Usage](#usage)
`
          break;
        case 'contribute':
          contents += `* [Contributing](#contributing)
`
          break;
        case 'tests':
          contents += `* [Testing](#testing)
`
          break;
        case 'license':
          contents += `* [License](#license)
`
          break;
        case 'username':
          contents += `* [Questions](#questions)
`
          break;
        default:
          contents += ``
          break;
      }      
    }
  })
  return contents
}

// This function creates an intro section that will include the license badge, the title, 
// table of contents and then the project description
const renderIntroSection = data => {
  return `
${renderLicenseBadge(data.license)}
# ${data.title}
## Table of Contents
${renderTableOfContents(data)}
## Project Description
${data.description}
`
}

// This function creates the installation instructions section of the README
const renderInstallSection = data => {
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
  return installSection
}

// This function creates the usage instructions section of the README
const renderUsageSection = data => {
  const usage = data.usage.split('+')
  let usageSection = `
## Usage`
  usage.forEach(step => {
    usageSection += `
1. ${step.trim()}`
  })
  return usageSection
}

// This function creates the lower section that will include the contributing section, 
// the testing section, the license section and finally the questions section
const renderLowerSection = data => {
  let lowerSection = ``
  if (data.contribute !== ''){
    lowerSection += `
## Contributing
${data.contribute}`
  }

  if (data.tests !== ''){
    lowerSection += `
## Testing
${data.tests}`
  }

  if (data.license !== ''){
    lowerSection += `
## License
Licensed under the ${data.license} license`
  }

  lowerSection += `
## Questions
* Please visit my [GitHub Profile](https://github.com/${data.username})
* If you have any questions regarding this project, please email me at [${data.email}](mailto:${data.email})`

  return lowerSection
}

// This function generates the markdown for README
function generateMarkdown(data) {

  const introSection = renderIntroSection(data)

  const installSection = renderInstallSection(data)

  const usageSection = renderUsageSection(data)

  const lowerSection = renderLowerSection(data)

  return introSection + installSection + usageSection + lowerSection;
}

module.exports = generateMarkdown;