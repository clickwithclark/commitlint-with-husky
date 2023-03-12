#!/usr/bin/env node

const process = require("process");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const chalk = require("chalk");

(function init() {
  
  
  let userPkg =  require(path.resolve(process.cwd(),"./package.json"));
  const configFile = require(path.resolve(__dirname,"../.commitlintrc.json"));

    //shallow copy to avoid mutating user copy prematurely
    userPkg =  JSON.parse(JSON.stringify(userPkg))

    //append pinst scripts to user scripts in package.json
    userPkg.scripts.postpublish ="pinst --disable" ;
    userPkg.scripts.prepublishOnly ="pinst --enable" ;
    userPkg.scripts.prepublishOnly ="pinst --enable" ;

    //update package.json with merged scripts
  try {
    fs.writeFileSync(path.resolve(process.cwd(),"./package.json"), JSON.stringify(userPkg, null, 2));
  } catch (error) {
    console.log(chalk.bold.red("Error updating user package.json:\n"),error)
  }
    
// move basic config file to user's project folder

try {
  fs.writeFileSync(path.resolve(process.cwd(),"./.commitlintrc.json"), JSON.stringify(configFile, null, 2));
} catch (error) {
  console.log(chalk.bold.red("Error copying over basic config file for Commitlint:\n"),error)
}
  
 /*  execute postinstall script from package.json
     to initialize user repo */

    let child = spawn(String.raw`npx --yes husky install && npx --yes husky add .husky/commit-msg "npx --yes commitlint --edit \"$1\""`, { shell: true });
  

    child.stdout.on("data", (data) => {
      console.log(chalk.bold.green("SUCCESS"),'\n',data.toString())
    });
    child.stderr.on("data", (data) => {
      console.log(chalk.bold.red("FAILURE"),'\n',data.toString())
    });
  
    child.on("error", (error) => {
      console.log(chalk.bold.red("Error Message"),'\n',  error.message);
      console.log(chalk.bold.yellow("Please Make sure you run npm i commitlint-with-husky first!! before npx commitlint-with-husky"));
    });
    
    child.on('exit', function (exitCode) {
      console.log(chalk.cyan(`Process exited with code: ${ exitCode}`));
    });

  })();