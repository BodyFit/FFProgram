var needle = require('needle'),
  entree = require('entree'),
  _ = require('lodash'),
  passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (app) {

  app.use(passport.initialize())
    .use(passport.session());

  passport.use(new BearerStrategy(
    function (token, done) {
      needle.get(
        'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/Users/me',
        { headers: { "Authorization": "Bearer " + token} },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            done(null, body.Result, { scope: 'read' });
          }
          else {
            done(null, false);
          }
        });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.Id);
  });

  passport.deserializeUser(function (id, done) {
    entree.Users.get(id, function (err, user) {
      done(err, user);
    });
  });

  app.post("/auth", function (req, res) {
    var options = _.clone(req.body);
    options.grant_type = "password";
    needle.post(
      'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/oauth/token',
      options,
      function (error, response, body) {
        res.statusCode = response.statusCode;
        res.send(body);
      });
  });

  app.post("/signup", function (req, res) {
    entree.Users.insert(req.body, function (err, item) {
      res.json(item);
    });
  });
}