var route = require('koa-route');

module.exports = function (app) {
  app.use(route.get('/hello', function* () {
    this.body = 'v1-hello';
  }));
  app.use(route.get('/world', function* () {
    this.body = 'v1-world';
  }));
};