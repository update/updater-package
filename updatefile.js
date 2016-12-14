'use strict';

var path = require('path');
var normalize = require('gulp-normalize-pkg');
var utils = require('./utils');

module.exports = function(app) {
  if (!utils.isValid(app, 'updater-package')) return;

  app.use(utils.pkg());
  app.option(app.base.options);
  app.preWrite(/package\.json/, function(file, next) {
    var pkg = JSON.parse(file.contents);

    if (Array.isArray(pkg.files)) {
      pkg.files = utils.compact(pkg.files).filter(function(name) {
        return !/license|readme\.md/i.test(name);
      });
    }

    var deps = pkg.devDependencies;
    if (deps && deps['verb-tag-jscomments']) {
      delete deps['verb-tag-jscomments'];
      delete deps['verb'];
      pkg.devDependencies = deps;
    }

    var str = JSON.stringify(pkg, null, 2).trim();
    str += '\n';
    file.contents = new Buffer(str);
    next();
  });

  app.task('default', ['package-update']);

  /**
   * Normalizes and updates fields in package.json to use the latest [npm]() conventions,
   * and baseline defaults defined in [normalize-pkg][]. Override any of the defaults
   * by defining custom fields on `options.fields`. See [customization](#customization)
   * for more details.
   *
   * ```sh
   * update package
   * ```
   * @name package
   * @api public
   */

  app.task('package-update', {silent: true}, function() {
    var opts = utils.merge({}, app.option('pkg'));

    return app.src('package.json', {cwd: app.cwd})
      .pipe(createIndex(app))
      .pipe(normalize(opts))
      .pipe(owner())
      .pipe(app.dest(app.cwd));
  });

  /**
   * Ensures the `files` field in package.json has the value defined on the `main` property.
   * Also aliased as `package:package-normalize` to prevent task naming conflicts when this is used
   * as a plugin.
   *
   * ```sh
   * update package:normalize
   * ```
   * @name package:normalize
   * @api public
   */

  app.task('normalize', ['package-normalize']);
  app.task('package-normalize', {silent: true}, function() {
    var opts = utils.merge({}, app.option('pkg'));
    return app.src('package.json', {cwd: app.cwd})
      .pipe(normalize(opts))
      .pipe(app.dest(app.cwd))
  });

  /**
   * Updates the `files` and `main` fields in package.json to ensure it has the value defined on
   * the `main` property. Also aliased as `package:package-files` to provide a semantic task
   * name to use when this updater is used as a plugin.
   *
   * ```sh
   * update package:index
   * ```
   * @name package:index
   */

  app.task('index', ['package-index']);
  app.task('package-index', {silent: true}, function() {
    return app.src('package.json', {cwd: app.cwd})
      .pipe(createIndex(app))
      .pipe(app.dest(app.cwd));
  });

  /**
   * Runs [generate-package][] to create a new package.json in the current working directory
   * or specified `--dest`.
   *
   * ```sh
   * update package
   * ```
   * @name package
   * @api public
   */

   app.task('new', function(cb) {
     app.register('generate-package', require('generate-package'));
     app.generate('generate-package', cb);
   });
};

function newline(nl) {
  if (typeof nl !== 'string') nl = '\n';
  return utils.through.obj(function(file, enc, next) {
    var str = file.contents.toString().replace(/\s+$/, '');
    file.contents = new Buffer(str + nl);
    next(null, file);
  });
}

function createIndex(app) {
  return utils.through.obj(function(file, enc, next) {
    var pkg = JSON.parse(file.contents.toString());
    var indexPath = path.resolve(app.cwd, 'index.js');

    if (!pkg.hasOwnProperty('main') && !utils.exists(indexPath)) {
      var configfile = utils.getFile(app.cwd);
      if (configfile) {
        var contents = `'use strict';\n\nmodule.exports = require('./${configfile}');`;
        pkg.files = pkg.files || [];
        if (pkg.files.indexOf('index.js') === -1) {
          pkg.files.push('index.js');
        }
        if (pkg.files.indexOf(configfile + '.js') === -1) {
          pkg.files.push(configfile + '.js');
        }
        pkg.main = 'index.js';
        pkg.files.sort();

        var index = new utils.File({path: indexPath, contents: new Buffer(contents)});
        this.push(index);
      }
    }

    file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    next(null, file);
  });
}

function owner(options) {
  return utils.through.obj(function(file, enc, next) {
    if (file.basename !== 'package.json') {
      next();
      return;
    }

    var pkg = JSON.parse(file.contents.toString());
    utils.updateOwner(pkg);
    file.contents = new Buffer(JSON.stringify(pkg, null, 2));
    next(null, file);
  });
}
