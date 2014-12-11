var route = require('koa-route');

module.exports = function (app) {
  app.use(route.get('/hello', function* () {
    this.body = 'v2-hello';
  }));
  app.use(route.get('/world', function* () {
    this.body = 'v2-world';
  }));
};