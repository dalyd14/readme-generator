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
  const introSection = `# ${data.title}
## Project Description
${data.description}`
  
  let installSection = `
## Installation`
  if (data.typeApp === "Deployed Website") {
    installSection += `
This is a website application: please go to this [link](${data.install[0]})`
  } else if (data.typeApp === "Node.js App") {
    installSection += `
1. This is a Node.js application: please make sure you have [node downloaded](https://nodejs.org/en/download/)
1. Create a local repository and [clone](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this GitHub repository to it.`
    data.install.forEach(step => {
      installSection += `
1. ${step}`
    });
  } else {
    data.install.forEach(step => {
      installSection += `
1. ${step}`
    });
  }

  let usageSection = `
## Usage`
  data.usage.forEach(step => {
    usageSection += `
1. ${step}`
  })

  const lowerSection = `
## Contributing
${data.contribute}
## Testing
${data.tests}
## License
${data.license}
## Questions
* Please visit my [GitHub Profile](https://github.com/${data.username})
* If you have any questions regarding this project, please email me at [${data.email}](mailto:${data.email})
`

  return introSection + installSection + usageSection + lowerSection;
}

module.exports = generateMarkdown;