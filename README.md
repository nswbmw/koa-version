## koa-version

Mounting app by version to different router.

### Install

```
npm i koa-version --save
```

### Usage

```
version(semantic_version, route, app);
```
- `semantic_version`: use [semver](https://github.com/npm/node-semver).
- `route`: routing function, `app` as parameter only.
- `app`: koa application.

### Example

**app.js**

```
var koa = require('koa');
var version = require('koa-version');

var v1Router = require('./v1Router');
var v2Router = require('./v2Router');

var app = koa();

app.use(version('1', v1Router, app));
app.use(version('2', v2Router, app));

app.listen(3000);
```

**v1Router.js**

```
var route = require('koa-route');

module.exports = function (app) {
  app.use(route.get('/hello', function* () {
    this.body = 'v1-hello';
  }));
  app.use(route.get('/world', function* () {
    this.body = 'v1-world';
  }));
};
```

**v2Router.js**

```
var route = require('koa-route');

module.exports = function (app) {
  app.use(route.get('/hello', function* () {
    this.body = 'v2-hello';
  }));
  app.use(route.get('/world', function* () {
    this.body = 'v2-world';
  }));
};
```

### Test

```
npm test
```

### License

MIT