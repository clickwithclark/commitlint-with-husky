#!/usr/bin/env node

const process = require("process");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const chalk = require("chalk");

(function init() {
  const userDirectory = process.env.INIT_CWD;
  let userPkg = require(path.resolve(userDirectory, "./package.json"));

  const configFile = require(path.resolve(__dirname, "../.commitlintrc.json"));


  //taken from https://www.youtube.com/live/2J9VnYiZ_Ts?feature=share
  const huskyInstallation = String.raw`npx --yes husky install && npx --yes husky add .husky/commit-msg "npx --yes commitlint --edit \"$1\""`;

  //shallow copy to avoid mutating user copy prematurely
  userPkg = JSON.parse(JSON.stringify(userPkg));

  //append pinst scripts to user scripts in package.json
  userPkg.scripts.postpublish = "pinst --disable";
  userPkg.scripts.prepublishOnly = "pinst --enable";

  //update package.json with merged scripts
  try {
    fs.writeFileSync(
      path.resolve(userDirectory, "./package.json"),
      JSON.stringify(userPkg, null, 2)
    );
  } catch (error) {
    console.log(chalk.bold.red("Error updating user package.json:\n"), error);
  }

  // move basic config file to user's project folder

  try {
    fs.writeFileSync(
      path.resolve(userDirectory, "./.commitlintrc.json"),
      JSON.stringify(configFile, null, 2)
    );
  } catch (error) {
    console.log(
      chalk.bold.red("Error copying over basic config file for Commitlint:\n"),
      error
    );
  }
  //install husky and git message hook
  exec(huskyInstallation, { cwd: userDirectory }, (error) => {
    if (error?.code) {
      console.error(chalk.bold.red("An Error Occurred:\n\n"), error.message);
      return;
    }
     
  });
  console.log(chalk.bold.green("commitlint-with-husky installed"))
})();
