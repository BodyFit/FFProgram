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

function getProgram(goal, biometrics) {
  var program = programs[goal],
    general = program.general,
    weight = biometrics.weight,
    fatPercents = getFat(general.f),
    carbs = expand(general.c, weight),
    proteins = expand(general.p, weight),
    fats = [];

  for (var i = 0; i < 7; i++) {
    fats[i] = fatPercents * (carbs[i] + proteins[i]);
  }
  return {
    carbs: carbs,
    proteins: proteins,
    fats: fats
  };
}

function getOption(options, training) {
  return options[0];
}

function getDetailedProgram(goal, profile, biometrics) {
  var nutrients = getProgram(goal, biometrics),
    details = programs[goal].details,
    trainings = profile.trainings,
    options = details.options,
    days = [],
    day,
    carbs, prots, fats,
    nut,
    i, j,
    training,
    option,
    meals, meal;


  for (i = 0; i < 7; i++) {
    carbs = nutrients.carbs[i];
    prots = nutrients.proteins[i];
    fats = nutrients.fats[i];
    training = _.find(trainings, function (item) {
      return item.day === i;
    });
    option = getOption(options, training);
    meals = option.meals;
    day = [];
    if(training) {
      training.isTraining = true;
      delete training.day;
      day.push(training);
    }
    for (j = 0; j < meals.length; j++) {
      meal = meals[j];
      day.push({
        from: meal.time[0],
        to: meal.time[1],
        carbs: Math.round((meal.nutrients.c || 0) * carbs),
        proteins: Math.round((meal.nutrients.p || 0) * prots),
        fats: Math.round((meal.nutrients.f || 0) * fats)
      })
    }
    day = _.sortBy(day, function(item){
      return item.from;
    })
    days.push(day);
  }

  return days;
}

function readGoals() {
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
exports.getDetailedProgram = getDetailedProgram;