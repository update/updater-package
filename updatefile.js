'use strict';

var normalize = require('normalize-pkg');
var extend = require('extend-shallow');

module.exports = function (app, base, env) {
  var options = base.option('pkg') || {};

  options.verbiage = {
    value: function (key, value, config) {
      config.verb = value;
      delete config[key];
      return null;
    }
  };

  base.onLoad(/package\.json/, function(file, next) {
    base.log('updating package.json');
    var pkg = extend({}, file.json);
    try {
      file.json = normalize(pkg, options);
      next();
    } catch (err) {
      next(err);
    }
  });
};
