'use strict';

var normalize = require('normalize-pkg');

var extend = require('extend-shallow');

module.exports = function (app, base, env) {
  var options = base.option('pkg') || {};

  base.onLoad(/package\.json/, function (file, next) {
    normalize(file.json, options);
    next();
  });
};
