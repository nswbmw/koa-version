var koa = require('koa');
var version = require('..');

var v1Router = require('./v1Router');
var v2Router = require('./v2Router');

var app = koa();

app.use(version('1', v1Router, app));
app.use(version('2', v2Router, app));

module.exports = app;