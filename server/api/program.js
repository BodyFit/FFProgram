var async = require("async"),
  pm = require("../programManager"),
  profileManager = require("../profileManager");

exports.init = function (swagger) {
  var getProgramDetails = {
    "spec": {
      "description": "Get the detailed Program for the current user",
      "path": "/programs/{program}/details",
      "notes": "Get the detailed Program for the current user",
      "summary": "Get the detailed Program for the current user",
      "method": "GET",
      "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id")],
      "nickname": "getDetailedProgram"
    },
    "action": function (req, res) {
      var program = req.params.program - 1;
      var userId = req.user.Id;

      profileManager.getProfile(userId, req.headers.authorization, function (profile) {
        profileManager.getBiometrics(userId, req.headers.authorization, function (biom) {
          res.json(pm.getDetailedProgram(program, profile, biom[biom.length - 1]));
        });
      });
    }
  };

  var getProgram = {
    "spec": {
      "description": "Get Program for the current user.",
      "path": "/programs/{program}",
      "notes": "Get Program for the current user.",
      "summary": "Get Program for the current user.",
      "method": "GET",
      "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
      "responseClass": "Program",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getProgram"
    },
    "action": function (req, res) {
      var program = req.params.program - 1;
      var userId = req.user.Id;

      profileManager.getBiometrics(userId, req.headers.authorization, function (biom) {
        res.json(pm.getProgram(program, biom[biom.length - 1]));
      });
    }
  };

  var getGoals = {
    "spec": {
      "description": "Operations about prototypes",
      "path": "/goals",
      "notes": "Returns a prototype based on ID",
      "summary": "Find prototype by ID",
      "method": "GET",
      "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getPrototypeById"
    },
    "action": function (req, res) {
      res.json(pm.goals);
    }
  };

  swagger.addGet(getProgram);
  swagger.addGet(getProgramDetails);
  swagger.addGet(getGoals);
};