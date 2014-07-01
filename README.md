
Koa-version
========================

parsing the version part of the HTTP accept field for the Koa framework.


### Installation

```sh
$ npm install koa-version --save
```

### Usage

```js
var app = koa();
var ver = require('koa-version');
app.use(ver('1', app);
```

### License

MIT
