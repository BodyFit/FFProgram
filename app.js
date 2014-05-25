var express = require('express'),
  entree = require('entree'),
  async = require('async'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  apiInit = require("./server/load-api"),
  authInit = require("./auth"),
  pmInit = require("./server/programManager").init;

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
      .use(express.static(path.join(__dirname, 'public')));

    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    authInit(app);
    apiInit(app);
    pmInit();

    app.on('close', function () {
      entree.dispose();
    });

    http.createServer(app).listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
    });
  });