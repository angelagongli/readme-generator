const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

function validateInput (input) {
    if (input !== "") {
        return true;
    }
    else {
        return "This is a required field!";
    }
}

function generateMarkdown (answers, data) {
    let markdown = `# ${answers.title}

![GitHub license](https://img.shields.io/github/license/${answers.username}/${answers.reponame}) 
![GitHub language count](https://img.shields.io/github/languages/count/${answers.username}/${answers.reponame})
![GitHub top language](https://img.shields.io/github/languages/top/${answers.username}/${answers.reponame})

## Table of Contents
`;
    let sectionCounter = 1;
    let sections = "";
    for (const answer in answers) {
        if (answer === "username" || answer === "password" ||
            answer === "reponame" || answer === "title" ||
            answer === "license") {
            continue;
        }
        if (answers[answer] !== "") {
            let sectionTitle = answer.charAt(0).toUpperCase() + 
                answer.substring(1);
            markdown += sectionCounter + ". " + sectionTitle + "\n";
            sections += "## " + sectionTitle + "\n" + 
                answers[answer] + "\n\n";
            sectionCounter++;
        }
    }
    markdown += sectionCounter + ". License\n";
    sectionCounter++;
    markdown += sectionCounter + ". About the Author\n\n" + 
        sections + `
## License
Copyright (c) ${data.name}. All rights reserved.
Licensed under the [${answers.license}](LICENSE).

## About the Author
${data.name} (${data.email})  
![user bio image](${data.avatar_url})`;
    return markdown;
}

let prefix = `Formatting instructions:
*italics*
**bold**
1. ordered list
* unordered list
![image alt text](image url)
[link text](link url)
2 spaces => line break
`;

inquirer.prompt([
    {
        type: "input",
        message: "Please enter your GitHub username:",
        name: "username",
        validate: validateInput
    },
    {
        type: "password",
        message: "Please enter your GitHub password:",
        name: "password",
        validate: validateInput
    },
    {
        type: "input",
        message: "Please enter your project's GitHub repository name:",
        name: "reponame",
        validate: validateInput
    },
    {
        type: "input",
        message: "What is the title of your project?",
        name: "title",
        validate: validateInput
    },
    {
        type: "editor",
        message: "Please describe your project:",
        name: "description",
        validate: validateInput,
        prefix: prefix
    },
    {
        type: "input",
        message: "Please enter installation instructions or leave blank if N/A:",
        name: "installation",
    },
    {
        type: "input",
        message: "Please enter usage guidelines or leave blank if N/A:",
        name: "usage"
    },
    {
        type: "input",
        message: "Please advise on contributing to your project or leave blank if N/A:",
        name: "contributing"
    },
    {
        type: "input",
        message: "Please provide your project's test suite or leave blank if N/A:",
        name: "tests"
    },
    {
        type: "editor",
        message: "Please provide FAQs about your project (and the answers!) or leave blank if N/A:",
        name: "questions",
        validate: validateInput,
        prefix: prefix
    },
    {
        type: "list",
        message: "Which open source license are you using?",
        name: "license",
        choices: ["Apache License 2.0", "GNU General Public License v3.0", "MIT License"],
    }
]).then(answers => {
    const { username, password } = answers;
    const queryURL = `https://api.github.com/users/${username}`;
    axios.get(queryURL, {
        auth: {
            username: username,
            password: password
        }
    }).then(response => {
        fs.writeFile("README.md", generateMarkdown(answers, response.data), error => {
            if (error) {
                throw error;
            }
        });
    }).catch((error) => {
        console.log(error);
    });
});
