var async = require("async"),
  pm = require("../programManager"),
  profileManager = require("../profileManager");

exports.init = function (swagger) {
  var getProgram = {
    "spec": {
      "description": "Operations about prototypes",
      "path": "/programs/{program}",
      "notes": "Returns a prototype based on ID",
      "summary": "Find prototype by ID",
      "method": "GET",
      "params": [swagger.pathParam("id", "ID of prototype that needs to be fetched", "string")],
      "responseClass": "Prototype",
      "errorResponses": [swagger.errors.invalid("id"), swagger.errors.notFound("prototype")],
      "nickname": "getPrototypeById"
    },
    "action": function (req, res) {
      var program = req.params.program - 1;
      var userId = req.user.Id;
      profileManager.getBiometrics(userId, req.headers.authorization, function (biom) {
        res.json(pm.getProgram(program, biom[biom.length - 1]));
      });
    }
  }

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
  swagger.addGet(getGoals);
};