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
    if(data[key] === '' || (key === 'license' & data[key] === 'None')) {
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
  let introSection =''
  if (data.license !== 'None') {
    introSection += renderLicenseBadge(data.license)
  }
  introSection += `
# ${data.title}
## Table of Contents
${renderTableOfContents(data)}
## Project Description
${data.description}
`
  return introSection
}

// This function creates the installation instructions section of the README
const renderInstallSection = data => {
  let install = []
  if (data.typeOf === "Deployed Website") {
    install = data.url.trim()
  } else if (data.typeOf === "Node.js App" & data.install.length>0) {
    install = data.install.split("+")
  } else if (data.typeOf === "Other" & data.install.length>0) {
    install = data.installOther.split("+")
  }
  if (data.typeOf === "Deployed Website" || !!install.length) {
    let installSection = `
## Installation`
    if (data.typeOf === "Deployed Website") {
      installSection += `
This is a website application: please go to this [link](${install})`
    } else if (data.typeOf === "Node.js App") {
      installSection += `
1. This is a Node.js application: please make sure you have [node downloaded](https://nodejs.org/en/download/)
2. Create a local repository and [clone](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this GitHub repository to it.`
      let i = 3
      install.forEach(step => {
        const finishedStep = renderCodeSnippet(step)
        installSection += `
${i}. ${finishedStep.trim()}`
        i += 1
      });
    } else if (data.typeOf === "Other") {
      let i = 1
      install.forEach(step => {
        const finishedStep = renderCodeSnippet(step)
        installSection += `
${i}. ${finishedStep.trim()}`
        i += 1
      });
    }
    return installSection
  } else {
    return ''
  }
}

// This function creates the usage instructions section of the README
const renderUsageSection = data => {
  if (data.usage) {
    const usage = data.usage.split('+')
    let usageSection = `
## Usage`
    let i = 1;
    usage.forEach(step => {
      const finishedStep = renderCodeSnippet(step)
      usageSection += `
${i}. ${finishedStep.trim()}`
      i += 1
    })
    return usageSection    
  } else {
    return ''
  }
}

// This function creates the lower section that will include the contributing section, 
// the testing section, the license section and finally the questions section
const renderLowerSection = data => {
  let lowerSection = ``
  if (data.contribute){
    lowerSection += `
## Contributing
${renderCodeSnippet(data.contribute)}`
  }

  if (data.tests){
    lowerSection += `
## Testing
${renderCodeSnippet(data.tests)}`
  }

  if (data.license & data.license !== 'None'){
    lowerSection += `
## License
Licensed under the ${data.license} license`
  }

  
  lowerSection += `
## Questions
* Please visit my [GitHub Profile](https://github.com/${data.username})`

  if (data.email){
    lowerSection += `
* If you have any questions regarding this project, please email me at [${data.email}](mailto:${data.email})`
  }

  return lowerSection
}

// This function will render a block code snippet for anything wrapped in {}
const renderCodeSnippet = text => {
  return text.split('|').join('\n```\n')
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