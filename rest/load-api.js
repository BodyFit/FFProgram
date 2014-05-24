var swagger = require("swagger-node-express"),
  express = require("express"),
  api = express(),
  fs = require("fs"),
  path = require("path"),
  auth = require('passport').authenticate('bearer'),
  async = require("async");

api.use(function (req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  auth(req, res, next);
});

module.exports = function (app) {
  app.use("/api", api);
  swagger.setAppHandler(api);
  swagger.configureSwaggerPaths("", "/api-docs", "");

  swagger.setHeaders = function setHeaders(res) {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Content-Type", "application/json; charset=utf-8");
  };

  fs.readdir(__dirname + "/api", function (err, files) {
    async.each(files, function (file, done) {
      var module = require("./api/" + file);
      if (module.init) {
        module.init(swagger);
      }
      done();
    }, function () {
      swagger.configure('/api', '0.1');
      api.use("/docs", express.static(path.resolve(__dirname, "..", "public", "swagger")));
      api.get("/metadata", function (req, res) {
        res.redirect("docs");
      });
    });
  });
};
