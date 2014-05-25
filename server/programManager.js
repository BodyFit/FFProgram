var fs = require('fs'),
  async = require('async'),
  path = require("path"),
  goals = [],
  programs = [],
  dir = "./goals";

function readGoals() {
  //var fullDir = path.join(__dirname, dir);
  fs.readdir(dir, function (err, files) {
    async.each(files, function (file, done) {
      var f = dir + '/' + file;
      var content = JSON.parse(fs.readFileSync(f, 'utf8'));
      goals.push(content.goal);
      programs.push(content.program);
      done();
    }, function () {

    });
  });
}

exports.init = readGoals;
exports.goals = goals;
exports.programs = programs;