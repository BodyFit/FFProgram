var fs = require('fs'),
  async = require('async'),
  path = require("path"),
  _ = require("lodash"),
  goals = [],
  programs = [],
  dir = "./goals";

function expand(item, w) {
  if (_.isNumber(item)) {
    var x = item * w;
    return [x, x, x, x, x, x, x];
  }
  else {
    return _.map(item, function (num) {
      return num * w;
    });
  }
}

function getFat(f) {
  if (_.isNumber(f)) {
    return f;
  }
  else {
    return parseInt(f.substring(0, f.length - 1)) / 100;
  }
}

function getProgram(id, profile) {
  var program = programs[id],
    general = program.general,
    weight = profile.weight,
    fatPercents = getFat(general.f),
    carbs = expand(general.c, weight),
    proteins = expand(general.p, weight),
    fats = [];

  for (var i = 0; i < 7; i++) {
    fats[i] = fatPercents * weight * (carbs[i] + proteins[i]);
  }
  return {
    carbs: carbs,
    proteins: proteins,
    fats: fats
  };
}

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
exports.getProgram = getProgram;