'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var update = require('update');
var gm = require('global-modules');
var existsSync = require('fs-exists-sync');
var copy = require('copy');
var del = require('delete');
var updater = require('..');
var app;

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var actual = path.resolve.bind(path, __dirname, 'actual');

function exists(name, normalized, cb) {
  var filepath = actual(name);

  return function(err) {
    if (err) return cb(err);
    assert(existsSync(filepath));
    del(path.dirname(filepath), cb);
  }
}

function createApp(cb) {
  app = update({silent: true});

  app.cwd = actual();
  app.option('cwd', actual());
  app.option('dest', actual());
  app.option('askWhen', 'not-answered');

  // provide template data to avoid prompts
  app.data({
    author: {
      name: 'Jon Schlinkert',
      username: 'jonschlnkert',
      url: 'https://github.com/jonschlinkert'
    },
    project: {
      name: 'foo',
      description: 'bar',
      version: '0.1.0'
    }
  });
  copy(fixtures('*'), actual(), cb);
}

describe('updater-package', function() {
  describe('plugin', function() {
    beforeEach(function(cb) {
      createApp(cb);
    });

    it('should only register the plugin once', function(cb) {
      var count = 0;
      app.on('plugin', function(name) {
        if (name === 'updater-package') {
          count++;
        }
      });
      app.use(updater);
      app.use(updater);
      app.use(updater);
      assert.equal(count, 1);
      cb();
    });

    it('should extend tasks onto the instance', function() {
      app.use(updater);
      assert(app.tasks.hasOwnProperty('default'));
      assert(app.tasks.hasOwnProperty('package-index'));
      assert(app.tasks.hasOwnProperty('package-normalize'));
    });

    it('should run the `default` task with .build', function(cb) {
      app.use(updater);
      app.build('default', exists('package.json', true, cb));
    });

    it('should run the `default` task with .update', function(cb) {
      app.use(updater);
      app.update('default', exists('package.json', true, cb));
    });

    it('should run the `package` task with .build', function(cb) {
      app.use(updater);
      app.build('package-normalize', exists('package.json', true, cb));
    });

    it('should run the `package` task with .update', function(cb) {
      app.use(updater);
      app.update('package-normalize', exists('package.json', true, cb));
    });

    it('should run the `package-normalize` task with .build', function(cb) {
      app.use(updater);
      app.build('package-normalize', exists('package.json', true, cb));
    });

    it('should run the `package-normalize` task with .update', function(cb) {
      app.use(updater);
      app.update('package-normalize', exists('package.json', true, cb));
    });
  });

  if (!process.env.CI && !process.env.TRAVIS) {
    if (!existsSync(path.resolve(gm, 'updater-package'))) {
      console.log('updater-package is not installed globally, skipping CLI tests');
    } else {
      describe('updater (CLI)', function() {
        beforeEach(function(cb) {
          createApp(cb);
        });

        it('should run the default task using the `updater-package` name', function(cb) {
          app.update('updater-package', exists('package.json', true, cb));
        });

        it('should run the default task using the `updater-package` name', function(cb) {
          app.use(updater);
          app.update('updater-package', exists('package.json', true, cb));
        });

        it('should run the default task using the `package` updater alias', function(cb) {
          app.use(updater);
          app.update('package-normalize', exists('package.json', true, cb));
        });

        it('should run the package task explicitly using the `package` updater alias', function(cb) {
          app.use(updater);
          app.update('package:package-normalize', exists('package.json', true, cb));
        });
      });
    }
  }

  describe('updater (API)', function() {
    beforeEach(function(cb) {
      createApp(cb);
    });

    it('should run the default task on the updater', function(cb) {
      app.register('package', updater);
      app.update('package', exists('package.json', true, cb));
    });

    it('should run the `default` task when defined explicitly', function(cb) {
      app.register('package', updater);
      app.update('package:default', exists('package.json', true, cb));
    });

    it('should run the `package` task', function(cb) {
      app.register('package', updater);
      app.update('package:package-normalize', exists('package.json', true, cb));
    });

    it('should run the `package-normalize` task', function(cb) {
      app.register('package', updater);
      app.update('package:package-normalize', exists('package.json', true, cb));
    });

    it('should run the `package-index` task', function(cb) {
      app.register('package-index', updater);
      app.update('package:package-index', exists('package.json', false, cb));
    });

    it('should `package.json` default file', function(cb) {
      app.register('package', updater);

      app.update('package:normalize', function(err) {
        if (err) return cb(err);
        var fp = actual('package.json');
        assert(existsSync(fp));
        var pkg = JSON.parse(fs.readFileSync(fp, 'utf8'));
        assert(pkg.hasOwnProperty('license'));
        del(path.dirname(fp), cb);
      });
    });
  });

  describe('sub-updater', function() {
    beforeEach(function(cb) {
      createApp(cb);
    });

    it('should work as a sub-updater', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', updater);
      });
      app.update('foo.package:normalize', exists('package.json', true, cb));
    });

    it('should run the `default` task by default', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', updater);
      });
      app.update('foo.package:normalize', exists('package.json', true, cb));
    });

    it('should run the `package:default` task when defined explicitly', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', updater);
      });
      app.update('foo.package:default', exists('package.json', true, cb));
    });

    it('should run the `package:package` task', function(cb) {
      app.register('foo', function(foo) {
        foo.register('package', updater);
      });
      app.update('foo.package:package-normalize', exists('package.json', true, cb));
    });

    it('should work with nested sub-updaters', function(cb) {
      app
        .register('foo', updater)
        .register('bar', updater)
        .register('baz', updater)

      app.update('foo.bar.baz', exists('package.json', true, cb));
    });
  });
});
