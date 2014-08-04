/**
 * Module dependencies.
 */

var debug = require('debug')('koa-version');
var compose = require('koa-compose');
var assert = require('assert');
var semver = require('semver');
var versionRegExp = /^\d+(\.\d+)*$/i;

/**
 * export `version()`
 */

module.exports = version;

function _toSemverStr(n) {
  if (typeof n === 'number')
    return n + '.0.0';
  if (typeof n === 'string')
    if (n.indexOf('.') === -1)
      return n + '.0.0';
    else
      return n;
  return '1.0.0';
}

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
  version = _toSemverStr(version);
  assert(semver.validRange(version), 'Mount version should like `0, 0.1, 1.0.1`');

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
    
    if (!semver.satisfies(_toSemverStr(this.acceptVersion), version))
      return yield* upstream;

    debug('mount -> %s %s', this.acceptVersion, name);
    yield* downstream.call(this, function *() {
      yield* upstream;
    }.call(this));
  }

}
