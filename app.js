var express = require('express'),
  entree = require('entree'),
  async = require('async'),
  passport = require('passport'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  request = require('request'),
  LocalStrategy = require('passport-local').Strategy,
  BearerStrategy = require('passport-http-bearer').Strategy,
  apiInit = require("./rest/load-api");

global.userId = "20bc6670-e2b6-11e3-a5cf-355388f1026f";
var app = express();

async.series([
    function (done) {
      entree.init(done);
    }],
  function (err) {
    app.set('port', process.env.PORT || 3000);
    app.set("view engine", "html");
    app.set("view options", { layout: false });
    app.set("views", path.join(__dirname, 'views'));
    app.engine("html", require("hbs").__express);

    app.use(express.json())
      .use(express.urlencoded())
      .use(express.methodOverride())
      .use(express.bodyParser())
      .use(express.cookieParser('035E2402-1E6E-4BAD-B516-5B180CA35626'))
      .use(express.session())
      .use(app.router)
      .use(passport.initialize())
      .use(passport.session())
      .use(express.static(path.join(__dirname, 'public')));

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

    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    apiInit(app);

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
    })

    app.on('close', function () {
      entree.dispose();
    });

    http.createServer(app).listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
    });
  });