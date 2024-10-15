#!/usr/bin/env node

import { program } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .version("1.0.0")
  .description("A CLI to generate a Node.js Express.js project template")
  .argument("<project-name>", "Name of the project")
  .action(async (projectName) => {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "useTypeScript",
        message: "Would you like to use TypeScript?",
        default: false,
      },
      {
        type: "confirm",
        name: "useDocker",
        message: "Would you like to include Docker configuration?",
        default: false,
      },
      {
        type: "confirm",
        name: "useJest",
        message: "Would you like to include Jest for testing?",
        default: true,
      },
    ]);

    generateProject(projectName, answers);
  });

program.parse(process.argv);

async function generateProject(projectName, options) {
  const templateDir = path.join(__dirname, "templates");
  const dockerDir = path.join(__dirname, "docker_files");
  const targetDir = path.join(process.cwd(), projectName);

  try {
    await fs.copy(templateDir, targetDir);

    if (options.useTypeScript) {
      // Add TypeScript-specific files and configurations
    }

    if (options.useDocker) {
      // Add Docker-specific files
      await addDockerFiles(targetDir);
    }

    if (options.useJest) {
      // Remove Jest-related files and configurations
      // Ensure Jest files are copied
      await fs.copy(
        path.join(templateDir, "tests"),
        path.join(targetDir, "tests")
      );
      await fs.copy(
        path.join(templateDir, "jest.config.js"),
        path.join(targetDir, "jest.config.js")
      );

      // Update package.json to include Jest
      const packageJsonPath = path.join(targetDir, "package.json");
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.scripts = {
        ...packageJson.scripts,
        test: "node --experimental-vm-modules node_modules/jest/bin/jest.js",
      };
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        jest: "^27.0.6",
        supertest: "^6.1.3",
      };
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
    await removeDockerFiles(targetDir);
    await fs.remove(path.join(targetDir, "tests"));
    await fs.remove(path.join(targetDir, "jest.config.js"));

    // Update package.json
    const packageJsonPath = path.join(targetDir, "package.json");
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    console.log(`Project ${projectName} created successfully!`);
  } catch (err) {
    console.error("Error generating project:", err);
  }
}

async function addDockerFiles(targetDir) {
  const dockerDir = path.join(__dirname, "docker_files");

  try {
    // Copy all files from dockerDir to targetDir
    await fs.copy(dockerDir, targetDir, {
      overwrite: true,
      errorOnExist: false,
    });

    console.log("Docker files added successfully");
  } catch (error) {
    console.error("Error adding Docker files:", error);
  }
}

async function removeDockerFiles(targetDir) {
  const dockerDir = path.join(__dirname, "docker_files");

  try {
    // Get the list of Docker files
    const dockerFiles = await fs.readdir(dockerDir);

    // Remove each Docker file from the target directory
    for (const file of dockerFiles) {
      const filePath = path.join(targetDir, file);
      await fs.remove(filePath);
    }

    console.log("Docker files removed successfully");
  } catch (error) {
    console.error("Error removing Docker files:", error);
  }
}
