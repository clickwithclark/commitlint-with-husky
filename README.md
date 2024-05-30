# No-Sweat™ Commitlint and Husky Setup

This is my attempt at setting up a project/repo with Commitlint and Husky
as fast as possible.

## What it does

- Commitlint (you guessed it) lints your comments based on [conventional commits' Standards](https://www.conventionalcommits.org/)
- Husky uses githooks to lint the commits before they are actually executed (pre-commit hook)

You are very welcome to overwrite any of these settings, or just fork the entire thing to create your own.

## Installing

1. If you don't already have a `package.json` file, create one with `npm init`.

2. Then ensure you have a .git folder create one with `git init`.

3. In the root of your project execute the following command in your terminal:

```
npm i commitlint-with-husky --save-dev
```
The  configuration files will be added to your project by the postinstall script:


4. You can see in your package.json there are now 2 scripts added to your script property if you should need it. You can uninstall ```pinst``` if you don't need it.

```json
  "scripts": {
  "your other scripts":"..."

    "postpublish": "pinst --enable "
    "prepublishOnly": "pinst --disable",
  },
```

## Notice

I work on a windows machine, to the best of my knowledge the package works on all platforms, if not please don't hesitate to let me know.

Enjoy!

[MIT](https://github.com/clickwithclark/commitlint-with-husky/blob/main/LICENSE)
