# updater-package [![NPM version](https://img.shields.io/npm/v/updater-package.svg?style=flat)](https://www.npmjs.com/package/updater-package) [![NPM monthly downloads](https://img.shields.io/npm/dm/updater-package.svg?style=flat)](https://npmjs.org/package/updater-package) [![NPM total downloads](https://img.shields.io/npm/dt/updater-package.svg?style=flat)](https://npmjs.org/package/updater-package) [![Linux Build Status](https://img.shields.io/travis/update/updater-package.svg?style=flat&label=Travis)](https://travis-ci.org/update/updater-package)

> Update a package.json based on globally stored preferences.

![updater-package demo](https://raw.githubusercontent.com/update/updater-package/master/docs/demo.gif)

{{#block "logo"}}
<p align="center">
<a href="https://github.com/update/update">
<img height="150" width="150" src="https://raw.githubusercontent.com/update/update/master/docs/logo.png">
</a>
</p>

{{/block}}

{{#block "community" heading="### Community"}}
Are you using [Update](https://github.com/update/update) in your project? Have you published an [updater](https://github.com/update/update/blob/master/docs/updaters.md) and want to share your Update project with the world?

Here are some suggestions!

* If you get like Update and want to tweet about it, please use the hashtag `#updatejs` (not `@`)
* Show your love by starring [Update](https://github.com/update/update) and `updater-package`
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/update) (please use the `updatejs` tag in questions)
* **Gitter** Discuss Update with us on [Gitter](https://gitter.im/update/update)
* If you publish an updater, thank you! To make your project as discoverable as possible, please add the keyword `updateupdater` to package.json.

{{/block}}

## What does updater-package do?

Most updaters do one specific thing. This updater updates `package.json` in the current working directory using [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg).

## Getting started

### Install

**Installing the CLI**

To run `updater-package` from the command line, you'll need to install [Update](https://github.com/update/update) globally first. You can do that now with the following command:

```sh
$ npm install --global update
```

This adds the `update` command to your system path, allowing it to be run from any directory.

**Install updater-package**

Install this module with the following command:

```sh
$ npm install --global updater-package
```

### Usage

Make sure your work is committed, then run the updater's `default` [task](https://github.com/update/update/blob/master/docs/tasks.md#default-task) with the following command:

```sh
$ update package
```

**What will happen?**

Upon running `$ update package` command, this updater's `default` task will update the package.json in the current working directory using the default settings and schema in [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg).

Learn how to [automatically run this updater](https://github.com/update/update/blob/master/docs/built-in-tasks.md#init) with the `update` command.

### Tasks

Visit the [documentation for tasks](https://github.com/update/update/blob/master/docs/tasks.md).

## Release history

### v1.0.0

**Bugfixes**

* fixes how contributors are updated to ensure that any existing contributors (on the package.json contributors array) are retained and merged with the contributors from github's API
* fixes package.json license when an invalid value exists (from an old bug that has been fixed in [verb](https://github.com/verbose/verb))

## About

### Related projects

* [updater-eslint](https://www.npmjs.com/package/updater-eslint): Update a `.eslintrc.json` file based on a template and preferences. This updater can be used… [more](https://github.com/update/updater-eslint) | [homepage](https://github.com/update/updater-eslint "Update a `.eslintrc.json` file based on a template and preferences. This updater can be used from the command line when installed globally, or as a plugin in other updaters.")
* [updater-license](https://www.npmjs.com/package/updater-license): Update the copyright statement and year in a MIT `LICENSE` file. | [homepage](https://github.com/update/updater-license "Update the copyright statement and year in a MIT `LICENSE` file.")
* [updater-travis](https://www.npmjs.com/package/updater-travis): Update .travis.yml based on preferences. | [homepage](https://github.com/update/updater-travis "Update .travis.yml based on preferences.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 14, 2017._