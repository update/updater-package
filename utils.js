'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('arrayify-compact', 'compact');
require('base-pkg', 'pkg');
require('fs-exists-sync', 'exists');
require('get-value', 'get');
require('is-valid-app', 'isValid');
require('isobject', 'isObject');
require('parse-git-config', 'git');
require('parse-github-url');
require('repo-utils', 'repo');
require('set-value', 'set');
require('through2', 'through');
require('vinyl', 'File');
require = fn;

// this is the old field name for `verb` in package.json.
// It might not be found anywhere anymore, but just in case
// we want to get rid of it
utils.fields = {
  verbiage: {
    types: ['object'],
    normalize: function(val, key, config, schema) {
      if (typeof val !== 'undefined') {
        config.verb = val;
        schema.omit(key);
      }
    }
  },
  repository: {
    types: ['object', 'string'],
    normalize: function(val, key, config, schema) {
      return val;
    }
  },
};

utils.getFiles = function(cwd, files) {
  files = utils.compact(files);
  var len = files.length;
  var idx = -1;
  var arr = [];

  while (++idx < len) {
    var name = files[idx];
    var fp = path.resolve(cwd, name);
    if (utils.exists(fp)) {
      arr.push(name);
    }
  }
  return arr;
};

utils.addFiles = function(cwd, pkg, files) {
  if (!Array.isArray(files)) return [];
  if (pkg.preferGlobal !== true) return [];
  var arr = pkg.files ? pkg.files.slice() : [];
  var len = files.length;
  var idx = -1;
  while (++idx < len) {
    var file = files[idx];
    var fp = path.resolve(cwd, file);
    if (arr.indexOf(file) === -1 && utils.exists(fp)) {
      pkg.files.push(file);
    }
  }
  pkg.files.sort();
};

/**
 * TODO: externalize to user home plugin
 */

utils.updateOwner = function(app, pkg) {
  if (!app.options.ownerPatterns) return;
  var name = pkg.name;
  var patterns = app.options.ownerPatterns;
  var owner = null;

  if (!utils.isObject(patterns)) {
    throw new TypeError('expected `.ownerPatterns` option to be an object');
  }

  for (var key in patterns) {
    if (patterns.hasOwnProperty(key)) {
      var re = patterns[key];
      if (typeof re === 'string') {
        re = new RegExp(re);
      }

      if (re.test(name)) {
        owner = key;
      }
    }
  }

  if (!owner) return;
  var urls = {
    'repository': utils.get(pkg, 'repository.url') || utils.get(pkg, 'repository'),
    'bugs.url': utils.get(pkg, 'bugs.url'),
    'homepage': pkg.homepage,
  };

  for (var key in urls) {
    if (urls.hasOwnProperty(key)) {
      var url = urls[key];
      if (!url) continue;
      var orig = utils.getOwner(url);
      if (!orig) continue;
      utils.set(pkg, key, url.replace(orig, owner));
    }
  }
};

utils.getOwner = function(url) {
  var parsed = utils.parseGithubUrl(url);
  if (parsed.host !== 'github.com') {
    return null;
  }
  return parsed.owner;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
