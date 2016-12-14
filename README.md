# updater-package [![NPM version](https://img.shields.io/npm/v/updater-package.svg?style=flat)](https://www.npmjs.com/package/updater-package) [![NPM monthly downloads](https://img.shields.io/npm/dm/updater-package.svg?style=flat)](https://npmjs.org/package/updater-package)  [![NPM total downloads](https://img.shields.io/npm/dt/updater-package.svg?style=flat)](https://npmjs.org/package/updater-package) [![Linux Build Status](https://img.shields.io/travis/update/updater-package.svg?style=flat&label=Travis)](https://travis-ci.org/update/updater-package)

> Update a package.json based on globally stored preferences.

## Example

![updater-package demo](https://raw.githubusercontent.com/update/updater-package/master/demo.gif)

## What is "Update"?

[Update](https://github.com/update/update) is a new, open-source developer framework for automating updates of any kind to code projects. All actual updating is done plugins called "updaters", like this one.

Updaters can be run from the command line when [Update's CLI](https://github.com/update/update/blob/master/docs/installing-the-cli.md) is installed globally, or they can be used as building blocks for creating other [updaters](https://github.com/update/update/blob/master/docs/updaters.md).

**For more information:**

* Visit the [update project](https://github.com/update/update)
* Visit the [update documentation](https://github.com/update/update/blob/master/docs/)
* Find [updaters on npm](https://www.npmjs.com/browse/keyword/update-updater) (help us [author updaters](https://github.com/update/update/blob/master/docs/updaters.md))

## Install

**Install update**

If you haven't already installed [update](https://github.com/update/update) globally, you can do that now with the following command:

```sh
$ npm install --global update
```

**Install updater-package**

Then install this module:

```sh
$ npm install --global updater-package
```

## Usage

### Running the updater

Make sure your work is committed, then run the updater with the following command:

```sh
$ update updater-package
```

**What will happen?**

This updater's `default` task will update the package.json in the current working directory using the default settings and schema in [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg).

Learn how to [automatically run this updater](https://github.com/update/update/blob/master/docs/built-in-tasks.md#init) with the `update` command.

## Tasks

### Running tasks

Tasks are run by appending the colon-separated name of the task to run after the name of the [updater](https://github.com/update/update/blob/master/docs/)(updaters.md).

**Example**

Run task `bar` from updater `foo`:

```sh
$ update foo:bar
```

### Registered tasks

The following tasks are registered on `updater-package` and can be run using the syntax described in the [running tasks](#running-tasks) section.

## Customization

The following instructions can be used to override settings in `updater-package`. Visit the [Update documentation](https://github.com/update/update/blob/master/docs/overriding-defaults.md) to learn about other ways to override defaults.

**Overriding templates**

You can override a template by adding a template of the same name to the `templates` directory in user home. For example, to override the `package.json` template, add a template at the following path `~/update/updater-package/templates/package.json`, where `~/` is the user-home directory that `os.homedir()` resolves to on your system.

## Features

* Removes empty fields
* Ensures `license` field exists. Defaults to MIT
* Converts `licenses` array or object to a `license` string (first item is used)
* Converts `repository` object to a string
* Converts `author` object to a string
* If they exist, adds common necessary files or directories (like `bin` or `lib`) to the `files` array
* Adds `preferGlobal` if `cli.js` or `bin` folder exists
* Adds `bin` property to package.json if `cli.js` or `bin` folder exist?

## About

### Related projects

* [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
* [updater-license](https://www.npmjs.com/package/updater-license): Update the copyright statement and year in a MIT `LICENSE` file. | [homepage](https://github.com/update/updater-license "Update the copyright statement and year in a MIT `LICENSE` file.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/update/updater-package/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on December 14, 2016._