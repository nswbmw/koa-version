var request = require('supertest');
var app = require('./app');

describe('Test v1 api', function () {
  it('v1-hello-accept', function (done) {
    request(app.callback())
      .get('/hello')
      .set('Accept', 'version=1.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v1-hello') {
          return done('Expect v1-hello, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v1-hello-query', function (done) {
    request(app.callback())
      .get('/hello?version=1.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v1-hello') {
          return done('Expect v1-hello, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v1-world-accept', function (done) {
    request(app.callback())
      .get('/world')
      .set('Accept', 'version=1.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v1-world') {
          return done('Expect v1-world, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v1-world-query', function (done) {
    request(app.callback())
      .get('/world?version=1.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v1-world') {
          return done('Expect v1-world, but ' + (res && res.text));
        }
        done();
      });
  });
});

describe('Test v2 api', function () {
  it('v2-hello-accept', function (done) {
    request(app.callback())
      .get('/hello')
      .set('Accept', 'version=2.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v2-hello') {
          return done('Expect v2-hello, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v2-hello-query', function (done) {
    request(app.callback())
      .get('/hello?version=2.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v2-hello') {
          return done('Expect v2-hello, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v2-world-accept', function (done) {
    request(app.callback())
      .get('/world')
      .set('Accept', 'version=2.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v2-world') {
          return done('Expect v2-world, but ' + (res && res.text));
        }
        done();
      });
  });
  it('v2-world-query', function (done) {
    request(app.callback())
      .get('/world?version=2.0.0')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (!res || res.text !== 'v2-world') {
          return done('Expect v2-world, but ' + (res && res.text));
        }
        done();
      });
  });
});