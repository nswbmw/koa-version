/**
 * Module dependencies.
 */

var assert = require('assert');
var koa = require('koa');
var debug = require('debug')('koa-version');
var compose = require('koa-compose');
var semver = require('semver');

/**
 * Export `version()`
 */

module.exports = version;

/**
 * Mount `app` by `version` to different `route`.
 *
 * @param {String} version to mount
 * @param {Function} router
 * @param {Application} app
 * @return {Function}
 * @api public
 */

function version(version, route, app) {
  assert(typeof version === 'string', '`version` must be string!');

  var _app = koa();

  route(_app);
  app._version = app._version || {};
  app._version[version] = _app.middleware;

  return function* (upstream) {
    var acceptVersion = _parseAcceptVersion(this.header.accept) || this.query.version || '1.0.0';

    if (!semver.valid(acceptVersion) || !semver.satisfies(acceptVersion, version)) {
      return yield* upstream;
    }

    debug('version %s <- %s', version, acceptVersion);

    var downstream = compose(app._version[version]);
    yield* downstream.call(this, function *() {
      yield* upstream;
    }.call(this));
  }
}

/**
 * Get version from `Accept`
 * 
 * _parseAcceptVersion('version=1.0.0') === '1.0.0'
 *
 * @param {String} accept
 * @return {String}
 * @api private
 */

function _parseAcceptVersion(accept) {
  var version;
  try {
    version = accept.match(/version=(\d+(?:\.\d+)*$)/i)[1];
  } catch (err) {
    debug('parse accept version failed >>> %s', accept);
  }
  return version;
}