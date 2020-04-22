const inquirer = require("inquirer");
const shell = require("shelljs");

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

(async () => {
  const { path } = await inquirer.prompt([
    {
      type: "fuzzypath",
      name: "path",
      message: "Which test do you want to run?",
      rootPath: "./cypress/integration",
    },
  ]);

  const [, , ...restOptions] = process.argv;

  const isDir = !path.endsWith(".js") && !path.endsWith(".ts");
  let resolvedPath = path;
  if (isDir) resolvedPath = `${path}/**/*.*`;
  const args = restOptions.join(" ");
  const command = `npx cypress run --spec ${resolvedPath} ${args}`;

  if (shell.exec(command).code !== 0) {
    shell.echo("Operation failed");
    shell.exit(1);
  }
})();
