# Readme Generator

## Description
The readme generator is a command-line tool that allows a GitHub user to create a readme (markdown file) describing his or her project, and guides them section by section through a series of questions about their project. The application also dynamically generates repository-specific content such as badges and license information to be included in the readme.

## Usage
The readme generator application is run at the command line using [Node.js](https://nodejs.org/en/). Navigate to the directory containing index.js and package.json, and `npm install` the readme generator's dependencies. 

Then run the application by typing `node index.js` and following the prompts, as shown below:

![readme generator demo gif](/readme-generator-demo-gif.gif)

The same demo of the readme generator is available as an [.mp4 file](https://github.com/angelagongli/readme-generator/blob/master/readme-generator-demo.mp4), and is actually readable in this form. 

## Credits
The [GitHub API](https://developer.github.com/v3/) is used to retrieve the GitHub user's profile and repository information, and the [inquirer](https://www.npmjs.com/package/inquirer) and [axios](https://www.npmjs.com/package/axios) npm packages are used to collect user input at the command line and call the GitHub API.

The badges included in the generated readme are from [shields.io](https://shields.io/).

## License
Copyright (c) Angela Li. All rights reserved.
Licensed under the [MIT License](LICENSE).