/**
 * Module dependencies.
 */

var debug = require('debug')('koa-version');
var compose = require('koa-compose');
var assert = require('assert');

var versionRegExp = /^\d+(\.\d+)*$/i;

/**
 * export `version()`
 */

module.exports = version;

function _parseAcceptVersion(accept) {
  var version;
  try {
    version = accept.match(/version=(\d+(?:\.\d+)*$)/i);
    version = version[1];
  } catch (err) {
    debug('parse accept version failed >>> %s', accept);
  }
  return version;
}

/**
 * Mount `app` by `version`, `app`
 * may be a Koa application or
 * middleware function.
 *
 * @param {String} version in accept header
 * @param {Application|Function} [app or function]
 * @return {Function}
 * @api public
 */

function version(version, app) {
  if (typeof version !== 'string') {
    version = '1';
  }

  assert(versionRegExp.test(version), 'Mount version should like `0, 0.1, 1.0.1`');

  // compose
  var downstream = app.middleware
    ? compose(app.middleware)
    : app;

  var name = app.name || 'unnamed';

  return function* (upstream) {
    if (!this.acceptVersion) {
      var accept = this.header.accept;
      this.acceptVersion = _parseAcceptVersion(accept);
      if (!this.acceptVersion) {
        if (this.query.version && versionRegExp.test(this.query.version)) {
          this.acceptVersion = this.query.version;
        } else {
          this.acceptVersion = '1';
        }
      }
    }

    if (version !== this.acceptVersion) {
      return yield* upstream;
    }

    debug('mount -> %s %s', this.acceptVersion, name);
    yield* downstream.call(this, function *() {
      yield* upstream;
    }.call(this));
  }

}