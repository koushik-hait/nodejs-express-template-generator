# Node.js Express Template Generator

A command-line interface (CLI) tool to generate a customizable Node.js [Express.js](https://expressjs.com/) project template.

## Features

- Quick setup of a Node.js Express.js project structure
- Optional [TypeScript](https://www.typescriptlang.org/) support
- Optional [Docker](https://www.docker.com/) configuration
- Optional [Jest](https://jestjs.io/) testing setup
- Customizable project structure

## Installation

You can install this package globally using [npm](https://www.npmjs.com/):

```bash
npm install -g nodejs-express-template-generator
```

# Usage

After installation, you can use the CLI tool to generate a new project:

```bash
create-nodejs-express-app my-new-project
```

Follow the prompts to customize your project:

- Choose whether to use TypeScript
- Decide if you want to include Docker configuration
- Select whether to include Jest for testing

## Project Structure

The generated project will have the following structure:

my-new-project/
├── src/
│ ├── config/
│ │ └── index.js
│ ├── controllers/
│ │ └── exampleController.js
│ ├── middlewares/
│ │ └── exampleMiddleware.js
│ ├── models/
│ │ └── exampleModel.js
│ ├── routes/
│ │ └── index.js
│ ├── services/
│ ├── utils/
│ └── index.js
├── tests/
│ ├── unit/
│ └── integration/
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── README.md
└── package.json

# Configuration

After generating your project, you can further customize it by:

- Renaming the `.env.example` file to `.env` and updating the environment variables.
- Modifying the ESLint and Prettier configurations in `.eslintrc.js` and `.prettierrc` respectively.
- Adding your specific project details to the generated `README.md`.

# Scripts

The generated `package.json` includes the following scripts:

- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon

# Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/koushik-hait/nodejs-express-template-generator/pulls).

# License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

# Support

If you encounter any problems or have any questions, please open an [issue](https://github.com/koushik-hait/nodejs-express-template-generator/issues) on the GitHub repository.

# Acknowledgements

This project was inspired by the need for a quick and customizable way to scaffold Node.js Express.js projects.
