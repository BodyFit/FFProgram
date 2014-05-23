var express = require('express'),
  entree = require('entree'),
  async = require('async'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  apiInit = require("./rest/load-api");

global.userId = "20bc6670-e2b6-11e3-a5cf-355388f1026f";
var app = express();

async.series([
  function (done) {
    entree.init(done);
  }],
  function(err) {
    app.set('port', process.env.PORT || 3000);
    app.set("view engine", "html");
    app.set("view options", { layout: false });
    app.set("views", path.join(__dirname, 'views'));
    app.engine("html", require("hbs").__express);

    app.use(express.json())
       .use(express.urlencoded())
       .use(express.methodOverride())
       .use(express.bodyParser())
       .use(express.cookieParser('your secret here'))
       .use(express.session())
       .use(app.router)
       .use(express.static(path.join(__dirname, 'public')));

  // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    apiInit(app);

    app.on('close', function () {
      entree.dispose();
    });

    http.createServer(app).listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
    });
});