var request = require('supertest');
var version = require('..');
var koa = require('koa');

describe('version(version, app)', function () {
  it('should mount the app at the given version', function (done) {
    var app = koa();
    var a = koa();
    var b = koa();

    a.use(function* (next) {
      yield next;
      this.body = 'Hello';
    });

    b.use(function* (next) {
      yield next;
      this.body = 'World';
    });

    app.use(version('1', a));
    app.use(version('2', b));

    request(app.listen())
      .get('/')
      .expect('Hello')
      .end(function (err) {
        if (err) return done(err);
        request(app.listen())
          .get('/')
          .set('Accept', 'application/json; version=1')
          .expect('Hello')
          .end(function (err){
            if (err) return done(err);

            request(app.listen())
              .get('/')
              .set('Accept', 'application/json; version=2')
              .expect('World')
              .end(function (err){
                if (err) return done(err);

                request(app.listen())
                  .get('/')
                  .set('Accept', 'application/json; version=3')
                  .expect(404, done);
              });
          });
      });
  });

  it('should mount the app at the given version in query string', function (done) {
    var app = koa();
    var a = koa();
    var b = koa();

    a.use(function* (next) {
      yield next;
      this.body = 'Hello';
    });

    b.use(function* (next) {
      yield next;
      this.body = 'World';
    });

    app.use(version('1', a));
    app.use(version('2', b));

    request(app.listen())
      .get('/')
      .expect('Hello')
      .end(function (err) {
        if (err) return done(err);
        request(app.listen())
          .get('/?version=1')
          .expect('Hello')
          .end(function (err){
            if (err) return done(err);

            request(app.listen())
              .get('/?version=2')
              .expect('World')
              .end(function (err){
                if (err) return done(err);

                request(app.listen())
                  .get('/?version=3')
                  .expect(404, done);
              });
          });
      });
  });

  it('should accept a range of versions', function(done) {
    
    var app = koa();
    var a = koa();
    var b = koa();

    a.use(function* (next) {
      yield next;
      this.body = 'Hello';
    });

    b.use(function* (next) {
      yield next;
      this.body = 'World';
    });

    
    app.use(version('1.x', a));
    app.use(version('>=2.0.0', b));
    
    request(app.listen())
      .get('/')
      .expect('Hello')
      .end(function (err) {
        if (err) return done(err);
        request(app.listen())
          .get('/?version=1')
          .expect('Hello')
          .end(function (err){
            if (err) return done(err);

            request(app.listen())
              .get('/?version=2')
              .expect('World')
              .end(function (err){
                if (err) return done(err);

                request(app.listen())
                  .get('/?version=3')
                  .expect('World').end(done);
              });
          });
      });
  });


});
