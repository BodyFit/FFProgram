var request = require('request'),
  entree = require('entree'),
  passport = require('passport'),
  BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function (app) {

  app.use(passport.initialize())
    .use(passport.session());

  passport.use(new BearerStrategy(
    function (token, done) {
      request.get(
        'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/Users/me',
        { headers: { "Authorization": "Bearer " + token} },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            done(null, JSON.parse(body).Result, { scope: 'read' });
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
    var options = req.body;
    request.post(
      'http://api.everlive.com/v1/ZsKEbGeFrDPsggLR/oauth/token',
      { form: { username: options.username, password: options.password, grant_type: "password" } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
        else {
          res.statusCode = 401;
          res.end();
        }
      });
  });

  app.post("/signup", function (req, res) {
    entree.Users.insert(req.body, function (err, item) {
      res.json(item);
    });
  });
}