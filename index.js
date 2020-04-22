#!/usr/bin/env node
const inquirer = require("inquirer");
const shell = require("shelljs");
const glob = require("glob");

const basePath = `cypress/integration/`;
const isMulti = process.argv.includes("-m");

isMulti ? handleMulti() : handleSingle();

async function handleMulti() {
  inquirer.registerPrompt(
    "checkbox-plus",
    require("inquirer-checkbox-plus-prompt")
  );

  const allSpecs = glob.sync(`${basePath}/**`).map((path) => ({
    name: path.replace(basePath, ""),
    value: path,
  }));

  const { paths } = await inquirer.prompt([
    {
      type: "checkbox-plus",
      name: "paths",
      message: "Which tests do you want to run?",
      pageSize: Number.POSITIVE_INFINITY,
      highlight: true,
      searchable: true,
      default: [],
      source: async function (_, searchTerm) {
        if (!searchTerm) return allSpecs;

        return allSpecs.filter(({ name }) => name.includes(searchTerm));
      },
    },
  ]);

  const resolvePaths = paths.map(resolvePath).join(",");
  runCommad(resolvePaths);
}

async function handleSingle() {
  inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

  const { path } = await inquirer.prompt([
    {
      type: "fuzzypath",
      name: "path",
      message: "Which test do you want to run?",
      rootPath: basePath,
    },
  ]);

  runCommad(resolvePath(path));
}

function resolvePath(path) {
  const isDir = !path.endsWith(".js") && !path.endsWith(".ts");
  return isDir ? `${path}/**/*.*` : path;
}

function runCommad(paths) {
  const [, , ...args] = process.argv;
  const withoutLocalArgs = args.filter((v) => v !== "-m");
  const command = `npx cypress run --spec ${paths} ${withoutLocalArgs}`;

  if (shell.exec(command).code !== 0) {
    shell.echo("Operation failed");
    shell.exit(1);
  }
}
