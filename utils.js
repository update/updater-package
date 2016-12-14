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
require('mixin-deep', 'merge');
require('isobject', 'isObject');
require('is-valid-app', 'isValid');
require('parse-github-url');
require('parse-git-config', 'git');
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

utils.fixRepo = function(app, str) {
  var owner = utils.getOwner(app);
  // TODO
};

utils.getFile = function(cwd) {
  var files = ['updatefile', 'generator', 'assemblefile', 'verbfile'];
  var len = files.length;
  var idx = -1;
  while (++idx < len) {
    var file = files[idx];
    var fp = path.resolve(cwd, file);
    if (utils.exists(fp + '.js')) {
      return file;
    }
  }
};

utils.getRepo = function(pkg) {
  var repo = pkg.repository;
  if (utils.isObject(repo)) {
    var parsed = parseGithubUrl(repo.url);
    repo = parsed.repo;
  }
  pkg.repository = repo;
  return repo;
};

/**
 * TODO: externalize to user home plugin
 */

utils.updateOwner = function(pkg) {
  var name = pkg.name;
  var repo = utils.getRepo(pkg);
  var segs = repo.split('/');
  if (segs.length !== 2) {
    return;
  }

  var owner = segs[0];
  var orig = owner;

  if (/^base-/.test(name)) {
    owner = 'node-base';
  } else if (/^assemble-/.test(name)) {
    owner = 'assemble';
  } else if (/^boilerplate-/.test(name)) {
    owner = 'boilerplate';
  } else if (/^enquirer-/.test(name)) {
    owner = 'enquirer';
  } else if (/^generate-/.test(name)) {
    owner = 'generate';
  } else if (/^(helper|handlebars-helper)-/.test(name)) {
    owner = 'helpers';
  } else if (/^-regex/.test(name)) {
    owner = 'regexhq';
  } else if (/^sellside-/.test(name)) {
    owner = 'sellside';
  } else if (/^toolkit-/.test(name)) {
    owner = 'node-toolkit';
  } else if (/^upstage-/.test(name)) {
    owner = 'upstage';
  } else if (/^updater-/.test(name)) {
    owner = 'update';
  } else if (/^verb-/.test(name)) {
    owner = 'verbose';
  }

  // if `owner` isn't what we originally detected AND
  // the user that is currently running `update` is
  // the value we originally detected, then it's a good
  // bet the "owner" values are incorrect, so let's fix
  // them.
  if (orig !== owner && utils.currentUser() === orig) {
    pkg.repository = `${owner}/${segs[1]}`;
    if (pkg.bugs && pkg.bugs.url) {
      pkg.bugs.url = pkg.bugs.url.replace(orig, owner);
    }

    if (pkg.homepage && /github\.com\//.test(pkg.homepage)) {
      pkg.homepage = pkg.homepage.replace(orig, owner);
    }
  }
};

utils.currentUser = function() {
  var config = utils.git.sync('global') || {};
  return config.user && config.user.name;
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
